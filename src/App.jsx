import React, { useState, useEffect } from "react";
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
  const [transactions, setTransactions] = useState([]);
  const nationalWalletAddress = "0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B";
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

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        connectWallet();
      });
    }
  }, []);

  const handleDistribute = async () => {
    if (!contract) return false;
    try {
      const tx = await contract.distribute();
      await tx.wait();
      setUserCashBalances(prev => prev.map(cash => cash + 300));
      setCompanyCashBalances(prev => prev.map(cash => cash + 300));
      await fetchBalances();
      setDistributionCount(prev => prev + 1);
      setAlerts(prev => [...prev, { type: "success", message: "✅ Distribution success" }]);
      const timestamp = Date.now();
      const newTxs = [
        ...userAddresses.map(addr => ({
          from: nationalWalletAddress,
          to: addr,
          amount: 500,
          cashAmount: 500,
          timestamp
        })),
        ...companyAddresses.map(addr => ({
          from: nationalWalletAddress,
          to: addr,
          amount: 500,
          cashAmount: 500,
          timestamp
        }))
      ];
      setTransactions(prev => [...prev, ...newTxs]);
      return true;
    } catch (err) {
      console.error("Distribute Error:", err);
      setAlerts(prev => [...prev, { type: "error", message: "❌ Distribution failed" }]);
      return false;
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
      setTransactions([]);
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
          transactions={transactions}
          setTransactions={setTransactions}
        />
      ) : (
        <WelcomeScreen onConnect={connectWallet} />
      )}
    </>
  );
}

export default App;
