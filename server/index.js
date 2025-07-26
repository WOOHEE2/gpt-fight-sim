const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");

dotenv.config();
const app = express();
const PORT = 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post("/api/fight", async (req, res) => {
  const { ngannouAdj, ohtaniAdj } = req.body;

  const prompt = `
다음 두 캐릭터가 싸운다면 누가 이길지 한 명만 골라줘.
설명 없이 정확히 '은가누' 또는 '오타니'만 대답해줘.

1. 은가누: ${ngannouAdj}
2. 오타니: ${ohtaniAdj}
`;

  try {
    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const winner = chat.choices[0].message.content.trim();
    res.json({ winner });
  } catch (error) {
    console.error("GPT 오류:", error.message);
    res.status(500).json({ error: "AI 판단 실패" });
  }
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});
