// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./BitwiseOps.sol";

contract CriminalDossier {

    // _______________ Storage _______________
    uint256 private allInfo;

    // _______________ Events _______________
    event SetInfo(address person, uint64 plannedImprisonmentYears, uint32 imprisonmentYears);

    constructor(address _person, uint64 _plannedImprisonmentYears, uint32 _imprisonmentYears) {
        setInfo(_person, _plannedImprisonmentYears, _imprisonmentYears);
    }

    // _______________ Setter _______________
    function setInfo(address _person, uint64 _plannedImprisonmentYears, uint32 _imprisonmentYears) public {
        // convert all input info to shifted uind data
        uint160 shiftedUintPerson = uint160(_person);
        uint shiftedPlannedImprisonmentYears = _shiftLeft(_plannedImprisonmentYears, 160);
        uint shiftedImprisonmentYears = _shiftLeft(_imprisonmentYears, 224);        

        console.log("Setting data:");
        console.log(_plannedImprisonmentYears);
        console.log(shiftedPlannedImprisonmentYears);
        console.log("___ ___ ___ ___ ___");

        // save datas to allInfo storage variable
        allInfo = _or(allInfo, shiftedUintPerson);
        allInfo = _or(allInfo, shiftedPlannedImprisonmentYears);
        allInfo = _or(allInfo, shiftedImprisonmentYears);

        emit SetInfo(_person, _plannedImprisonmentYears, _imprisonmentYears);
    }

    // _______________ Getters _______________
    function getPerson() public view returns (address) {

        uint mask = (2**160 - 1);
        uint256 uintAddress = _and(allInfo, mask);

        return address(uint160(uint(uintAddress)));
    }

    function getImprisonmentYears() public view returns (uint32) {

        uint mask = (2**256) - (2**224);
        uint256 imprisonmentYears = _and(allInfo, mask);
        uint256 shiftedImprisonmentYears = _shiftRight(imprisonmentYears, 224);

        return uint32(shiftedImprisonmentYears);
    }

    function getPlannedImprisonmentYears() public view returns (uint64) {

        uint mask = (2**224) - (2**160);
        uint256 plannedImprisonmentYears = _and(allInfo, mask);
        uint256 shiftedPlannedImprisonmentYears = _shiftRight(plannedImprisonmentYears, 160);

        console.log("Uint64:");
        console.log(plannedImprisonmentYears);
        console.log(shiftedPlannedImprisonmentYears);
        console.log("___ ___ ___ ___ ___");

        return uint64(shiftedPlannedImprisonmentYears);
    }

    // _______________ BitwiseOps _______________
    function _and(uint x, uint y) private pure returns (uint) {
        return x & y;
    }

    function _or(uint x, uint y) private pure returns (uint) {
        return x | y;
    }

    function _shiftLeft(uint x, uint bits) private pure returns (uint) {
        return x << bits;
    }

    function _shiftRight(uint x, uint bits) private pure returns (uint) {
        return x >> bits;
    }
}
