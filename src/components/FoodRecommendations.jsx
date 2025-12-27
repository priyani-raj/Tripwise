import { useEffect, useState } from "react";
import { getFoodPlaces } from "../utils/getFoodPlaces";
import fallbackFood from "../data/fallbackFood";



function FoodRecommendations({ preference, city }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Normalize preference safely
  const normalizedPreference = preference?.trim().toLowerCase();

  // ✅ CLEAN the city input FIRST (THIS WAS MISSING)
  const cleanCity = city?.trim().toLowerCase();

  // ✅ City aliases map
  const cityKeyMap = {
    varanasi: "Banaras",
    kashi: "Banaras",
    banaras: "Banaras",
    meerut: "Meerut",
    rishikesh: "Rishikesh",
    haridwar: "Haridwar",
  };

  // ✅ Final normalized city
  const normalizedCity =
    cityKeyMap[cleanCity] ||
    (cleanCity
      ? cleanCity.charAt(0).toUpperCase() + cleanCity.slice(1)
      : "");

  // ✅ Fallback food list (NOW IT MATCHES)
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

  // ❌ Not foodie → don’t render
  if (normalizedPreference !== "foodie") return null;
   console.log("FINAL FOOD DEBUG:", {
  city,
  cleanCity,
  normalizedCity,
  fallbackFoodObject: fallbackFood,
  fallbackArray: fallback,
});

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>🍜 Food Recommendations</h2>

      {loading && <p>Loading food suggestions...</p>}

      {/* ✅ Always show fallback if API empty */}
      {!loading && places.length === 0 && (
        <div>
          <p>No online food data available.</p>
          <p>
            <strong>Popular local food in {normalizedCity}:</strong>
          </p>

          {fallback.length === 0 ? (
            <p style={{ color: "red" }}>
              ❌ No fallback data found (check city key)
            </p>
          ) : (
            <ul>
              {fallback.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* ✅ API data */}
      {places.length > 0 &&
        places.map((place) => (
          <div
            key={place.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h4>{place.name}</h4>
            <p>⭐ {place.rating}</p>
            <p>{place.address}</p>
          </div>
        ))}
    </div>
  );
}

export default FoodRecommendations;
