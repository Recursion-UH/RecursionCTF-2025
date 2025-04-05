// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleContract {
    string public message;

    constructor(string memory _message) {
        message = _message;
    }

    function setMessage(string memory _newMessage) public {
        message = _newMessage;
    }
}
