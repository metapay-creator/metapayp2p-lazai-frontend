---
# 📎 MetaPayP2P User Guide (Updated Version)

## 📌 Overview

MetaPayP2P is a blockchain-based basic income simulation platform, designed to visually demonstrate the flow of MetaPay and cash between individuals and companies. The system is built on a **circulating basic income model** and now incorporates AI-powered analysis to automatically detect **economic patterns**, **distribution/recollection flows**, and **transaction behaviors**.

> 🔟 **July 2025 Update**: Distribution records from the national wallet are now included in the AI analysis. To experience the full OpenAI API-based functionality, testers must provide their own API key.

---

## 🔧 Key Features

### 🟢 Distribute
- The national wallet distributes MetaPay and cash simultaneously to individuals and companies.
- ✅ **These distribution records are now included in the AI analysis** (new).

### 🔴 Collect
- 10% of the MetaPay balance from individuals and companies is recollected back to the national wallet.

### ♻️ Reset
- Resets all balances to the initial state (national wallet: 50000, others: 0).

### 🧠 AI Analysis
- Based on **wallet balances** and **transaction history**, the AI performs:
  - Balance gap analysis between users
  - Company wallet activity monitoring
  - Inclusion of national → individual distributions (new)
  - Inferring transaction relationships between users and companies
  - Imbalance detection in total supply distribution
  - Detection of failed or zero-value transactions

> 💡 Results are displayed automatically in the top-right **“AI Analysis Alerts”** box.

### ↺ Check Balances
- View up-to-date balances of national, individual, and company wallets.

### 📦 P2P Transfers
- Users can manually input wallet addresses to send MetaPay + cash to other users or companies.
- A dedicated "Send Cash Only" option is also available.

---

## 🧠 AI Analysis Example

Upon clicking the analysis button, you might see output like:

```
- User1 holds a lower balance than others due to multiple transactions.
- Company1 is actively involved in transactions, while Company3 and 4 show no activity.
- Users account for 91.3% of total units, with companies holding only 8.7%.
- Some transactions involved only cash without MetaPay, indicating test or special-purpose scenarios.
- The national wallet performed 10 distributions that significantly impacted overall flow. (new)
```

---

## 🛠 System Requirements

- MetaMask wallet connection required
- Works on Vercel or local dev environments
- OpenAI API key required (`.env` file)

```bash
# Create a `.env` file in your root directory and add:
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> `.env.example` is provided as a template. Copy and rename it to `.env`, then insert your key.  
> **AI functions will not work without this key.**

---

## ↺ Development & Execution (Local Testing)

1. **Get your OpenAI API Key**: https://platform.openai.com/signup  
2. **Create `.env` file** in the root and add the key  
3. **Run the AI server**:
```bash
cd ai-server
node server.js
```
4. **Run the frontend**:
```bash
npm run dev
```

---

## 🧪 Simulation Architecture Overview

MetaPayP2P operates using the following tech stack:

| Layer         | Technology                          |
|---------------|--------------------------------------|
| Smart Contract| Solidity (Sepolia Testnet)          |
| Frontend      | React (Vite)                        |
| Backend       | Node.js + Express                   |
| AI Integration| OpenAI API / Alith AI (analyze.js)  |
| Wallet        | MetaMask                            |

```text
📁 Project Structure Summary:

vite-project/
🔹── src/
    🔹── App.jsx              # Frontend logic
    🔹── abi.js               # ABI and contract address
🔹── ai-server/
    🔹── server.js            # OpenAI API handler
    🔹── analyze.js           # AI analysis logic
🔹── contracts/
    🔹── MetaPayP2P_Complete.sol
🔹── public/
    🔹── metapay_full_flow_chart.png
```

---

## 🔗 Links & Resources

- GitHub: [metapay-creator](https://github.com/metapay-creator/MetaPayP2P-Clean)  
- Simulation (Vercel): [Launch App](https://meta-pay-p2-p-clean-7aig.vercel.app)  
- Official User Manual: [📄 Google Drive](https://drive.google.com/file/d/1SAVL8EIXByRPtT2VqP7soc3sPb3JSiUK/view?usp=sharing)  
- Contact: anioia33@gmail.com

---

© 2025 Gyuha Yoon. This project is licensed under the MIT License.  
Commercial use is prohibited without permission. Please contact via email for licensing inquiries.
