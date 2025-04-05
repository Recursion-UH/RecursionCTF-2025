// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { Dice } from "./Dice.sol";

contract Setup {
    Dice public dice;

    constructor() {
        dice = new Dice();
    }

    function isSolved() public view returns (bool) {
        return dice.amIMillionerNow();
    }

    function getChallengeAddress() public view returns (address) {
        return address(dice);
    }
}
