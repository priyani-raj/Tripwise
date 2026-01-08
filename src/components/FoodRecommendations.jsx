import { useEffect, useState } from "react";
import fallbackFood from "../data/fallbackFood";
import { renderBoldText } from "../utils/renderBoldText";


function FoodRecommendations({ preference, city }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const normalizedPreference = preference?.trim().toLowerCase();
  const cleanCity = city?.trim().toLowerCase();

  const cityKeyMap = {
    varanasi: "Banaras",
    kashi: "Banaras",
    banaras: "Banaras",
    meerut: "Meerut",
    rishikesh: "Rishikesh",
    haridwar: "Haridwar",
  };

  const normalizedCity =
    cityKeyMap[cleanCity] ||
    (cleanCity
      ? cleanCity.charAt(0).toUpperCase() + cleanCity.slice(1)
      : "");

  const fallback =
    fallbackFood[normalizedCity] || fallbackFood.Generic || [];

  useEffect(() => {
    if (!city) return;

    async function fetchFood() {
      setLoading(true);
      try {
       const response = await fetch(
  `${API_URL}/api/recommendations`,

          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              city,
              preference,
              type: "food",
            }),
          }
        );

        const data = await response.json();

        // ✅ Parse Gemini text → list
    const lines = data.recommendations
  ?.split("\n")
  .map(line =>
    line
      .replace(/^\d+\.\s*/, "")
      .replace(/^[-•*]+\s*/, "")
      .replace(/\*\*/g, "")
      .trim()
  )
  .filter(Boolean);

const groupedFoods = [];

for (let i = 0; i < lines.length; i += 4) {
  if (lines[i + 1] && lines[i + 2] && lines[i + 3]) {
    groupedFoods.push({
      name: lines[i],
      description: lines[i + 1],
      price: lines[i + 2 ],
      map: lines[i + 3],
    });
  }
}

setPlaces(groupedFoods);
      } catch {
        setPlaces([]);
      }
      setLoading(false);
    }

    fetchFood();
  }, [city, preference]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
        🍜 Food Recommendations
      </h2>

      {loading && (
        <p className="text-slate-600">
          Loading food suggestions...
        </p>
      )}

      {!loading && places.length === 0 && (
        <div className="space-y-2">
          <p className="text-slate-600">
            Showing popular local food instead.
          </p>

          <ul className="space-y-2">
            {fallback.map((item, index) => (
              <li
                key={index}
                className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-slate-800"
              >
                <span className="font-medium text-slate-800">
               🍽️ {item}
              </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {places.length > 0 && (
        <ul className="space-y-3">
      {places.map((food, index) => {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${food.name} ${city}`
  )}`;

  return (
    <li
      key={index}
      className="bg-white/90 backdrop-blur
                 border border-blue-200/60
                 rounded-xl p-4
                 shadow-md shadow-blue-200/30
                 text-slate-800"
    >
      <h3 className="font-semibold text-slate-900">
        🍽️ {food.name}
      </h3>

      <p className="text-slate-600 mt-1">
        {food.description}
      </p>

      <span className="inline-block mt-2 text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
        {food.price}
      </span>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-3
                   px-4 py-2
                   rounded-lg
                   bg-blue-50 text-blue-700
                   font-medium text-sm
                   hover:bg-blue-100
                   transition"
      >
        📍 Open in Google Maps
      </a>
    </li>
  );
})}


        </ul>
      )}
    </div>
  );
}

export default FoodRecommendations;
