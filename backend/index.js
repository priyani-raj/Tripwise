import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/recommendations", async (req, res) => {
  try {
    const { city, preference, type } = req.body;

    if (!city || !preference || !type) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // ✅ VALID TYPES ONLY
    const allowedTypes = {
      food: "food options",
      hotel: "hotels",
      places: "must visit places",
    };

    if (!allowedTypes[type]) {
      return res.status(400).json({ error: "Invalid type" });
    }

    const prompt = `
You are a travel assistant.

Recommend 5 ${allowedTypes[type]} for a traveler visiting ${city}.
Preference: ${preference}

Rules:
- Be realistic
- Avoid fake or luxury-only places
- Use bullet points
- Short descriptions
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);

    if (!result?.response) {
      throw new Error("Empty Gemini response");
    }

    const text = result.response.text();

    res.json({ recommendations: text });
  } catch (error) {
    console.error("🔥 Gemini error:", error.message);

    res.status(500).json({
      error: "AI generation failed",
      details: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
