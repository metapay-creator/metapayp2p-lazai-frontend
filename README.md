# metapayp2p-lazai-frontend on LazAI Testnet — Web3 Basic Income Simulation with AI & Peer Transfers

*(Powered by OpenAI API & Alith AI)*  

---

## 🌍 Project Overview  

metapayp2p-lazai-frontend is a Web3-based simulation of a circulating basic income system designed by Gyuha Yoon.  
Its purpose is to demonstrate a sustainable economic model where income is continuously circulated rather than endlessly printed.  

- ✅ National Wallet distributes funds equally to 10 citizen wallets over 10 distribution rounds.  
- ✅ After every 10 distributions, 10% of citizen balances are recollected.  
- ✅ This Distribute → Recollect → Repeat cycle ensures sustainability.  
- ✅ Citizens are free to engage in peer-to-peer (P2P) transfers anytime, simulating a real economic ecosystem.  
- ✅ Alith AI monitors economic activity and warns of imbalances or risks.  
- ✅ OpenAI API powers AI-generated behavior logic and intelligent alerts.  

---

## 💡 Why MetaPay Matters  

- 🔄 Demonstrates a tax-free, sustainable circulating basic income model.  
- 🏛️ Offers a scalable concept for real-world pilot programs.  
- 🤖 Integrates AI-driven behavior analysis for responsible financial interaction.  
- 💬 Promotes transparent peer-to-peer economic activities on blockchain.  

---

## 🌐 Networks & Contracts  

| Network        | Chain ID | RPC URL                        | Explorer                               | Contract Address  |  
|----------------|---------:|--------------------------------|----------------------------------------|------------------|  
| LazAI Testnet  | 133718   | https://testnet.lazai.network  | https://testnet-explorer.lazai.network | 0x5382...03b8    |  
| Metis Hyperion | 0x24C4   | https://andromeda.metis.io     | https://explorer.hyperion.metis.io     | 0x5382...03b8    |  
| Sepolia        | 0xAA36A7 | https://rpc.sepolia.org        | https://sepolia.etherscan.io           | 0x0464...2BCB    |  

---

## 💹 MetaPay Circulation Model Overview  

![MetaPay Circulation Chart](./public/metapay_full_flow_chart.png)  

- 🟩 Monthly distribution (green)  
- 🟥 Recollection every 10 rounds (red)  
- 🔵 Cumulative circulating balance (blue line)  

**Important:**  
After 10 distributions and 1 recollection, the **National Wallet** may sometimes remain at `4999` instead of `5000`.  
This happens due to rounding effects when collecting 10% from multiple wallets.  

👉 **Fix:** Transfer **1 unit** from any user wallet with an odd balance back to the National Wallet.  

---

## 🚦 Quick Start (3 Steps)  

1. **Add Network to MetaMask**  
   - Choose LazAI Testnet → Enter RPC & Chain ID from the table above.  

2. **Open DApp & Connect**  
   - Visit [Live Simulation](https://metapayp2p-lazai-frontend.vercel.app)  
   - Click **Connect Wallet**  

3. **Run Simulation**  
   - Press **Start** → Observe 10 rounds distribution + 1 round recollection  
   - Try **P2P transfers** → Check **AI Analysis Alerts** box (top-right)  

---

## 🧠 AI Behavior Analysis  

Alith AI + OpenAI API jointly analyze transaction activity and generate alerts:  

- 📊 Detect imbalances in user-to-user transfers  
- ⚖️ Monitor company inflow vs. outflow  
- 📢 Warn of liquidity risks or over-concentration  
- 💬 Provide natural language suggestions for balancing  

---

## 📊 AI Analysis Results  

The AI engine (Alith AI + OpenAI API) continuously monitors activity and generates results:

- ⚠️ User 3 overspending: cash < 20 while MetaPay > 1500  
- ⚠️ Company 2 abnormal inflow concentration (75% this round)  
- ✅ National Wallet stable after 10 distributions + 1 recollection  

👉 These alerts appear in the **AI Analysis Alerts box** (top-right of the DApp).  

📄 Full Report: (shared backend logs on Render)  
🖼 Screenshots:  
- [Analysis-1](https://metapayp2p-lazai-frontend.vercel.app/analysis-1.png)  
- [Analysis-2](https://metapayp2p-lazai-frontend.vercel.app/analysis-2.png)  

---

## 📊 Public Dashboard  

- [Plausible Stats](https://plausible.io/metapayp2p-hyperion-clean2.vercel.app) (click tracking & usage)  

---

## 🛠️ Tech Stack  

| Layer      | Technology                  |  
|------------|------------------------------|  
| Smart Contract | Solidity (LazAI Testnet) |  
| Frontend  | React (Vite)                 |  
| Backend   | Node.js + Express            |  
| Blockchain| LazAI Testnet                |  
| AI Integration | OpenAI API + Alith AI   |  
| Wallet    | MetaMask                     |  

---

## 📂 Project Structure  

```
vite-project/
├── src/
│   ├── App.jsx
│   └── abi.js
├── ai-server/
│   ├── server.js
│   └── analyze.js
├── contracts/
│   └── metapayp2p_lazai.sol
├── public/
│   ├── metapay_full_flow_chart.png
│   ├── analysis-1.png
│   ├── analysis-2.png
│   └── metapay_logo.png
├── LICENSE
└── README.md
```  

---

## 📘 Known Limitations  

- 🔴 **Manual Adjustment**: Occasionally requires 1-unit manual transfer to align balances.  
- 🔴 **Cash Simulation**: Frontend-only, not on-chain.  
- 🔴 **Testnet Performance**: RPC or faucet issues may cause delays.  

---

## 🔗 Links  

- 💻 **Live DApp (LazAI)**: [https://metapayp2p-lazai-frontend.vercel.app](https://metapayp2p-lazai-frontend.vercel.app)  
- 📝 **GitHub Repository (Frontend)**: [metapayp2p-lazai-frontend](https://github.com/metapay-creator/metapayp2p-lazai-frontend)  
- 🔥 **Shared AI Backend (Render)**: [https://metapay-openai-backend.onrender.com](https://metapay-openai-backend.onrender.com)  
- ❌ **Twitter (X)**: [@metapay_creator](https://x.com/metapay_creator)  

---

## 📄 User Guide  

[📄 MetaPayP2P User Manual (Google Drive)](https://drive.google.com/file/d/1SAVL8EIXByRPtT2VqP7soc3sPb3JSiUK/view?usp=sharing)  

---

## ⚖️ License Notice  

© 2025 Gyuha Yoon — MetaPay Project for HyperHack  

This project is licensed under a **modified MIT License** with strict commercial & policy-use restrictions.  
Commercial/policy-level adoption of the **circulating income model** or the **50% MetaPay + 50% cash system** is **prohibited without explicit written permission**.  

For inquiries: 📧 anioia33@gmail.com  

---

## 📢 Contact  

📧 anioia33@gmail.com  
GitHub: [metapay-creator](https://github.com/metapay-creator)  
Twitter: [@metapay_creator](https://x.com/metapay_creator)  

---

## 🪐 [FOR LazAI Testnet / Hackathon]  

This project demonstrates MetaPayP2P on the **LazAI Testnet**, with the same smart contract as Hyperion but deployed with a separate Vercel frontend.  

- Shared AI backend enables seamless risk detection and economic behavior analysis across both testnets.  
- This deployment allows benchmarking between **Hyperion** and **LazAI** performance.  

---

## 🏛️ [FOR NLNET — Open Source Support Application]  

This project has also been submitted to the **NLnet Foundation** as part of its Open Source and Public Digital Infrastructure Initiative.  

metapayp2p-lazai-frontend addresses economic imbalance at scale through a government-grade circulating basic income model.  
While not intended for individual use, it is designed for **policy simulation and national-level pilot experiments**.  

The system is:  
- Fully open source  
- Operates with smart contract automation  
- Integrated with AI for governance and risk alerts  
- Designed for long-term public experimentation  

> ⚠️ **Note for NLnet reviewers:** LazAI deployment offers identical functionality as Hyperion but may have different RPC performance. For smoothest experience, Hyperion deployment is still recommended as the primary testing environment.  
