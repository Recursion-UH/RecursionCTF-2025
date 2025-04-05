# Reference

Inspired by [GrowDice Dice Game](https://growdice.net/games/dice).

## Provably Fair

```txt
Active Client Seed
CMip1arvw4

Active Server Seed (Hashed)
578786c4fc1213cddcc857b5a67ee8565e7213fe0ab7f3a9df6f1eb40085c1b4

Bets made with active Server Seed
0

New Client Seed
k7W7yNm0E6
```

### Verification

```js
// GrowDice.net Dice game fairness verification tool

const crypto = require("crypto");
const prompt = require("prompt-sync")({ sigint: true });

function sha256(s) { return crypto.createHash("sha256").update(s).digest("hex"); }
function getGameHash(gameSeed, clientSeed) { return crypto.createHmac("sha256", gameSeed).update(clientSeed).digest("hex"); }
function getNumberFromHash(gameHash) { return parseInt(gameHash.slice(0, 52 / 4), 16); }

function getRoll(gameHash) {
  const seed = getNumberFromHash(gameHash);
  const roll = Math.abs((seed % 1000) + 1);
  return roll;
}

const clientSeed = prompt("Enter Client Seed: ");
let gameSeed = prompt("Enter Game Seed: ");

let keepVerifying = true;
while (keepVerifying) {
  const gameHash = getGameHash(gameSeed, clientSeed);
  const roll = getRoll(gameHash);

  gameSeed = sha256(gameSeed);

  console.log(`Dice: ${roll / 10}`);
  console.log(`Roll: ${roll}`);
  console.log(`Previous Game Seed: ${gameSeed}`);

  keepVerifying = prompt("Verify previous game? (y/n): ") === "y";
}
```
