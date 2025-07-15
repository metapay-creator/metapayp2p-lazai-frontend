# MetaPayP2P — Web3 Basic Income Simulation with AI & Peer Transfers
*(Powered by OpenAI API)*

![License: Custom MIT (No Commercial Use)](https://img.shields.io/badge/license-MIT--No--Commercial--Use-red)

---

## 🌍 Project Overview

**MetaPayP2P** is a Web3-based simulation of a **circulating basic income system** designed by **Gyuha Yoon**.
Its purpose is to demonstrate a sustainable economic model where income is continuously circulated rather than endlessly printed.

- ✅ **National Wallet** distributes funds equally to **10 citizen wallets** over **10 distribution rounds**.
- ✅ After every **10 distributions**, **10% of citizen balances are recollected**.
- ✅ This **Distribute → Recollect → Repeat** cycle ensures sustainability.
- ✅ Citizens are free to engage in **peer-to-peer (P2P) transfers** anytime, simulating a real economic ecosystem.
- ✅ **Alith AI** monitors economic activity and warns of imbalances or risks.
- ✅ **OpenAI API** powers AI-generated behavior logic and intelligent alerts.

---

## 🔧 Tech Stack

| Layer | Technology |
|---|---|
| **Smart Contract** | Solidity (Ethereum Sepolia Testnet) |
| **Frontend** | React (Vite) |
| **Backend** | Node.js + Express |
| **Blockchain** | Ethereum Sepolia |
| **AI Integration** | OpenAI API (`analyze.js` / `server.js`) |
| **Wallet** | MetaMask |

---

## 📁 Project Structure

```
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
```

---

## 🚀 Getting Started

1️⃣ Install dependencies  
```
npm install
```

2️⃣ Run frontend (Vite)  
```
npm run dev
```

3️⃣ Run AI backend server  
```
cd ai-server
node server.js
```

---

## 🧠 Alith AI (Alice AI) — Behavior Analysis & Risk Warning

**Alith AI** acts as a simulated AI agent that:  
- 🧩 Analyzes transaction behaviors and P2P transfers  
- ⚖️ Monitors inflow vs. outflow for each corporate account  
- 📢 Generates risk warnings based on behavior patterns  
- 💬 Integrates with OpenAI API for natural language explanations  

---

## 🤖 AI-Driven Behavior Logic

With the power of OpenAI API, MetaPayP2P simulates intelligent interactions such as:  
- 📊 Proportional transfers (e.g., salary)  
- 📉 Risk-based warnings for over-expenditure or liquidity issues  
- 📝 AI-generated suggestions for economic balancing  

---

## 📝 Smart Contract Details

- **Contract Source:** [`MetaPayP2P_Complete.sol`](./contracts/MetaPayP2P_Complete.sol)  
- **Deployed Address:** `0xDFB314c65E8f3e4D6f4Cfac892Fa145b2688E44F` *(Sepolia Testnet)*  
- **Deployment Tool:** Remix IDE  
- **ABI Source:** [`/src/abi.js`](./src/abi.js)  

Core Functions:  
- National fund distribution  
- Peer-to-peer transaction handling  
- Corporate account tracking & recollection logic  
- Transaction record logging for AI analysis  

---

## 🔗 Links

- 📝 **GitHub Repository:** [MetaPayP2P-Clean](https://github.com/metapay-creator/MetaPayP2P-Clean)  
- ▶️ **YouTube Channel:** [MetaPay Project](https://www.youtube.com/@MetaPayProject)  
- 💻 **Testnet Simulation (DApp):** *(Link Coming Soon)*  
- ❌ **Twitter (X):** [@metapay_creator](https://x.com/metapay_creator)  

---

## ⚖️ License Notice

© 2025 Gyuha Yoon — MetaPay Project for HyperHack  

This project is licensed under the **MIT License with Commercial Use Restriction**.  
> ❗ **Commercial use is strictly prohibited without permission.**  

For licensing inquiries, contact: **anioia33@gmail.com**  

---

## 📢 Contact

📧 **anioia33@gmail.com**  
GitHub: [metapay-creator](https://github.com/metapay-creator)  
Twitter: [@metapay_creator](https://x.com/metapay_creator)  
