const { expect } = require("chai");
const { ethers } = require("hardhat");

const bytes32 = require('bytes32');
const { Bytecode } = require("hardhat/internal/hardhat-network/stack-traces/model");

describe("CriminalDossier", () => {

    let bitwiseOps;
    let dossier;

    let sheriff, criminal, prigozhin;

    let initPerson;
    let initImprisonmentYears;
    let initPlannedImprisonmentYears;

    before(async function () {
        [sheriff, criminal, prigozhin] = await ethers.getSigners();
    });

    beforeEach(async function () {
        // deploy CriminalDossier
        initPerson = prigozhin.address;
        initPlannedImprisonmentYears = 666;
        initImprisonmentYears = 0;
        const CriminalDossier = await ethers.getContractFactory("CriminalDossier");
        dossier = await CriminalDossier.deploy(initPerson,
            initPlannedImprisonmentYears,
            initImprisonmentYears);
        expect(await dossier.deployed()).to.emit("SetInfo").withArgs(initPerson,
            initPlannedImprisonmentYears,
            initImprisonmentYears);
    });
    
    it("Should set info", async () => {
        // setting
        prigozhinPerson = prigozhin.address;
        prigozhinImprisonmentYears = 6;
        prigozhinPlannedImprisonmentYears = 6666;
        expect(await dossier.setInfo(prigozhinPerson,
            prigozhinPlannedImprisonmentYears,
            prigozhinImprisonmentYears)).to.emit("SetInfo").withArgs(prigozhinPerson,
                prigozhinPlannedImprisonmentYears,
                prigozhinImprisonmentYears);
    });

    it("Should not set more then max Imprisonment Years", async () => {
        // setting
        prigozhinPerson = prigozhin.address;
        prigozhinImprisonmentYears = 2**32;
        prigozhinPlannedImprisonmentYears = 6666;
        await expect(dossier.setInfo(prigozhinPerson,
            prigozhinPlannedImprisonmentYears,
            prigozhinImprisonmentYears)).to.be.reverted;
    });

    it("Should get correct person", async () => {
        // setting
        prigozhinPerson = prigozhin.address;
        prigozhinImprisonmentYears = 6;
        prigozhinPlannedImprisonmentYears = 6666;
        expect(await dossier.setInfo(prigozhinPerson,
            prigozhinPlannedImprisonmentYears,
            prigozhinImprisonmentYears)).to.emit("SetInfo").withArgs(prigozhinPerson,
                prigozhinPlannedImprisonmentYears,
                prigozhinImprisonmentYears);
        
        // get person
        let person = await dossier.getPerson();
        expect(person).to.be.equal(prigozhinPerson);
    });

    it("Should get correct imprisonment years", async () => {
        // setting
        prigozhinPerson = prigozhin.address;
        prigozhinImprisonmentYears = 6;
        prigozhinPlannedImprisonmentYears = 6666;
        expect(await dossier.setInfo(prigozhinPerson,
            prigozhinPlannedImprisonmentYears,
            prigozhinImprisonmentYears)).to.emit("SetInfo").withArgs(prigozhinPerson,
                prigozhinPlannedImprisonmentYears,
                prigozhinImprisonmentYears);
        
        // get imprisonment years
        let imprisonmentYears = await dossier.getImprisonmentYears();
        expect(imprisonmentYears).to.be.equal(prigozhinImprisonmentYears);
    });

    it("Should get correct planned imprisonment years", async () => {
        // setting
        prigozhinPerson = prigozhin.address;
        prigozhinImprisonmentYears = 6;
        prigozhinPlannedImprisonmentYears = 6666;
        expect(await dossier.setInfo(prigozhinPerson,
            prigozhinPlannedImprisonmentYears,
            prigozhinImprisonmentYears)).to.emit("SetInfo").withArgs(prigozhinPerson,
                prigozhinPlannedImprisonmentYears,
                prigozhinImprisonmentYears);
        
        // get planned imprisonment years
        let plannedImprisonmentYears = await dossier.getPlannedImprisonmentYears();
        expect(plannedImprisonmentYears).to.be.equal(prigozhinPlannedImprisonmentYears);
    });
});
