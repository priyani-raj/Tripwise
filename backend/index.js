import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));
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
app.use((req, res, next) => {
  console.log("🌐 Incoming request:", req.method, req.originalUrl);
  next();
});
app.post("/api/recommendations/", (req, res, next) => next());
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
    let prompt = "";

/* 🍜 FOOD PROMPT */
if (type === "food") {
  prompt = `
You are a local food guide.

Recommend exactly 5 food places in ${city}.
${preference ? `Preference: ${preference}` : ""}

STRICT FORMAT (repeat exactly 5 times):

NAME: <place name>
DESC: <1 line description>
PRICE: <₹ price range>
MAP: <google maps link>

RULES:
- Use all 4 labels exactly as written
- Each item must have all 4 fields
- Do NOT merge price into description
- Do NOT add extra text
- Do NOT reorder lines
- Output ONLY the list
`;
}


/* 🏨 HOTEL PROMPT */
else if (type === "hotels") {
  prompt = `
You are a hotel recommendation expert.

Recommend exactly 5 hotels in ${city}.
${preference ? `Preference: ${preference}` : ""}

STRICT FORMAT (repeat exactly 5 times):

NAME: <hotel name>
AREA: <area + 1 line description>
PRICE: <approx price per night in INR>
MAP: <google maps link>

RULES:
- Use all 4 labels exactly
- Do NOT merge price into description
- Do NOT add extra text
- Do NOT reorder lines
- Output ONLY the list
`;
}


/* 📍 MUST VISIT PLACES PROMPT */
else if (type === "places") {
  prompt = `
You are a travel guide.

Recommend exactly 5 must-visit places in ${city}.

STRICT FORMAT (no intro text, no numbering):

Place Name
Why it is famous (1 line)
Best time to visit
clickable Google Maps link 

RULES:
- Famous and real locations only
- No emojis
- No intro or closing text
- Output ONLY the list
-Bold the name of the place
`;
}

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
   res.status(200).json({
  recommendations: "• Popular attractions available locally.\n• Please try again shortly.",
});

  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
