import fs from "fs";
import solc from "solc";
import { ethers } from "ethers";

const source = fs.readFileSync("SimpleContract.sol", "utf8");
const input = { language: "Solidity", sources: { "./SimpleContract.sol": { content: source } }, settings: { outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } } } };
const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contract = output.contracts["./SimpleContract.sol"]["SimpleContract"];

const provider = new ethers.EtherscanProvider("sepolia", "eitsngapain");
const wallet = new ethers.Wallet("eitsngapain", provider);
const walletAddress = wallet.address;

console.log("Wallet Address:", walletAddress);

async function deployContract() {
    const factory = new ethers.ContractFactory(contract.abi, contract.evm.bytecode.object, wallet);
    const contractInstance = await factory.deploy("Hello, Sepolia!");
    const address = await contractInstance.getAddress();
    await contractInstance.waitForDeployment();
    return address;
}

async function sendTransaction() {
    // const contractAddress = await deployContract();
    const contractAddress = "0x4D62767754b89F9d5093A586f034fFF622047E31";
    console.log("Contract Address:", contractAddress);

    const simpleContract = new ethers.Contract(contractAddress, contract.abi, wallet);
    const txResponse = await simpleContract.setMessage("RECURSION{fake_flag_do_not_use}");
    console.log("Transaction Hash:", txResponse.hash);

    await txResponse.wait();
    console.log("Transaction Confirmed!");
}

sendTransaction();
