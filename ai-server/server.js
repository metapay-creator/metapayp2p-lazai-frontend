
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// ✅ .env 환경변수 로드
dotenv.config();

// ✅ 앱 설정
const app = express();
const PORT = process.env.PORT || 3001;

// ✅ OpenAI 키 확인 로그
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY not found in .env file");
  process.exit(1);
} else {
  console.log("🔑 OPENAI_API_KEY loaded: ✅ OK");
}

// ✅ OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ 미들웨어 설정
app.use(cors());
app.use(express.json());

// ✅ 분석 API
app.post("/api/analyze", async (req, res) => {
  const { users, transactions } = req.body;

  if (!users || !transactions) {
    return res.status(400).json({ error: "Missing users or transactions data" });
  }

  const prompt = `
You are an AI assistant analyzing a blockchain-based basic income system.

Users:
${users.map((u) => `${u.label} (${u.address}): balance ${u.balance}`).join('\n')}

Transactions:
${transactions.map((t) => `From ${t.from} to ${t.to}: ${t.amount}`).join('\n')}

Please summarize the economic activity of each user in concise bullet points.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const result = completion.choices[0].message.content;
    res.json({ result });
  } catch (error) {
    console.error("❌ AI analysis error:", error);
    res.status(500).json({ error: "AI analysis failed" });
  }
});

// ✅ 요약용 분석 API
app.post("/api/analyze-summary", async (req, res) => {
  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{
        role: "user",
        content: `
You are an AI assistant analyzing P2P financial transactions among 10 users in a digital basic income simulation.

Please summarize the following behavior pattern:
- hoarding
- inactivity
- overuse of one-way transfers
- salary-like transactions
- any outliers

Use concise, human-readable points (max 5 lines).
Return in Markdown list format.
`
      }],
      model: "gpt-3.5-turbo",
    });

    const result = chatCompletion.choices[0].message.content;
    res.json({ summary: result });
  } catch (error) {
    console.error("Summary API error:", error);
    res.status(500).json({ summary: "❌ Error generating summary." });
  }
});

// ✅ 서버 시작
app.listen(PORT, () => {
  console.log(`✅ AI server running at http://localhost:${PORT}`);
});
