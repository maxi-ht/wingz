// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;


contract Wingz {
    mapping (address => uint) public balances;
    mapping(address => bool) public hasClaimed;
    uint public totalSupply;
    uint public totalClaimed;
    uint256 _claimed = 1000;

    constructor() {
        totalSupply = 100000000;
        balances[msg.sender] = totalSupply;
        totalClaimed = 0;
    }   

    function claim (address) public {
        require(totalClaimed < totalSupply, "AllTokensClaimed");
        balances[msg.sender] += _claimed;
        totalClaimed += _claimed;
        hasClaimed[msg.sender] = true;
    }

// This is SafeTransfer

    function addressToString(address _addr) internal pure returns (string memory) {
        bytes memory s = new bytes(42);
        s[0] = '0';
        s[1] = 'x';
        for (uint i = 0; i < 20; i++) {
            uint8 b = uint8(uint160(_addr) >> (i * 8));
            s[2 + i * 2] = bytes1(uint8(b >> 4));
            s[3 + i * 2] = bytes1(uint8(b & 0x0f));
        }
        return string(abi.encodePacked(s));
    }

    function safeTransfer (address _to, uint _amount) public {
        require(_to != address(0), string(abi.encodePacked("UnsafeTransfer: ", addressToString(_to))));
         if (block.chainid == 84531) {
            require(balances[_to] > 0, string(abi.encodePacked("UnsafeTransfer: ", addressToString(_to))));
        }
        balances[msg.sender] -= _amount;
        balances[_to] += _amount;
    }
}