MetaPayP2P — Web3 Basic Income Simulation with AI & Peer Transfers

(Powered by OpenAI API & Alith AI)



🌍 Project Overview

MetaPayP2P is a Web3-based simulation of a circulating basic income system designed by Gyuha Yoon.
Its purpose is to demonstrate a sustainable economic model where income is continuously circulated rather than endlessly printed.

✅ National Wallet distributes funds equally to 10 citizen wallets over 10 distribution rounds.

✅ After every 10 distributions, 10% of citizen balances are recollected.

✅ This Distribute → Recollect → Repeat cycle ensures sustainability.

✅ Citizens are free to engage in peer-to-peer (P2P) transfers anytime, simulating a real economic ecosystem.

✅ Alith AI monitors economic activity and warns of imbalances or risks.

✅ OpenAI API powers AI-generated behavior logic and intelligent alerts.

💹 MetaPay Circulation Model Overview

The chart below illustrates the MetaPay Basic Income Circulation Model:

Monthly distribution (green)

Recollection every 10 rounds (red)

Cumulative circulating balance (blue line)



This graph demonstrates how the balance grows with 10 cycles of distribution and stabilizes through periodic recollection, enabling a sustainable circulation model of basic income.

Important: In the MetaPay simulation, the national wallet must follow a strict cycle of 10 rounds of distribution followed by 1 round of recollection, repeated continuously. This ensures the balance circulation model remains sustainable and reflects the core principle of this basic income theory.

Additionally, all peer-to-peer (P2P) transactions between users, as well as transactions between users and companies, are allowed at any time without restrictions. This simulates free-market interactions within the system.

🔧 Tech Stack

Layer

Technology

Smart Contract

Solidity (Ethereum Sepolia Testnet)

Frontend

React (Vite)

Backend

Node.js + Express

Blockchain

Ethereum Sepolia

AI Integration

OpenAI API (analyze.js / server.js)

Wallet

MetaMask

📁 Project Structure

vite-project/
├── src/
│   ├── App.jsx              # Frontend Logic
│   └── abi.js               # Contract ABI & Address
├── ai-server/
│   ├── server.js            # OpenAI API Call Handler
│   └── analyze.js           # AI Logic
├── contracts/
│   └── MetaPayP2P_Complete.sol   # Solidity Smart Contract
├── public/
├── LICENSE
└── README.md

🚀 Getting Started

1️⃣ Install dependencies

npm install

2️⃣ Run frontend (Vite)

npm run dev

3️⃣ Run AI backend server

cd ai-server
node server.js

🧠 Alith AI (Alice AI) — Behavior Analysis & Risk Warning

Alith AI acts as a behavior analysis engine that continuously monitors user transactions, P2P transfers, and corporate fund flows to detect potential risks or abnormal activities.

It complements the OpenAI API by delivering context-aware warnings and balancing suggestions within the basic income simulation.

Through predefined rules and AI-driven analysis, Alith AI ensures that MetaPay's circulating income model remains sustainable and transparent.

🧩 Analyzes transaction behaviors and P2P transfers

⚖️ Monitors inflow vs. outflow for each corporate account

📢 Generates risk warnings based on behavior patterns

💬 Integrates with OpenAI API for natural language explanations

🤖 AI-Driven Behavior Logic

With the power of OpenAI API, MetaPayP2P simulates intelligent interactions such as:

📊 Proportional transfers (e.g., salary)

📉 Risk-based warnings for over-expenditure or liquidity issues

📝 AI-generated suggestions for economic balancing

📝 Smart Contract Details

Contract Source: MetaPayP2P_Complete.sol

Deployed Address: 0xDFB314c65E8f3e4D6f4Cfac892Fa145b2688E44F (Sepolia Testnet)

Deployment Tool: Remix IDE

ABI Source: /src/abi.js

Core Functions:

National fund distribution

Peer-to-peer transaction handling

Corporate account tracking & recollection logic

Transaction record logging for AI analysis

🗂️ Test Wallet Addresses

The following addresses are used in the MetaPayP2P simulation on Sepolia Testnet:

🧑 User Wallets

User1: 0xcAEc83c59b3FbfE65cC73828e9c89b9c07902105

User2: 0x3C39f84a28673bdbA9f19eaAd26e04d95795260C

User3: 0x9D2b9Acad30E1D2a0bb81e96816506C166F2076A

User4: 0x37f047f304B49cE83b5630BCb1D6DF4b05eeD305

User5: 0x4194b9E02e733f112b2b44f40554DAB0EA60b470

User6: 0xc95132B717cFCac125423e07429e8894D18c357B

User7: 0xA0831b8e8628b2C683cd98Fd17020d2376582073

User8: 0x5317F13e44d02E44c899010D4Fb11985657c26D8

User9: 0x4f4728FA3FF45b5459Bfb64C5CD0D78FaEBe12f6

User10: 0xA80E21304603C453f416bE77b210ED0AFf400ed7

🏢 Company Wallets

Company1: 0x235a5a253873e1DfDE4AB970C3C8bBDB4A962b5b

Company2: 0x65077De588c690D2BAA9c83B783E378445B69C18

Company3: 0x8266893251a5CEa9b88701044aa5D8b1D1a9C64f

Company4: 0xb18BAdd5FeBe08489c7F0aFc54c77e55133360ce

Company5: 0x527F433024e646e44d479D4396D53B5544D88D84

🔗 Links

📝 GitHub Repository: MetaPayP2P-Clean

▶️ YouTube Channel: MetaPay Project

💻 Testnet Simulation (DApp): https://meta-pay-p2-p-clean-7aig.vercel.app

❌ Twitter (X): @metapay_creator

⚖️ License Notice

© 2025 Gyuha Yoon — MetaPay Project for HyperHack

This project is licensed under the MIT License with Commercial Use Restriction.

❗ Commercial use is strictly prohibited without permission.

For licensing inquiries, contact: anioia33@gmail.com

📢 Contact

📧 anioia33@gmail.comGitHub: metapay-creatorTwitter: @metapay_creator

