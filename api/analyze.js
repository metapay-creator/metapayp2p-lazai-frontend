export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { users, transactions } = req.body;

  if (!users || !transactions) {
    return res.status(400).json({ error: "Missing data" });
  }

  // OpenAI 요청
  const OpenAI = require("openai");
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const userSummary = users
    .map((u) => `${u.label} (${u.address.slice(0, 6)}...): ${u.balance} units`)
    .join("\n");

  const txSummary = transactions
    .map((t) => `From ${t.from.slice(0, 6)} to ${t.to.slice(0, 6)}: ${t.amount} units`)
    .join("\n");

  const prompt = `You are an AI economic analyst in a blockchain simulation.\nAnalyze the following data and return key insights in bullet points.\n\nWallets:\n${userSummary}\n\nTransactions:\n${txSummary}`;

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const aiResult = chat.choices[0]?.message?.content || "No result";
    res.json({ result: aiResult });
  } catch (err) {
    res.status(500).json({ error: "OpenAI API error", details: err.message });
  }
}
