import React, { useState, useEffect } from "react";
import "./MainScreen.css";

function UserBox({ idx, userBalance, userCash, incomeAmount, incomeShown, address, onSelect }) {
  const [displayedCash, setDisplayedCash] = useState(userCash);
  const [showIncome, setShowIncome] = useState(false);

  useEffect(() => setDisplayedCash(userCash), [userCash]);

  useEffect(() => {
    if (incomeShown) {
      setShowIncome(true);
      const timer = setTimeout(() => setShowIncome(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [incomeShown]);

  return (
    <div className="user-box" onClick={() => onSelect(address)} style={{ cursor: "pointer" }}>
      <strong>User{idx + 1}</strong><br />
      {showIncome && <div className="income-text">+${incomeAmount.toLocaleString()} 💵</div>}
      <p className="cash-line">💵 Cash: ${displayedCash.toLocaleString()}</p>
      <p className="metapay-line">🪙 MetaPay: {userBalance}</p>
    </div>
  );
}

function CompanyBox({ idx, balance, cash, address, onSelect }) {
  return (
    <div className="company-box" onClick={() => onSelect(address)} style={{ cursor: "pointer" }}>
      <strong>Company{idx + 1}</strong><br />
      <p className="metapay-line">🪙 MetaPay: {balance}</p>
      <p className="cash-line">💵 Cash: {cash}</p>
    </div>
  );
}

function MainScreen(props) {
  useEffect(() => {
    console.log("✅ API URL:", import.meta.env.VITE_API_URL);
  }, []);

  const {
    connectedWallet,
    contract,
    alerts,
    setAlerts,
    userBalances,
    userCashBalances,
    companyBalances,
    companyCashBalances,
    incomeData,
    nationalBalance,
    onDistribute,
    onCollect,
    onReset,
    onFetchBalances,
    distributionCount,
    setUserCashBalances,
    setCompanyCashBalances,
    transactions,
    setTransactions,
  } = props;

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const audio = new Audio("/sound/main.mp3");
    audio.volume = 0.3;
    audio.loop = true;
    audio.play();
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

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

  const companyAddresses = [
    "0x235a5a253873e1DfDE4AB970C3C8bBDB4A962b5b",
    "0x65077De588c690D2BAA9c83B783E378445B69C18",
    "0x8266893251a5CEa9b88701044aa5D8b1D1a9C64f",
    "0xb18BAdd5FeBe08489c7F0aFc54c77e55133360ce",
    "0x527F433024e646e44d479D4396D53B5544D88D84"
  ];

  const getShortName = (address) => {
    const userIdx = userAddresses.findIndex(a => a.toLowerCase() === address.toLowerCase());
    if (userIdx !== -1) return `User${userIdx + 1}`;
    const companyIdx = companyAddresses.findIndex(a => a.toLowerCase() === address.toLowerCase());
    if (companyIdx !== -1) return `Company${companyIdx + 1}`;
    return address.slice(0, 6) + "..." + address.slice(-4);
  };

  const addAlert = (type, message) => {
    setAlerts((prev) => [...prev, { type, message }]);
  };

  useEffect(() => {
    if (alerts.length > 20) {
      setAlerts((prev) => prev.slice(-20));
    }
  }, [alerts]);

  const checkTransferRules = ({ inflowAmount, plannedOutflowAmount, senderBalance, transferAmount }) => {
    const warnings = [];
    if (plannedOutflowAmount > inflowAmount && inflowAmount > 0)
      warnings.push(`❗ Planned payout (${plannedOutflowAmount}) exceeds company inflow (${inflowAmount}).`);

    if (typeof senderBalance === 'number' && senderBalance === 0)
      warnings.push("❗ Current MetaPay balance is 0. Transfer is possible but may be risky.");

    if (senderBalance > 0 && transferAmount > senderBalance * 0.5)
      warnings.push(`⚠️ You are trying to transfer more than 50% of your MetaPay balance (${(senderBalance * 0.5).toFixed(2)}).`);

    return warnings;
  };

  const handleDistributeWithCash = async () => {
    const success = await onDistribute();
    if (!success) {
      addAlert("error", "❌ Distribution failed (MainScreen)");
    }
  };

 const aiAnalysis = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        users: [
          ...userAddresses.map((addr, idx) => ({
            label: `User${idx + 1}`,
            address: addr,
            balance: userBalances[idx],
          })),
          ...companyAddresses.map((addr, idx) => ({
            label: `Company${idx + 1}`,
            address: addr,
            balance: companyBalances[idx],
          }))
        ],
        transactions: transactions
      }),
    });

    const contentType = response.headers.get("content-type");
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`❌ Server error: ${response.status}\n${errorText}`);
    }

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();

      if (data.alerts && Array.isArray(data.alerts)) {
        data.alerts.forEach((alert) => {
          addAlert(alert.type || "info", alert.message);
        });
      }

      if (data.aiResult) {
        addAlert("success", "🧠 AI Analysis Result:");
        data.aiResult.split("\n").forEach((line) => {
          if (line.trim() !== "") {
            addAlert("info", line.trim());
          }
        });
      }
    } else {
      const text = await response.text();
      throw new Error("❌ Invalid JSON response:\n" + text);
    }

  } catch (err) {
    console.error("AI analysis error:", err);
    addAlert("error", "❌ AI Analysis Failed: " + err.message);
  }
};


  const sendP2P = async () => {
    if (!recipient || !amount) return;
    const senderIdx = userAddresses.findIndex(a => a.toLowerCase() === connectedWallet.toLowerCase());
    const senderCompanyIdx = companyAddresses.findIndex(a => a.toLowerCase() === connectedWallet.toLowerCase());

    if (senderIdx === -1 && senderCompanyIdx === -1) {
      addAlert("warning", "❗ The connected wallet is not a registered user or company wallet.");
      return;
    }

    try {
      const tx = await contract.transfer(recipient, Number(amount));
      await tx.wait();
      onFetchBalances();

      if (senderIdx !== -1) {
        setUserCashBalances(prev => {
          const newCash = [...prev];
          newCash[senderIdx] -= Number(amount);
          return newCash;
        });
      } else if (senderCompanyIdx !== -1) {
        setCompanyCashBalances(prev => {
          const newCash = [...prev];
          newCash[senderCompanyIdx] -= Number(amount);
          return newCash;
        });
      }

      const recipientIdx = userAddresses.findIndex(a => a.toLowerCase() === recipient.toLowerCase());
      const recipientCompanyIdx = companyAddresses.findIndex(a => a.toLowerCase() === recipient.toLowerCase());

      if (recipientIdx !== -1) {
        setUserCashBalances(prev => {
          const newCash = [...prev];
          newCash[recipientIdx] += Number(amount);
          return newCash;
        });
      } else if (recipientCompanyIdx !== -1) {
        setCompanyCashBalances(prev => {
          const newCash = [...prev];
          newCash[recipientCompanyIdx] += Number(amount);
          return newCash;
        });
      }

      setTransactions(prev => [
        ...prev,
        {
          from: connectedWallet,
          to: recipient,
          amount: Number(amount),
          cashAmount: Number(amount),
          type: "MetaPay+Cash",
          timestamp: new Date().toISOString()
        }
      ]);

      addAlert("success", `✅ Sent ${amount} to ${getShortName(recipient)}`);
      setRecipient("");
      setAmount("");
    } catch (err) {
      console.error("P2P Transfer Error", err);
      addAlert("error", "❌ P2P Transfer failed");
    }
  };

  const sendCashOnly = async () => {
    if (!recipient || !amount) return;

    const senderUserIdx = userAddresses.findIndex(a => a.toLowerCase() === connectedWallet.toLowerCase());
    const senderCompanyIdx = companyAddresses.findIndex(a => a.toLowerCase() === connectedWallet.toLowerCase());

    if (senderUserIdx === -1 && senderCompanyIdx === -1) {
      addAlert("warning", "❗ The connected wallet is not a registered user or company wallet.");
      return;
    }

    if (senderUserIdx !== -1) {
      setUserCashBalances((prev) => {
        const newCash = [...prev];
        newCash[senderUserIdx] -= Number(amount);
        return newCash;
      });
    } else {
      setCompanyCashBalances((prev) => {
        const newCash = [...prev];
        newCash[senderCompanyIdx] -= Number(amount);
        return newCash;
      });
    }

    const recipientUserIdx = userAddresses.findIndex(a => a.toLowerCase() === recipient.toLowerCase());
    const recipientCompanyIdx = companyAddresses.findIndex(a => a.toLowerCase() === recipient.toLowerCase());

    if (recipientUserIdx !== -1) {
      setUserCashBalances((prev) => {
        const newCash = [...prev];
        newCash[recipientUserIdx] += Number(amount);
        return newCash;
      });
    } else if (recipientCompanyIdx !== -1) {
      setCompanyCashBalances((prev) => {
        const newCash = [...prev];
        newCash[recipientCompanyIdx] += Number(amount);
        return newCash;
      });
    }

    setTransactions(prev => [
      ...prev,
      {
        from: connectedWallet,
        to: recipient,
        amount: 0,
        cashAmount: Number(amount),
        type: "CashOnly",
        timestamp: new Date().toISOString()
      }
    ]);

    addAlert("success", `✅ Sent ${amount} cash only to ${getShortName(recipient)}`);
    setRecipient("");
    setAmount("");
  };

  useEffect(() => {
    if (contract) onFetchBalances();
  }, [contract]);

  const handleCollectWithCheck = async () => {
    await onCollect();
    await onFetchBalances();

    const totalUserBalance = userBalances.reduce((sum, balance) => sum + balance, 0);
    const expectedTotal = Math.floor(totalUserBalance * 0.1);
    const actualTotal = nationalBalance;

    if (actualTotal < expectedTotal) {
      const diff = expectedTotal - actualTotal;
      addAlert("warning", `⚖️ Total collected amount should be ${expectedTotal}. Please send ${diff} MetaPay manually from the admin wallet.`);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="alerts-box" style={{ maxHeight: '600px', overflowY: 'auto' }}>
        <h4>AI Analysis Alerts</h4>
        <ul>
          {alerts.map((a, idx) => (
            <li key={idx} className={a.type}>{a.message}</li>
          ))}
        </ul>
      </div>

      <div className="main-container">
        <div className="content-wrapper">
          <h2>MetaPay Basic Income Simulator</h2>
          <p><strong>National Wallet Balance:</strong> {nationalBalance}</p>
          <p><strong>Distribution Count:</strong> {distributionCount} times</p>

          <div className="button-group">
            <button onClick={handleDistributeWithCash}>Distribute</button>
            <button onClick={handleCollectWithCheck}>Collect</button>
            <button onClick={onReset}>Reset</button>
            <button onClick={onFetchBalances}>Check Balances</button>
            <button onClick={aiAnalysis}>AI Analysis</button>
          </div>

          <div className="transaction-summary">
            <h3>Current Transaction Summary</h3>
            <p>💼 Total Company Inflow: {companyBalances.reduce((acc, bal) => acc + bal, 0)}</p>
            <p>👤 Total User Distributed: {userBalances.reduce((acc, bal) => acc + bal, 0)}</p>
          </div>

          <div className="p2p-transfer">
            <h3>P2P Transfer</h3>
            <input type="text" value={recipient} placeholder="Recipient Address" onChange={(e) => setRecipient(e.target.value)} />
            <input type="number" value={amount} placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
            <div className="button-group">
              <button onClick={sendP2P}>Send (MetaPay + Cash)</button>
              <button onClick={sendCashOnly}>Send Cash Only</button>
            </div>
          </div>

          <div className="user-list-grid">
            {userBalances.map((bal, idx) => (
              <UserBox
                key={idx}
                idx={idx}
                userBalance={bal}
                userCash={userCashBalances[idx]}
                incomeAmount={incomeData[idx] || 0}
                incomeShown={incomeData[idx] > 0}
                address={userAddresses[idx]}
                onSelect={setRecipient}
              />
            ))}
          </div>

          <div className="company-list-grid">
            {companyBalances.map((bal, idx) => (
              <CompanyBox
                key={idx}
                idx={idx}
                balance={bal}
                cash={companyCashBalances[idx]}
                address={companyAddresses[idx]}
                onSelect={setRecipient}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="transaction-box" style={{ position: 'absolute', top: '20px', right: '40px', backgroundColor: 'white', color: 'black', padding: '12px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)', maxHeight: '600px', overflowY: 'auto', width: '300px' }}>
        <h4>📎 Transaction History</h4>
        <ul>
          {transactions.slice(-30).map((tx, idx) => (
            <li key={idx} style={{ marginBottom: '12px' }}>
              {getShortName(tx.from)} → {getShortName(tx.to)}:<br />
              💰 {tx.amount} MetaPay / 💵 {tx.cashAmount} Cash<br />
              🕒 {new Date(tx.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainScreen;
