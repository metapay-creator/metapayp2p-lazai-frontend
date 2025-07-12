import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./abi";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState("");
  const [nationalBalance, setNationalBalance] = useState(0);
  const [balances, setBalances] = useState([]);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [p2pResult, setP2pResult] = useState("");
  const [alerts, setAlerts] = useState([]); // AI 경고 메시지

  const userLabels = [
    "User1", "User2", "User3", "User4", "User5",
    "User6", "User7", "User8", "User9", "User10"
  ];

  const userAddresses = [
    "0xcAEc83c59b3FbfE65cC73828e9c89b9c07902105",
    "0x3C39f84a28673bdbA9f19eaAd26e04d95795260C",
    "0x9D2b9Acad30E1D2a0bb81e96816506C166F2076A",
    "0x37f047f304B49cE83b5630BCb1D6DF4b05eeD305",
    "0x4194b9E02e733f112b2b44f40554DAB0EA60b470",
    "0xc95132B717cFCac125423e07429e8894D18c357B",
    "0xA0831b8e8628b2C683cd98Fd17020d2376582073",
    "0x5317F13e44d02E44c899010D4Fb11985657c26D8",
    "0x4f4728FA3FF45b5459Bfb64C5CD0D78FaEBe12f6",
    "0xA80E21304603C453f416bE77b210ED0AFf400ed7"
  ];

  const connectWallet = async () => {
    if (window.ethereum) {
      const ethProvider = new ethers.BrowserProvider(window.ethereum);
      const signer = await ethProvider.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      setProvider(ethProvider);
      setSigner(signer);
      setConnectedWallet(address);
      setContract(contract);
    } else {
      alert("MetaMask not detected");
    }
  };

  const checkBalances = async () => {
    if (!contract) return;
    const data = await contract.checkAllBalances();
    const national = Number(data[0]);
    const userBalances = data[1].map((b) => Number(b));
    setNationalBalance(national);
    setBalances(userBalances);
  };

  const distribute = async () => {
    if (!contract) return;
    const tx = await contract.distribute();
    await tx.wait();
    checkBalances();
  };

  const collect = async () => {
    if (!contract) return;
    const tx = await contract.collect();
    await tx.wait();
    checkBalances();
  };

  const resetAll = async () => {
    if (!contract) return;
    const tx = await contract.resetAll();
    await tx.wait();
    checkBalances();
  };

  const sendP2PTransfer = async () => {
    if (!recipient || !amount) {
      setP2pResult("Please enter recipient address and amount.");
      return;
    }

    try {
      const tx = await contract.transfer(recipient, Number(amount));
      await tx.wait();
      setP2pResult(`✅ Sent ${amount} to ${recipient}`);
      checkBalances();
    } catch (error) {
      setP2pResult(`❌ Transfer failed: ${error.message}`);
    }
  };

  // ✅ 수정된 AI 분석 함수
  const analyzeWithAI = async () => {
    if (!balances || balances.length === 0) return;

    const users = userLabels.map((label, i) => ({
      label,
      address: userAddresses[i],
      balance: balances[i],
    }));

    const transactions = [
      {
        from: userAddresses[0],
        to: userAddresses[1],
        amount: 200,
      },
      {
        from: userAddresses[2],
        to: userAddresses[4],
        amount: 300,
      },
    ];

    try {
      const response = await fetch("http://localhost:3001/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users, transactions }),
      });

      const data = await response.json();
      if (data.result) {
        const points = data.result
          .split("\n")
          .filter((line) => line.trim().startsWith("•") || line.trim().startsWith("-"))
          .map((line) => line.replace(/^[-•]\s*/, ""));

        setAlerts(points);
      } else {
        setAlerts(["❌ No analysis result returned."]);
      }
    } catch (error) {
      console.error("AI Analysis Error:", error);
      setAlerts(["❌ AI analysis failed."]);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>MetaPayP2P Simulation</h1>
      <p>Connected wallet: {connectedWallet}</p>
      <p>National wallet balance: {nationalBalance}</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", marginTop: "20px" }}>
        {userLabels.map((label, index) => (
          <div key={index} style={{
            border: "1px solid #ccc",
            padding: "10px",
            textAlign: "center",
            position: "relative"
          }}>
            <strong>{label}</strong>
            <div>{balances[index] || 0}</div>
            {alerts[index] && (
              <div style={{
                color: "red",
                fontSize: "12px",
                marginTop: "6px"
              }}>
                ⚠ {alerts[index]}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "30px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={distribute}>Distribute</button>
        <button onClick={collect}>Collect</button>
        <button onClick={resetAll}>Reset</button>
        <button onClick={checkBalances}>Check Balances</button>
        <button onClick={analyzeWithAI}>AI Analyze</button>
      </div>

      <h3 style={{ marginTop: "30px" }}>P2P Transfer</h3>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="Recipient address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          style={{ flex: 1 }}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: "100px" }}
        />
        <button onClick={sendP2PTransfer}>Send</button>
      </div>

      <div style={{ color: "gray", minHeight: "24px" }}>
        {p2pResult}
      </div>
    </div>
  );
}

export default App;
