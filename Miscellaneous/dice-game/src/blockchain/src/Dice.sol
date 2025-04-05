// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Dice {
    struct Game {
        bytes32 clientSeed;
        bytes32[] serverSeedChain;
        uint32 remainingRolls;
    }

    mapping(address => Game) public games;
    mapping(address => uint256) public balances;

    function getGameHash(bytes32 serverSeed, bytes32 clientSeed) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(serverSeed, clientSeed));
    }

    function getNumberFromHash(bytes32 gameHash) public pure returns (uint256) {
        return uint256(gameHash) & 0xFFFFFFFFFFFFF;
    }

    function getRoll(bytes32 gameHash) public pure returns (uint256) {
        uint256 seed = getNumberFromHash(gameHash);
        return (seed % 1000) + 1;
    }

    function initialSeed(uint256 offset) public view returns (bytes32) {
        return keccak256(abi.encodePacked(block.timestamp + offset, msg.sender));
    }

    constructor() {
        balances[msg.sender] = 1337;
    }

    function startGame() public {
        require(games[msg.sender].remainingRolls == 0, "Game already in progress");

        bytes32 clientSeed = initialSeed(block.number);
        bytes32[] memory serverSeedChain = new bytes32[](32767);
        serverSeedChain[0] =
            keccak256(abi.encodePacked(initialSeed(block.number + 1)));

        for (uint32 i = 1; i < 32767; i++) {
            serverSeedChain[i] = keccak256(abi.encodePacked(serverSeedChain[i - 1]));
        }

        games[msg.sender] = Game(clientSeed, serverSeedChain, 32767);
    }

    function rollDice(uint256 wager, uint16 rollOver) public {
        require(wager > 0 && wager <= 100, "Wager must be between 1 and 100");
        require(rollOver > 0 && rollOver <= 1000, "Roll over must be between 1 and 1000");
        require(wager <= balances[msg.sender], "Insufficient balance");

        Game storage game = games[msg.sender];
        require(game.remainingRolls > 0, "No rolls remaining");

        balances[msg.sender] -= wager;

        uint32 index = game.remainingRolls - 1;
        bytes32 gameHash = getGameHash(game.serverSeedChain[index], game.clientSeed);
        uint256 roll = getRoll(gameHash);

        uint256 payout = 0;
        if (roll >= rollOver) {
            payout = wager * (102 / (101 - wager));
            balances[msg.sender] += payout;
        }

        game.remainingRolls--;
    }

    function getRollsLeft() public view returns (uint32) {
        return games[msg.sender].remainingRolls;
    }

    function getBalance() public view returns (uint256) {
        return balances[msg.sender];
    }

    function amIMillionerNow() public view returns (bool) {
        if (balances[msg.sender] > 1337006) {
            return true;
        }
        
        return false;
    }
}
