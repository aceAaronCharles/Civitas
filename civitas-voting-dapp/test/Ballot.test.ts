import { expect } from "chai";
import { ethers } from "hardhat";

// Ensure that the Hardhat Runtime Environment is available
// No additional wrapper is needed, but make sure the test is run with `npx hardhat test`

describe("BallotContract", function () {
    let ballotContract;
    let owner;
    let voter1;
    let voter2;

    beforeEach(async function () {
        [owner, voter1, voter2] = await ethers.getSigners();
        const BallotContract = await ethers.getContractFactory("BallotContract");
        ballotContract = await BallotContract.deploy();
    });

    it("should create an election", async function () {
        await ballotContract["createElection(string,string[])"]("Election 1", ["Candidate A", "Candidate B"]);
        const election = await ballotContract.elections(0);
        const candidates = await ballotContract.getCandidates(0);
        expect(election.name).to.equal("Election 1");
        expect(candidates.length).to.equal(2);
        expect(candidates[0]).to.equal("Candidate A");
        expect(candidates[1]).to.equal("Candidate B");
    });

    it("should allow voters to register", async function () {
        await ballotContract.registerVoter(voter1.address);
        const isRegistered = await ballotContract.isVoterRegistered(voter1.address);
        expect(isRegistered).to.be.true;
    });

    it("should allow voters to cast votes", async function () {
        await ballotContract["createElection(string,string[])"]("Election 1", ["Candidate A", "Candidate B"]);
        await ballotContract.registerVoter(voter1.address);
        await ballotContract.connect(voter1).castVote(0, 1); // Vote for Candidate B
        const voteCount = await ballotContract.getVoteCount(0, 1);
        expect(voteCount).to.equal(1);
    });

    it("should tally results correctly", async function () {
        await ballotContract["createElection(string,string[])"]("Election 1", ["Candidate A", "Candidate B"]);
        await ballotContract.registerVoter(voter1.address);
        await ballotContract.registerVoter(voter2.address);
        await ballotContract.connect(voter1).castVote(0, 0); // Vote for Candidate A
        await ballotContract.connect(voter2).castVote(0, 1); // Vote for Candidate B
        const results = await ballotContract.tallyResults(0);
        expect(results[0]).to.equal(1); // Candidate A votes
        expect(results[1]).to.equal(1); // Candidate B votes
    });
});