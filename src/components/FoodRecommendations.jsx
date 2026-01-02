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
        const aiList = data.recommendations
          ?.split("\n")
          .map(line =>
            line.replace(/^[-•*]\s*/, "").trim()
          )
          .filter(line => line.length > 0);

        setPlaces(aiList || []);
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
                🍽️ {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {places.length > 0 && (
        <ul className="space-y-3">
          {places.map((item, index) => (
            <li
              key={index}
              className="bg-white/90 backdrop-blur
                         border border-blue-200/60
                         rounded-xl p-4
                         shadow-md shadow-blue-200/30
                         text-slate-800"
            >
              🍽️ {renderBoldText(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FoodRecommendations;
