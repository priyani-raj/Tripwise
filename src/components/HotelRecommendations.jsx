import { useEffect, useState } from "react";
import fallbackHotels from "../data/fallbackHotels";

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

  // 🔹 Fallback hotels
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

    const lines = data.recommendations
  ?.split("\n")
  .map(l => l.trim())
  .filter(Boolean);

const groupedHotels = [];
let current = {};

lines.forEach(line => {
  if (line.startsWith("NAME:")) {
    // push previous hotel
    if (current.name) groupedHotels.push(current);
    current = { name: line.replace("NAME:", "").trim() };
    return;
  }

  if (line.startsWith("AREA:")) {
    current.area = line.replace("AREA:", "").trim();
    return;
  }

  if (line.startsWith("PRICE:") || line.toLowerCase().includes("price")) {
    current.price = line.replace(/^PRICE:\s*/i, "").trim();
    return;
  }

  if (line.startsWith("MAP:")) {
    current.map = line.replace("MAP:", "").trim();
    return;
  }
});

// push last hotel
if (current.name) groupedHotels.push(current);

setHotels(groupedHotels);



// 🔹 FALLBACK: if labels not found, use simple pairing
if (groupedHotels.length === 0) {
  for (let i = 0; i < lines.length; i += 2) {
    groupedHotels.push({
      name: lines[i],
      area: lines[i + 1] || "",
    });
  }
}

setHotels(groupedHotels);

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
                <span className="font-medium text-slate-800">
                  🛏️ {hotel}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 🔹 AI Hotels */}
      {hotels.length > 0 && (
        <ul className="space-y-3">
          {hotels.map((hotel, index) => {
            // ✅ Always generate correct Maps link
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${hotel.name} ${city}`
            )}`;

            return (
              <li
                key={index}
                className="bg-white/90 backdrop-blur
                           border border-indigo-200/60
                           rounded-xl p-5
                           shadow-md shadow-indigo-200/30
                           text-slate-800"
              >
                <h3 className="font-semibold text-slate-900 text-lg">
                  🏨 {hotel.name}
                </h3>

                {hotel.area && (
                  <p className="text-slate-600 mt-1">
                    {hotel.area}
                  </p>
                )}

                {hotel.price && (
                  <span className="inline-block mt-2 text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {hotel.price}
                  </span>
                )}

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3
                             px-4 py-2
                             rounded-lg
                             bg-indigo-50 text-indigo-700
                             font-medium text-sm
                             hover:bg-indigo-100
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

export default HotelRecommendations;
