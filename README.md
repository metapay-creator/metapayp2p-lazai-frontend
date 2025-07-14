# MetaPayP2P – Web3 Basic Income Simulation with AI & Peer Transfers (Powered by OpenAI API)

![License: Custom MIT (no commercial use)](https://img.shields.io/badge/license-MIT--No--Commercial--Use-red)

A blockchain-based universal basic income simulation that includes peer-to-peer transactions and AI-powered reasoning logic using the OpenAI API.

## 🌍 Overview
MetaPayP2P is a Web3-based simulation model of a circulating basic income system:
- A national wallet distributes funds to 10 citizen wallets.
- Citizens can conduct peer-to-peer (P2P) transfers based on logic or AI suggestions.
- Every 10 distribution cycles, 10% of balances are collected back to ensure sustainability.
- AI logic is powered by the OpenAI API to simulate economic decision-making.
- Built with Solidity smart contracts, Vite + React frontend, and Node.js backend.

## 🔧 Tech Stack
- **Smart Contract:** Solidity
- **Frontend:** React (Vite)
- **Backend:** Node.js + Express
- **Blockchain:** Ethereum testnet
- **AI Integration:** OpenAI API (analyze.js / server.js)
- **Wallet Integration:** MetaMask (for testers)

## 📁 Project Structure
```
vite-project/
├── src/
│   ├── App.jsx              # Main frontend logic
│   └── abi.js               # ABI and contract address
├── ai-server/
│   ├── server.js            # Express server with OpenAI API call
│   └── analyze.js           # AI reasoning logic
├── public/
├── LICENSE
└── README.md
```

## 🚀 Getting Started
1. Install dependencies:
```bash
npm install
```
2. Run frontend:
```bash
npm run dev
```
3. Run backend (AI server):
```bash
cd ai-server
node server.js
```

## 🤖 AI-Driven Behavior
Users simulate AI-guided interactions:
- Proportional transfers (e.g. salary)
- Logic-based redistribution
- Collective behaviors suggested by OpenAI API

## ⚠️ License Notice
This project is protected by copyright. Unauthorized **commercial use** is strictly prohibited.
Please contact: anioia33@gmail.com for licensing inquiries.

MIT License (with commercial use restriction)
© 2025 Gyuha Yoon – MetaPay Project for HyperHack

---

## 📝 Smart Contract Source

The complete Solidity smart contract is included in the `/contracts` folder.

- **Contract File:** [`MetaPayP2P_Complete.sol`](./contracts/MetaPayP2P_Complete.sol)
- **Deployed Address:** `0xDFB314c65E8f3e4D6f4Cfac892Fa145b2688E44F` (Sepolia Testnet)
- **Deployed via:** Remix IDE  
- **ABI Source:** [`/src/abi.js`](./src/abi.js)  

This contract handles:
- National fund distribution
- Peer-to-peer transactions
- Corporate account tracking & recollection
- Transaction record logic for AI analysis

---
