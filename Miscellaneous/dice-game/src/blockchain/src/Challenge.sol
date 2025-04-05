// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Challenge {
    address public owner;
    bool public solved;

    constructor() {
        owner = msg.sender;
    }

    function solve() external {
        require(msg.sender != owner, "Owner cannot solve");
        solved = true;
    }

    function isSolved() external view returns (bool) {
        return solved;
    }
}
