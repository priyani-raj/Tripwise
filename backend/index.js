import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TripWise backend running 🚀");
});

// ✅ Check Groq key
if (!process.env.GROQ_API_KEY) {
  console.error("❌ GROQ_API_KEY missing");
}

// ✅ Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

app.post("/api/recommendations", async (req, res) => {
  try {
    const { city, preference, type } = req.body;

    if (!city || !type) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // ✅ Allowed types
    const allowedTypes = {
      food: "food options",
      hotels: "hotels",
      places: "must visit places",
    };

    if (!allowedTypes[type]) {
      return res.status(400).json({ error: "Invalid type" });
    }

    // ✅ Prompt
    const prompt = `
You are a travel assistant.

Recommend 5 ${allowedTypes[type]} for a traveler visiting ${city}.
${preference ? `Preference: ${preference}` : ""}

Rules:
- Be realistic
- Avoid fake or luxury-only places
- Use bullet points
- Short descriptions
`;

    // ✅ Groq LLM call
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a helpful travel assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text = completion.choices[0].message.content;

    // ✅ Always return recommendations (safe for frontend)
    res.json({ recommendations: text || "" });
  } catch (error) {
    console.error("🔥 Groq error:", error.message);

    // ⚠️ Do NOT crash frontend
    res.status(200).json({ recommendations: "" });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
