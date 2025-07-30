// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IVoter.sol";

contract VoterRegistry {
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        address walletAddress;
    }

    mapping(address => Voter) private voters;

    event VoterRegistered(address indexed voter);
    event VoterEligibilityChecked(address indexed voter, bool isEligible);

    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].isRegistered, "Not a registered voter");
        _;
    }

    function registerVoter(address _walletAddress) external {
        require(!voters[_walletAddress].isRegistered, "Voter is already registered");
        voters[_walletAddress] = Voter(true, false, _walletAddress);
        emit VoterRegistered(_walletAddress);
    }

    // New: isVoterRegistered for test compatibility
    function isVoterRegistered(address _walletAddress) external view returns (bool) {
        return voters[_walletAddress].isRegistered;
    }

    // New: checkVoterEligibility for test compatibility
    function checkVoterEligibility(address _walletAddress) external view returns (bool) {
        return voters[_walletAddress].isRegistered;
    }

    function checkEligibility(address _walletAddress) external view returns (bool) {
        bool isEligible = voters[_walletAddress].isRegistered;
        return isEligible;
    }

    function markVoterAsVoted() external onlyRegisteredVoter {
        require(!voters[msg.sender].hasVoted, "Voter has already voted");
        voters[msg.sender].hasVoted = true;
    }

    function hasVoted(address _walletAddress) external view returns (bool) {
        return voters[_walletAddress].hasVoted;
    }
}