const { expect } = require("chai");
const { ethers } = require("hardhat");

const bytes32 = require('bytes32');
const { Bytecode } = require("hardhat/internal/hardhat-network/stack-traces/model");
const { BigNumber } = require("ethers");

describe("BitwiseOps", () => {

    let bitwiseOps;

    let sheriff;

    before(async function () {
        [sheriff] = await ethers.getSigners();
    });

    beforeEach(async function () {
        const BitwiseOps = await ethers.getContractFactory("BitwiseOps");
        bitwiseOps = await BitwiseOps.deploy();
        await bitwiseOps.deployed();
    });

    it(".and()", async () => {
        let x = 3;
        let y = 4;
        let z = await bitwiseOps.and(x, y);
        expect(z).to.be.equal(0);

        x = 3;
        y = 5;
        z = await bitwiseOps.and(x, y);
        expect(z).to.be.equal(1);

        x = 7;
        y = 5;
        z = await bitwiseOps.and(x, y);
        expect(z).to.be.equal(5);
    });

    it(".or()", async () => {
        let x = 3;
        let y = 4;
        let z = await bitwiseOps.or(x, y);
        expect(z).to.be.equal(7);

        x = 3;
        y = 5;
        z = await bitwiseOps.or(x, y);
        expect(z).to.be.equal(7);

        x = 7;
        y = 5;
        z = await bitwiseOps.or(x, y);
        expect(z).to.be.equal(7);
    });

    it(".xor()", async () => {
        let x = 3;
        let y = 4;
        let z = await bitwiseOps.xor(x, y);
        expect(z).to.be.equal(7);

        x = 3;
        y = 5;
        z = await bitwiseOps.xor(x, y);
        expect(z).to.be.equal(6);

        x = 7;
        y = 5;
        z = await bitwiseOps.xor(x, y);
        expect(z).to.be.equal(2);
    });

    it(".not()", async () => {
        let x = 3;
        let z = await bitwiseOps.not(x);
        expect(z).to.be.equal(252);

        x = 7;
        z = await bitwiseOps.not(x);
        expect(z).to.be.equal(248);
    });

    it(".shiftLeft()", async () => {
        let x = 3;
        let n = 2;
        let z = await bitwiseOps.shiftLeft(x, n);
        expect(z).to.be.equal(12);
    });

    it(".shiftRight()", async () => {
        let x = 8;
        let n = 2;
        let z = await bitwiseOps.shiftRight(x, n);
        expect(z).to.be.equal(2);
    });

    it(".getLastNBits()", async () => {
        let x = 13;
        let n = 3;
        let z = await bitwiseOps.getLastNBits(x, n);
        expect(z).to.be.equal(5);
    });

    it(".getFirstNBits()", async () => {
        let x = 13;
        let n = 2;
        let len = 4;
        let z = await bitwiseOps.getFirstNBits(x, n, len);
        expect(z).to.be.equal(12);
    });
});
