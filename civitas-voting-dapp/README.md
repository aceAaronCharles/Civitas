# Civitas Voting DApp

A secure, decentralized blockchain-based voting platform built with Solidity smart contracts and a modern React frontend.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Testing Smart Contracts](#testing-smart-contracts)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Overview
Civitas is a decentralized application (DApp) for transparent, secure, and verifiable voting. It leverages Ethereum-compatible blockchains and smart contracts to ensure a tamper-proof election process, with a user-friendly web interface for voters and administrators.

## Features
- **Voter Registration & Eligibility**: On-chain voter registry with eligibility checks.
- **Election Management**: Create elections with multiple candidates.
- **Secure Voting**: Each registered voter can cast one vote per election.
- **Result Tallying**: Transparent, on-chain vote counting and result display.
- **React Frontend**: Modern UI with wallet connection, voting, and results.
- **Automated Testing**: Hardhat-based test suite for all contract logic.

## Architecture
- **Frontend**: React, TailwindCSS, ethers.js
- **Smart Contracts**: Solidity (0.8.x), Hardhat
- **Blockchain**: Local Hardhat node (default), compatible with Ethereum testnets/mainnet

## Project Structure
```
civitas-voting-dapp/
├── contracts/           # Solidity smart contracts
│   ├── BallotContract.sol
│   └── VoterRegistry.sol
├── frontend/            # React frontend app
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js
│       └── ...
├── test/                # Hardhat contract test suite
│   ├── Ballot.test.ts
│   └── VoterRegistry.test.ts
├── hardhat.config.ts    # Hardhat configuration
└── README.md            # This documentation
```

## Installation & Setup

### Prerequisites
- **Node.js v16.x** (required for frontend; use [nvm](https://github.com/nvm-sh/nvm))
- **npm**
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/aceAaronCharles/Civitas.git
cd Civitas/civitas-voting-dapp
```

### 2. Install Backend/Contract Dependencies
```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

## Running the Application

### 1. Start the Local Blockchain (if needed)
By default, Hardhat uses its own local node. To run a persistent node:
```bash
npx hardhat node
```

### 2. Deploy Smart Contracts
In a separate terminal:
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Start the Frontend (React App)
**Important:** Use Node.js v16 for compatibility!
```bash
cd frontend
nvm use 16
npm start
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Testing Smart Contracts
Run all contract tests with:
```bash
npx hardhat test
```
All tests should pass if contracts and test suite are aligned.

## Troubleshooting
- **Frontend fails to start with OpenSSL error:**
  - Use Node.js v16 (not v20+):
    ```bash
    nvm install 16
    nvm use 16
    ```
- **Missing `public/index.html` or `src/index.js`:**
  - Ensure these files exist in `frontend/`. They are required for Create React App.
- **Contracts/tests fail:**
  - Run `npx hardhat compile` and `npx hardhat test` in the root directory.

## Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request. For major changes, open an issue first to discuss what you would like to change.

## License
MIT
This project is licensed under the MIT License. See the LICENSE file for details.