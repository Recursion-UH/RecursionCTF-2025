import express, { type Request, type Response } from "express";
import cors from "cors";
import { ethers } from "ethers";
import { spawn } from "child_process";
import fs from "fs";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import path from "path";

const PUBLIC_IP = process.env.PUBLIC_IP || "localhost";
const PRODUCTION = process.env.NODE_ENV;

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan(PRODUCTION ? "combined" : "dev"));
app.use(express.static(path.resolve(__dirname, "../website/dist"), { index: false }));

interface NodeInfo {
  running: boolean;
  port: number;
  anvil: any;
  nodeAccounts: Array<{ address: string, privateKey: string }>;
  mnemonic: string;
  setupAddress: string;
  challengeAddress: string;
}

const sandboxes: Record<string, NodeInfo> = {};
const usedProofs = new Set<string>();

const generateUniquieId = (length = 16) => {
  return [...Array(length)].map(() => (~~(Math.random() * 36)).toString(36)).join('');
}

const sha256 = (data: string) => {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(data);
  return hasher.digest("hex");
}

const verifyProofOfWork = (nonce: string, challenge: string, difficulty: number) => {
  if (challenge.length !== 32) {
    return false;
  }

  const target = Math.pow(2, (256 - difficulty));
  const hash = sha256(`${challenge}|${nonce}`);
  return parseInt(hash, 16) < target;
}

const generateMnemonic = () => {
  const entropy = ethers.randomBytes(16);
  return ethers.Mnemonic.entropyToPhrase(entropy);
}

app.get("/", (req: Request, res: Response) => {
  const html = fs.readFileSync("../website/dist/index.html", "utf8");
  res.send(html
    .replace("{{SOLVE_POW_PY_URL}}", `http://${PUBLIC_IP}:8545/pow.py`)
    .replaceAll("{{CHALLENGE}}", generateUniquieId(32))
    .replace("{{DIFFICULTY}}", `${PRODUCTION ? 24 : 16}`));
});

app.get("/pow.py", (req: Request, res: Response) => {
  const pow = fs.readFileSync("../pow.py", "utf8");
  res.set("Content-Type", "text/plain");
  res.send(pow);
});

const newSandboxLimiter = rateLimit({
  windowMs: 60 * 1000 * 15,
  limit: 2,
  message: { 
    message: "Too many instances created, try again later. (What are you doing? isn't there is a kill endpoint?)"
  }
});

app.post("/new", newSandboxLimiter, async (req: Request, res: Response) => {
  const { uid, nonce, challenge } = req.body;
  if (uid && sandboxes[uid] && sandboxes[uid].running) {
    newSandboxLimiter.resetKey(req.ip!);
    res.status(400).send({
      "message": "You already have a instance, kill it to create a new one."
    });
    return;
  }

  if (!nonce || !challenge) { 
    newSandboxLimiter.resetKey(req.ip!);
    res.status(400).send({
      "message": "Invalid request."
    });
    return;
  }

  if (usedProofs.has(sha256(`${nonce}|${challenge}`))) {
    newSandboxLimiter.resetKey(req.ip!);
    res.status(400).send({
      "message": "Proof of work already used."
    });
    return;
  }

  if (!verifyProofOfWork(nonce, challenge, PRODUCTION ? 24 : 16)) {
    newSandboxLimiter.resetKey(req.ip!);
    res.status(400).send({
      "message": "Invalid proof of work."
    });
    return;
  }

  usedProofs.add(sha256(`${nonce}|${challenge}`));

  try {
    let uniqueString = '';
    do {
      uniqueString = generateUniquieId();
    } while (sandboxes[uniqueString]);
    
    const mnemonic = generateMnemonic();
    const playerMnemonic = generateMnemonic();

    let port = 0;
    do {
      port = Math.floor(Math.random() * 1024) + 61006 + 16;
    } while (sandboxes[port]);

    const anvil = spawn("anvil", [
      "--accounts", "1",
      "--balance", "200000",
      // "--host", "0.0.0.0",
      "--port", `${port}`,
      "--mnemonic", mnemonic,
      // "--mnemonic-random", "12",
      "--gas-limit", "1000000000",
      "--block-base-fee-per-gas", "0",
      "--chain-id", "61006",
      // "--hardfork", "cancun"
    ]);

    await new Promise<void>((resolve, reject) => {
      anvil.stdout.on("data", (data) => {
        const output = data.toString();
        // console.log(`Anvil: ${output}`);
        if (output.includes("Listening")) {
          resolve();
        }
      });

      anvil.stderr.on("data", (data) => {
        console.error(`Anvil Error: ${data}`);
        reject(new Error("Anvil failed to start."));
      });

      anvil.on("close", (code) => {
        reject(new Error(`Anvil exited with code ${code}.`));
      });
    });

    console.log(`Anvil started on port ${port}`);

    const deployerAccount = ethers.HDNodeWallet.fromMnemonic(
      ethers.Mnemonic.fromPhrase(mnemonic),
      `m/44'/60'/0'/0/0`
    );
    const playerAccount = ethers.HDNodeWallet.fromMnemonic(
      ethers.Mnemonic.fromPhrase(playerMnemonic),
      `m/44'/60'/0'/0/0`
    );

    console.log(`Deployer: ${deployerAccount.address}`);
    console.log(`Player: ${playerAccount.address}`);

    const web3 = new ethers.JsonRpcProvider(`http://localhost:${port}`);
    const wallet = new ethers.Wallet(deployerAccount.privateKey, web3);
    const tx = await wallet.sendTransaction({
      to: playerAccount.address,
      value: ethers.parseEther("64")
    });
    await tx.wait();

    const contractData = fs.readFileSync("../blockchain/out/Setup.sol/Setup.json", "utf8");
    const contract = JSON.parse(contractData);
    const factory = new ethers.ContractFactory(contract.abi, contract.bytecode, wallet);
    const setupContract = await factory.deploy(playerAccount.address);
    await setupContract.waitForDeployment();

    const setupContractAddress = await setupContract.getAddress();
    console.log(`Setup contract deployed at ${setupContractAddress}`);

    const setupContract2 = new ethers.Contract(setupContractAddress, contract.abi, wallet);
    const challengeContractAddress = await setupContract2.getChallengeAddress();
    console.log(`Challenge contract deployed at ${challengeContractAddress}`);

    const tx2 = await wallet.sendTransaction({
      to: challengeContractAddress,
      value: ethers.parseEther("2500")
    });
    await tx2.wait();

    const nodeAccounts = [
      {
        address: deployerAccount.address,
        privateKey: deployerAccount.privateKey
      },
      {
        address: playerAccount.address,
        privateKey: playerAccount.privateKey
      }
    ];

    const nodeInfo: NodeInfo = {
      running: true,
      port,
      anvil,
      nodeAccounts,
      mnemonic,
      setupAddress: setupContractAddress,
      challengeAddress: challengeContractAddress
    };

    sandboxes[uniqueString] = nodeInfo;

    setTimeout(() => {
      if (!sandboxes[uniqueString].running) {
        console.log(`Instance ${uniqueString} already killed`);
        return;
      }

      anvil.kill();
      sandboxes[uniqueString].running = false;
      console.log(`Instance ${uniqueString} killed after 15 minutes`);
    }, 1000 * 60 * 15);

    res.send({
      uid: uniqueString,
      rpcUrl: `http://${PUBLIC_IP}:8545/${uniqueString}`,
      playerAddress: nodeInfo.nodeAccounts[1].address,
      privateKey: nodeInfo.nodeAccounts[1].privateKey,
      setupAddress: nodeInfo.setupAddress,
      challengeAddress: nodeInfo.challengeAddress
    });
  } catch (error) {
    newSandboxLimiter.resetKey(req.ip!);
    console.error("Failed to start Anvil:", error);
    res.status(500).send({ 
      "message": "Failed to create instance." 
    });
  }
});

app.get("/:uid", async (req: Request, res: Response) => {
  const { uid } = req.params;
  if (!sandboxes[uid]) {
    res.status(404).send({
      "message": "Instance not found."
    });
    return;
  }

  const game = fs.readFileSync("../website/dist/game.html", "utf8");
  res.send(game);
});

const RULES = {
  "allowed_namespaces": [
    "web3",
    "eth",
    "net"
  ],
  "disallowed_methods": [
    "eth_sign",
    "eth_signTransaction",
    "eth_signTypedData",
    "eth_signTypedData_v3",
    "eth_signTypedData_v4",
    "eth_sendTransaction",
    "eth_sendUnsignedTransaction"
  ]
}

app.post("/:uid", async (req: Request, res: Response) => {
  const { uid } = req.params;
  if (!uid) {
    res.status(400).send({
      "message": "Invalid request."
    });
    return;
  }

  const sandbox = sandboxes[uid];
  if (!sandbox) {
    res.status(404).send({
      "message": "Instance not found."
    });
    return;
  }

  if (!sandbox.running) {
    res.status(400).send({
      "message": "Instance is not running, create a new one."
    });
    return
  }

  if (req.body["id"] === undefined) {
    res.status(400).send({
      "message": "Invalid request."
    });
    return;
  }

  if (req.body["method"] === undefined) {
    res.send({
      "jsonrpc": "2.0",
      "error": {
        "code": -32600, 
        "message": "Invalid request."
      },
      "id": req.body.id
    });
    return;
  }

  const allowed = RULES.allowed_namespaces.includes(req.body.method.split("_")[0]);
  const disallowed = RULES.disallowed_methods.includes(req.body.method);

  if (!allowed || disallowed) {
    res.send({
      "jsonrpc": "2.0",
      "error": {
        "code": -32601, 
        "message": "Method not allowed."
      },
      "id": req.body.id
    });
    return;
  }

  try {
    const response = await fetch(`http://localhost:${sandbox.port}`, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" }
    });
    const data = await response.json();
    
    console.log(`${JSON.stringify(req.body)}`);
    console.log(`${JSON.stringify(data)}`);

    res.send(data);
  } catch (error) {
    console.error("Failed to forward request:", error);
    res.send({
      "jsonrpc": "2.0",
      "error": {
        "code": -32603, 
        "message": "Internal error."
      },
      "id": req.body.id
    });
  }
});

const killSandboxLimiter = rateLimit({
  windowMs: 60 * 1000 * 5,
  limit: 1,
  message: { 
    message: "Please wait 5 minutes before killing another instance."
  }
});

app.get("/:uid/kill", killSandboxLimiter, (req: Request, res: Response) => {
  const { uid } = req.params;
  if (!uid) {
    killSandboxLimiter.resetKey(req.ip!);
    res.status(400).send({
      "message": "Invalid request."
    });
    return;
  }

  const sandbox = sandboxes[uid];
  if (!sandbox) {
    killSandboxLimiter.resetKey(req.ip!);
    res.status(404).send({
      "message": "Instance not found."
    });
    return;
  }

  if (!sandbox.running) {
    killSandboxLimiter.resetKey(req.ip!);
    res.status(400).send({
      "message": "Instance already killed."
    });
    return;
  }

  try {
    sandbox.anvil.kill();
    sandbox.running = false;

    console.log(`Instance ${uid} killed`);

    newSandboxLimiter.resetKey(req.ip!);

    res.send({
      "message": "Instance killed."
    });
  } catch (error) {
    killSandboxLimiter.resetKey(req.ip!);
    console.error("Failed to kill instance:", error);
    res.status(500).send({
      "message": "Failed to kill instance."
    });
  }
});

app.get("/:uid/flag", async (req: Request, res: Response) => {
  const { uid } = req.params;
  if (!uid) {
    res.status(400).send({
      "message": "Invalid request."
    });
    return;
  }

  const sandbox = sandboxes[uid];
  if (!sandbox) {
    res.status(404).send({
      "message": "Instance not found."
    });
    return;
  }

  if (!sandbox.running) {
    res.status(400).send({
      "message": "Instance is not running, create a new one."
    });
    return;
  }

  try {
    const contractData = fs.readFileSync("../blockchain/out/Challenge.sol/Challenge.json", "utf8");
    const contract = JSON.parse(contractData);

    const web3 = new ethers.JsonRpcProvider(`http://localhost:${sandbox.port}`);
    const wallet = new ethers.Wallet(sandbox.nodeAccounts[1].privateKey, web3);
    const setupContract = new ethers.Contract(sandbox.setupAddress, contract.abi, wallet);
    const isSolved = await setupContract.isSolved();

    if (!isSolved) {
      res.status(400).send({
        "message": "Challenge is not solved yet."
      });
      return;
    }

    const flag = fs.readFileSync(PRODUCTION ? "/flag.txt" : "../flag.txt", "utf8");
    res.send({
      "message": flag
    });
  } catch (error) {
    console.error("Failed to read flag:", error);
    res.status(500).send({
      "message": "Failed to read flag."
    });
  }
});

app.listen(8545, () => console.log(`Server running on port http://${PUBLIC_IP}:8545`));
