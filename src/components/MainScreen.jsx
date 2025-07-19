import React, { useState, useEffect } from "react";
import "./MainScreen.css";

function UserBox({ idx, userBalance, userCash, incomeAmount, incomeShown }) {
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
    <div className="user-box">
      <strong>User{idx + 1}</strong><br />
      {showIncome && <div className="income-text">+${incomeAmount.toLocaleString()} 💵</div>}
      <p>💵 Cash: ${displayedCash.toLocaleString()}</p>
      <p>🪙 MetaPay: {userBalance}</p>
    </div>
  );
}

function MainScreen({
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
  setCompanyCashBalances
}) {
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
      warnings.push(`❗ 지급 예정 금액(${plannedOutflowAmount})이 기업 유입 금액(${inflowAmount})보다 많습니다.`);

    if (typeof senderBalance === 'number' && senderBalance === 0)
      warnings.push("❗ 현재 메타페이 잔액이 0입니다. 송금은 가능하지만 위험할 수 있습니다.");

    if (senderBalance > 0 && transferAmount > senderBalance * 0.5)
      warnings.push(`⚠️ 보유 잔액의 50%(${(senderBalance * 0.5).toFixed(2)}) 이상을 송금하려고 합니다.`);

    return warnings;
  };

  const handleDistributeWithCash = async () => {
    await onDistribute();
  };

  const aiAnalysis = () => {
    addAlert("success", "AI Analysis executed");
  };

  const sendP2P = async () => {
    if (!recipient || !amount) return;

    const senderIdx = userAddresses.findIndex(a => a.toLowerCase() === connectedWallet.toLowerCase());
    if (senderIdx === -1) {
      addAlert("warning", "❗ 현재 연결된 지갑은 등록된 사용자 지갑이 아닙니다.");
      return;
    }

    const senderBalance = userBalances[senderIdx];
    if (senderBalance === undefined) {
      addAlert("warning", "❗ 사용자 잔액 정보를 불러오는 중입니다. 다시 시도하세요.");
      return;
    }

    const totalCompanyInflow = companyBalances.reduce((acc, bal) => acc + bal, 0);
    const totalUserOutflow = userBalances.reduce((acc, bal) => acc + bal, 0);

    const warnings = checkTransferRules({
      inflowAmount: totalCompanyInflow,
      plannedOutflowAmount: totalUserOutflow,
      senderBalance: senderBalance,
      transferAmount: Number(amount)
    });

    warnings.forEach(w => addAlert("warning", w));

    try {
      const tx = await contract.transfer(recipient, Number(amount));
      await tx.wait();
      onFetchBalances();

      setUserCashBalances((prev) => {
        const newCash = [...prev];
        if (senderIdx !== -1) newCash[senderIdx] -= Number(amount);
        return newCash;
      });

      addAlert("success", `✅ Sent ${amount} to ${getShortName(recipient)}`);
      setRecipient("");
      setAmount("");
    } catch (err) {
      console.error("P2P Transfer Error", err);
      addAlert("error", "❌ P2P Transfer failed");
    }
  };

  useEffect(() => {
    if (contract) onFetchBalances();
  }, [contract]);

  const handleCollectWithCheck = async () => {
    await onCollect();
    await onFetchBalances();

    const expectedTotal = 5000 * distributionCount;
    const actualTotal = nationalBalance;

    if (actualTotal !== expectedTotal) {
      const diff = expectedTotal - actualTotal;
      addAlert("warning", `⚖️ 총 회수액이 5000이어야 합니다. 차액 ${diff} MetaPay 만큼 관리자 지갑에서 직접 송금하세요.`);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="alerts-box">
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
            <button onClick={sendP2P}>Send</button>
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
              />
            ))}
          </div>

          <div className="company-list-grid">
            {companyBalances.map((bal, idx) => (
              <div key={idx} className="company-box">
                <strong>Company{idx + 1}</strong><br />
                🪙 MetaPay: {bal}<br />
                💵 Cash: {companyCashBalances[idx]}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default MainScreen;
