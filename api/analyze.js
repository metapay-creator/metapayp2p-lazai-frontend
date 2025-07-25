import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { users, transactions } = req.body;

  if (!users || !transactions) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    const userSummary = users.map(u => `${u.label}: ${u.balance}`).join("\n");
    const txSummary = transactions.map(t => `From ${t.from} to ${t.to}: ${t.amount}`).join("\n");

    const prompt = `Analyze the following blockchain activity and provide insights:\n\nWallets:\n${userSummary}\n\nTransactions:\n${txSummary}`;

    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const result = chat.choices[0].message.content;
    res.status(200).json({ result });
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "AI analysis failed" });
  }
}
