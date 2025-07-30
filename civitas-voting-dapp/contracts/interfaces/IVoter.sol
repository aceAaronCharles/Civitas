// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IVoter {
    function registerVoter(address voterAddress) external;
    function isEligible(address voterAddress) external view returns (bool);
    function verifyIdentity(address voterAddress) external;
    function castVote(uint256 electionId, uint256 candidateId) external;
    function getVote(uint256 electionId) external view returns (uint256);
}