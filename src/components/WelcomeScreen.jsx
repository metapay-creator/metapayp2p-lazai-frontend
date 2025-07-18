import React from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function WelcomeScreen({ onConnect }) {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleStart = () => {
    const audio = new Audio("/sound/welcome.mp3");
    audio.volume = 0.7;
    audio.play();
    onConnect();
  };

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      background: "linear-gradient(135deg, #0a2540, #122b47)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#ffffff", distance: 150 },
            move: { enable: true, speed: 0.5 },
            size: { value: { min: 1, max: 3 } },
            opacity: { value: 0.5 }
          }
        }}
        style={{
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: 0,
          width: "100%",
          height: "100%"
        }}
      />

      <motion.img
        src="/metapay_logo.png"
        alt="MetaPay Logo"
        style={{
          width: "80px",
          height: "80px",
          marginBottom: "20px",
          zIndex: 1,
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.5)"
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        whileHover={{ scale: 1.1 }}
      />

      <motion.h1
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          marginBottom: "20px",
          textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
          zIndex: 1
        }}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Time = <span style={{ color: "#fbbf24" }}>Money</span> = <span style={{ color: "#34d399" }}>Freedom</span>
      </motion.h1>

      <motion.p
        style={{
          maxWidth: "700px",
          fontSize: "1.2rem",
          marginBottom: "10px",
          lineHeight: "1.6",
          color: "#e0e7ff",
          textShadow: "1px 1px 8px rgba(0,0,0,0.7)",
          zIndex: 1
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        MetaPay envisions a future where basic income empowers citizens,  
        spending flows freely, and currency circulates within a sustainable Web3 economy.
      </motion.p>

      <motion.p
        style={{
          fontSize: "1rem",
          marginBottom: "30px",
          color: "#60a5fa",
          fontStyle: "italic",
          textShadow: "1px 1px 6px rgba(0,0,0,0.6)",
          zIndex: 1
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        Circulating Wealth. Empowering Freedom.
      </motion.p>

      <motion.button
        style={{
          background: "linear-gradient(90deg, #fbbf24, #facc15)",
          color: "#1f2937",
          fontWeight: "bold",
          padding: "12px 28px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 6px 15px rgba(0,0,0,0.6)",
          zIndex: 1
        }}
        onClick={handleStart}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        Connect MetaMask Wallet
      </motion.button>

      <motion.p
        style={{
          position: "absolute",
          bottom: "20px",
          fontSize: "0.9rem",
          color: "#cbd5e1",
          zIndex: 1,
          textShadow: "1px 1px 5px rgba(0,0,0,0.7)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        © 2025 MetaPay Simulation by Gyuha Yoon
      </motion.p>
    </div>
  );
}

export default WelcomeScreen;
