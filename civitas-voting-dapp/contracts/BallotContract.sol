// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IVoter.sol";

contract BallotContract {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    struct Election {
        uint id;
        string name;
        mapping(uint => Candidate) candidates;
        uint candidatesCount;
        bool isActive;
        uint totalVotes;
    }

    mapping(uint => Election) public elections;
    uint public electionsCount;
    mapping(address => bool) private registeredVoters;

    event ElectionCreated(uint id, string name);
    event VoteCast(uint electionId, uint candidateId);
    event VoterRegistered(address voter);

    // New: createElection with candidates array
    function createElection(string memory _name, string[] memory _candidates) public {
        uint id = electionsCount;
        Election storage newElection = elections[id];
        newElection.id = id;
        newElection.name = _name;
        newElection.isActive = true;
        for (uint i = 0; i < _candidates.length; i++) {
            newElection.candidatesCount++;
            newElection.candidates[i] = Candidate(i, _candidates[i], 0);
        }
        electionsCount++;
        emit ElectionCreated(id, _name);
    }

    // Original createElection for compatibility
    function createElection(string memory _name) public {
        electionsCount++;
        Election storage newElection = elections[electionsCount - 1];
        newElection.id = electionsCount - 1;
        newElection.name = _name;
        newElection.isActive = true;
        emit ElectionCreated(electionsCount - 1, _name);
    }

    function addCandidate(uint _electionId, string memory _name) public {
        require(elections[_electionId].isActive, "Election is not active");
        Election storage election = elections[_electionId];
        election.candidatesCount++;
        election.candidates[election.candidatesCount - 1] = Candidate(election.candidatesCount - 1, _name, 0);
    }

    // New: registerVoter and isVoterRegistered
    function registerVoter(address voter) public {
        require(!registeredVoters[voter], "Voter is already registered");
        registeredVoters[voter] = true;
        emit VoterRegistered(voter);
    }
    function isVoterRegistered(address voter) public view returns (bool) {
        return registeredVoters[voter];
    }

    // New: getVoteCount
    function getVoteCount(uint _electionId, uint _candidateId) public view returns (uint) {
        return elections[_electionId].candidates[_candidateId].voteCount;
    }

    // New: castVote alias for vote
    function castVote(uint _electionId, uint _candidateId) public {
        vote(_electionId, _candidateId);
    }

    function vote(uint _electionId, uint _candidateId) public {
        require(elections[_electionId].isActive, "Election is not active");
        Election storage election = elections[_electionId];
        require(_candidateId < election.candidatesCount, "Invalid candidate ID");
        election.candidates[_candidateId].voteCount++;
        election.totalVotes++;
        emit VoteCast(_electionId, _candidateId);
    }

    // New: tallyResults returns uint[]
    function tallyResults(uint _electionId) public view returns (uint[] memory) {
        Election storage election = elections[_electionId];
        uint[] memory results = new uint[](election.candidatesCount);
        for (uint i = 0; i < election.candidatesCount; i++) {
            results[i] = election.candidates[i].voteCount;
        }
        return results;
    }

    // Helper: return candidate names for an election
    function getCandidates(uint _electionId) public view returns (string[] memory) {
        Election storage election = elections[_electionId];
        string[] memory candidateNames = new string[](election.candidatesCount);
        for (uint i = 0; i < election.candidatesCount; i++) {
            candidateNames[i] = election.candidates[i].name;
        }
        return candidateNames;
    }
}