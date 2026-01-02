export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { city, preference } = req.body;

  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  const prompt = `
You are a travel food expert.
Recommend 5 popular food experiences in ${city}.
The traveler preference is ${preference || "general"}.
Include street food and local specialties.
Return results as bullet points.
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    res.status(200).json({ result: text });
  } catch (err) {
    res.status(500).json({ error: "Gemini request failed" });
  }
}
