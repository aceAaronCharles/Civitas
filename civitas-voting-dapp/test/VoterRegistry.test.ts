import { expect } from "chai";
import { ethers } from "hardhat";

describe("VoterRegistry", function () {
    let VoterRegistry;
    let voterRegistry;
    let owner;
    let voter1;
    let voter2;

    beforeEach(async function () {
        VoterRegistry = await ethers.getContractFactory("VoterRegistry");
        [owner, voter1, voter2] = await ethers.getSigners();
        voterRegistry = await VoterRegistry.deploy();
    });

    it("should register a voter", async function () {
        await voterRegistry.registerVoter(voter1.address);
        const isRegistered = await voterRegistry.isVoterRegistered(voter1.address);
        expect(isRegistered).to.be.true;
    });

    it("should not allow a voter to register twice", async function () {
        await voterRegistry.registerVoter(voter1.address);
        await expect(voterRegistry.registerVoter(voter1.address)).to.be.revertedWith("Voter is already registered");
    });

    it("should check voter eligibility", async function () {
        await voterRegistry.registerVoter(voter1.address);
        const isEligible = await voterRegistry.checkVoterEligibility(voter1.address);
        expect(isEligible).to.be.true;
    });

    it("should not allow unregistered voter to check eligibility", async function () {
        const isEligible = await voterRegistry.checkVoterEligibility(voter2.address);
        expect(isEligible).to.be.false;
    });
});