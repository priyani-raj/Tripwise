import { useEffect, useState } from "react";
import fallbackHotels from "../data/fallbackHotels";
import { renderBoldText } from "../utils/renderBoldText";
const API_URL = import.meta.env.VITE_API_URL;

function HotelRecommendations({ city, preference }) {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!city || !preference) return null;

  // Normalize preference
  const pref = preference.trim().toLowerCase();

  // Normalize city
  const cleanCity = city.trim().toLowerCase();

  const cityKeyMap = {
    varanasi: "Banaras",
    kashi: "Banaras",
    banaras: "Banaras",
    meerut: "Meerut",
    lucknow: "Lucknow",
    delhi: "Delhi",
    noida: "Noida",
    jaipur: "Jaipur",
    mumbai: "Mumbai",
    pune: "Pune",
    bangalore: "Bangalore",
    bengaluru: "Bangalore",
    chennai: "Chennai",
    hyderabad: "Hyderabad",
    kolkata: "Kolkata",
    rishikesh: "Rishikesh",
    haridwar: "Haridwar",
    dehradun: "Dehradun",
    udaipur: "Udaipur",
    amritsar: "Amritsar",
  };

  const normalizedCity =
    cityKeyMap[cleanCity] ||
    cleanCity.charAt(0).toUpperCase() + cleanCity.slice(1);

  // 🔹 Fallback hotels (safety net)
  const fallback =
    fallbackHotels[pref]?.[normalizedCity] ||
    fallbackHotels[pref]?.Generic ||
    [];

  // 🔹 AI hotel fetch
  useEffect(() => {
    async function fetchHotels() {
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
              type: "hotels",
            }),
          }
        );

        const data = await response.json();

        // Convert Gemini text → list
        const aiList = data.recommendations
  ?.split("\n")
  .map(line =>
    line
      .replace(/^\d+\.\s*/, "")     // remove numbering like "1."
      .replace(/^[-•*]+\s*/, "")    // remove bullets and multiple *
      .replace(/\*\*/g, "")         // remove markdown bold **
      .trim()
  )
  .filter(line => line.length > 0);

        setHotels(aiList || []);
      } catch {
        setHotels([]);
      }
      setLoading(false);
    }

    fetchHotels();
  }, [city, preference]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
        🏨 Hotel Recommendations
      </h2>

      {loading && (
        <p className="text-slate-600">
          Finding the best stays for you...
        </p>
      )}

      {/* 🔹 Fallback */}
      {!loading && hotels.length === 0 && (
        <div className="space-y-2">
          <p className="text-slate-600">
            Showing reliable hotel options instead.
          </p>

          <ul className="space-y-2">
            {fallback.map((hotel, index) => (
              <li
                key={index}
                className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-slate-800"
              >
                {index % 2 === 0 ? (
        <span className="font-semibold text-slate-900">
           🛏️{hotel}
        </span>
      ) : (
        <span className="text-slate-700">
          {item}
        </span>
      )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🔹 AI Hotels */}
      {hotels.length > 0 && (
        <ul className="space-y-3">
          {hotels.map((hotel, index) => (
            <li
              key={index}
              className="bg-white/90 backdrop-blur
                         border border-indigo-200/60
                         rounded-xl p-4
                         shadow-md shadow-indigo-200/30
                         text-slate-800"
            >
               <h3 className="font-semibold text-slate-900 text-lg">
        🛏️ {hotel.name}
      </h3>

      {hotel.description && (
        <p className="text-slate-700 mt-1">
          {hotel.description}
        </p>
      )}
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HotelRecommendations;
