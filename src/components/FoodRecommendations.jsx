import { useEffect, useState } from "react";
import { getFoodPlaces } from "../utils/getFoodPlaces";
import fallbackFood from "../data/fallbackFood";

function FoodRecommendations({ preference, city }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  // Normalize preference
  const normalizedPreference = preference?.trim().toLowerCase();

  // Clean city input
  const cleanCity = city?.trim().toLowerCase();

  // City aliases
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

  const fallback = fallbackFood[normalizedCity] || [];

  useEffect(() => {
    if (normalizedPreference !== "foodie" || !city) return;

    async function fetchFood() {
      setLoading(true);
      try {
        const data = await getFoodPlaces(city);
        setPlaces(Array.isArray(data) ? data : []);
      } catch {
        setPlaces([]);
      }
      setLoading(false);
    }

    fetchFood();
  }, [normalizedPreference, city]);


  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
        🍜 Food Recommendations
        {normalizedPreference === "foodie" && " (Top Picks for You)"}
      </h2>

      {loading && (
        <p className="text-slate-600">Loading food suggestions...</p>
      )}

      {/* Fallback data */}
      {!loading && places.length === 0 && (
        <div className="space-y-2">
          <p className="text-slate-600">
            No online food data available.
          </p>

          <p className="font-medium text-slate-700">
            Popular local food in {normalizedCity}:
          </p>

          {fallback.length === 0 ? (
            <p className="text-red-500 text-sm">
              ❌ No fallback data found (check city key)
            </p>
          ) : (
            <ul className="list-disc list-inside space-y-1 text-slate-700">
              {fallback.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* API data */}
      {places.length > 0 && (
        <div className="space-y-3">
          {places.map((place) => (
            <div
              key={place.id}
              className="bg-white/90 backdrop-blur
                         border border-blue-200/60
                         rounded-xl p-4
                         shadow-md shadow-blue-200/30"
            >
              <h4 className="font-semibold text-slate-800">
                {place.name}
              </h4>
              <p className="text-sm text-slate-600">
                ⭐ {place.rating}
              </p>
              <p className="text-sm text-slate-600">
                {place.address}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FoodRecommendations;
