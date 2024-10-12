// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

// La equivalencia entre millas y km es 1 milla = 1,60934 km
// Buenos Aires - Montevideo = 203km / 1,60934 = 127mi
// Buenos Aires - Cordoba = 647km / 1,60934 = 404mi
// Buenos Aires - Bariloche = 1310km / 1,60934 = 814mi
// Buenos Aires - Salta = 1295km / 1,60934 = 805mi
// Buenos Aires - Lima = 3156km / 1,60934 = 1962mi
// Buenos Aires - Bogota = 4694km / 1,60934 = 3085mi
// Buenos Aires - Madrid = 10075km / 1,60934 = 6261mi
// Buenos Aires - Bangkok = 16946km / 1,60934 = 10.530mi


contract Wingz {
    mapping (address => uint) public balances;
    // 1 WIN = 100 millas
    mapping(address => bool) public hasClaimed;
    uint public totalSupply;
    uint public totalClaimed;
    uint256 _claimed = 1000;

    constructor() {
        totalSupply = 100000000;
        balances[msg.sender] = totalSupply;
        totalClaimed = 0;
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