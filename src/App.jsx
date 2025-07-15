import React, { useState } from "react";
import { ethers } from "ethers";
import { abi, contractAddress } from "./abi";
import WelcomeScreen from "./components/WelcomeScreen";
import MainScreen from "./components/MainScreen";

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState("");
  const [alerts, setAlerts] = useState([]);
  const [showMainScreen, setShowMainScreen] = useState(false);

  const [userBalances, setUserBalances] = useState(Array(10).fill(0));
  const [userCashBalances, setUserCashBalances] = useState([100000, 50000, 50000, 10000, 5000, 20000, 8000, 9000, 500, 300]);
  const [companyBalances, setCompanyBalances] = useState(Array(5).fill(0));
  const [companyCashBalances, setCompanyCashBalances] = useState([500000, 300000, 100000, 50000, 10000]);
  const [incomeData, setIncomeData] = useState(Array(10).fill({ amount: 0, shown: false }));

  const [nationalBalance, setNationalBalance] = useState(0);
  const [distributionCount, setDistributionCount] = useState(0);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const ethProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await ethProvider.getSigner();
        const address = await signer.getAddress();
        const contractInstance = new ethers.Contract(contractAddress, abi, signer);

        setProvider(ethProvider);
        setSigner(signer);
        setContract(contractInstance);
        setConnectedWallet(address);
        setShowMainScreen(true);
      } catch (err) {
        console.error("Wallet Connection Error:", err);
        alert("❌ Failed to connect wallet.");
      }
    } else {
      alert("❌ MetaMask not detected.");
    }
  };

  const handleDistribute = async () => {
  if (!contract) return;
  try {
    const tx = await contract.distribute();
    await tx.wait();

    setUserCashBalances(prev => prev.map(cash => cash + 300));  // ✅ 이걸 먼저!
    setCompanyCashBalances(prev => prev.map(cash => cash + 300));  // ✅ 그리고
    await fetchBalances();  // ✅ 마지막에 호출해야 함

    setDistributionCount(prev => prev + 1);
    setAlerts(prev => [...prev, { type: "success", message: "✅ Distribution success" }]);
  } catch (err) {
    console.error("Distribute Error:", err);
    setAlerts(prev => [...prev, { type: "error", message: "❌ Distribution failed" }]);
  }
};

  const handleCollect = async () => {
    if (!contract) return;
    try {
      const tx = await contract.collect();
      await tx.wait();
      await fetchBalances();
      setAlerts(prev => [...prev, { type: "success", message: "✅ Collection success" }]);
    } catch (err) {
      console.error("Collect Error:", err);
      setAlerts(prev => [...prev, { type: "error", message: "❌ Collection failed" }]);
    }
  };

  const handleReset = async () => {
    if (!contract) return;
    try {
      const tx = await contract.resetAll();
      await tx.wait();
      await fetchBalances();
      setAlerts(prev => [...prev, { type: "success", message: "✅ Reset success" }]);
      setUserCashBalances([100000, 50000, 50000, 10000, 5000, 20000, 8000, 9000, 500, 300]);
      setCompanyCashBalances([500000, 300000, 100000, 50000, 10000]);
      setDistributionCount(0);
    } catch (err) {
      console.error("Reset Error:", err);
      setAlerts(prev => [...prev, { type: "error", message: "❌ Reset failed" }]);
    }
  };

  const fetchBalances = async () => {
    if (!contract) return;
    try {
      const result = await contract.checkAllBalances();
      setNationalBalance(Number(result[0]));
      setUserBalances(result[1].map(bn => Number(bn)));
      setCompanyBalances(result[2].map(bn => Number(bn)));
      setAlerts(prev => [...prev, { type: "success", message: "✅ Balances fetched" }]);
    } catch (err) {
      console.error("Fetch Balances Error:", err);
      setAlerts(prev => [...prev, { type: "error", message: "❌ Failed to fetch balances" }]);
    }
  };

  return (
    <>
      {showMainScreen ? (
        <MainScreen
          connectedWallet={connectedWallet}
          contract={contract}
          alerts={alerts}
          setAlerts={setAlerts}
          userBalances={userBalances}
          userCashBalances={userCashBalances}
          companyBalances={companyBalances}
          companyCashBalances={companyCashBalances}
          incomeData={incomeData}
          nationalBalance={nationalBalance}
          onDistribute={handleDistribute}
          onCollect={handleCollect}
          onReset={handleReset}
          onFetchBalances={fetchBalances}
          distributionCount={distributionCount}
          setUserCashBalances={setUserCashBalances}
          setCompanyCashBalances={setCompanyCashBalances}
        />
      ) : (
        <WelcomeScreen onConnect={connectWallet} />
      )}
    </>
  );
}

export default App;
