// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract BitwiseOps {
    function and(uint x, uint y) external pure returns (uint) {
        return x & y;
    }

    function or(uint x, uint y) external pure returns (uint) {
        return x | y;
    }

    function xor(uint x, uint y) external pure returns (uint) {
        return x ^ y;
    }

    function not(uint8 x) external pure returns (uint8) {
        return ~x;
    }

    function shiftLeft(uint x, uint bits) external pure returns (uint) {
        return x << bits;
    }

    function shiftRight(uint x, uint bits) external pure returns (uint) {
        return x >> bits;
    }

    function getLastNBits(uint x, uint n) external pure returns (uint) {
        uint mask = (1 << n) - 1;
        return x & mask;
    }

    function getFirstNBits(uint x, uint n, uint len) external pure returns (uint) {
        uint mask = ((1 << n) - 1) << (len - n);
        return x & mask;
    }
}
