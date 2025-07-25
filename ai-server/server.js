import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { analyzeData } from "./analyze.js";

// ✅ 환경변수 로드
dotenv.config();

// ✅ API 키 콘솔 확인
console.log("✅ OPENAI KEY:", process.env.OPENAI_API_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ✅ 분석 API 엔드포인트
app.post("/api/analyze", async (req, res) => {
  const { users, transactions } = req.body;

  if (!users || !transactions) {
    return res.status(400).json({ error: "Missing users or transactions" });
  }

  // ✅ OpenAI GPT 분석
  const aiResult = await analyzeData(users, transactions);

  // ✅ 경고 조건 분석 (회사 송금 > inflow 50%)
  const alerts = [];
  alerts.push({ type: "success", message: "✅ Balances fetched" });

  const inflowMap = {};
  const sentMap = {};

  for (const tx of transactions) {
    const from = tx.from;
    const to = tx.to;
    const amount = Number(tx.amount);

    if (to.includes("Company")) {
      inflowMap[to] = (inflowMap[to] || 0) + amount;
    }

    if (from.includes("Company")) {
      sentMap[from] = (sentMap[from] || 0) + amount;
    }
  }

  for (const addr in sentMap) {
    const sent = sentMap[addr];
    const inflow = inflowMap[addr] || 0;
    if (inflow > 0 && sent > inflow * 0.5) {
      alerts.push({
        type: "warning",
        message: `⚠️ ${addr.slice(0, 6)}... sent over 50% of its inflow.`,
      });
    }
  }

  return res.json({ aiResult, alerts });
});

// ✅ 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
