import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeData(users, transactions) {
  try {
    const userSummary = users
      .map((u) => `${u.label} (${u.address.slice(0, 6)}...): ${u.balance} units`)
      .join("\n");

    const txSummary = transactions
      .map((t) => `From ${t.from.slice(0, 6)} to ${t.to.slice(0, 6)}: ${t.amount} units`)
      .join("\n");

    const prompt = `
You are an AI economic analyst in a blockchain simulation.

Please note:
- Each user has an initial balance.
- The current balances are **after** some transactions.
- Do NOT assume current balance minus sent amount must be negative. Users are not allowed to have negative balances.
- Just observe patterns, frequent senders or receivers, zero-value transactions, and signs of inequality or special behavior.

Analyze the following data and return key insights in bullet points.

Wallets:
${userSummary}

Transactions:
${txSummary}
`;

    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return chat.choices[0].message.content;
  } catch (err) {
    console.error("AI error:", err.message);
    return "AI analysis failed.";
  }
}
