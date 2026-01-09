import { useEffect, useState } from "react";
import fallbackPlaces from "../data/fallbackPlaces";
import { renderBoldText } from "../utils/renderBoldText";
const API_URL = import.meta.env.VITE_API_URL;

function MustVisitPlaces({ city,preference }) {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  if (!city) return null;

  // Normalize city
  const cleanCity = city.trim().toLowerCase();

  const cityKeyMap = {
    varanasi: "Banaras",
    kashi: "Banaras",
    banaras: "Banaras",
    meerut: "Meerut",
    mumbai: "Mumbai",
    jaipur: "Jaipur",
    delhi: "Delhi",
    lucknow: "Lucknow",
  };

  const normalizedCity =
    cityKeyMap[cleanCity] ||
    cleanCity.charAt(0).toUpperCase() + cleanCity.slice(1);

  const fallback = fallbackPlaces[normalizedCity] || [];

  useEffect(() => {
    async function fetchPlaces() {
      setLoading(true);
      try {
       const res = await fetch(
  `${API_URL}/api/recommendations`,
 {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            city,
            preference,
            type: "places",
          }),
        });

        const data = await res.json();

        if (data?.recommendations) {
        const lines = data.recommendations
  ?.split("\n")
  .map(line =>
    line
      .replace(/\*\*/g, "")
      .replace(/^[-•*]\s*/, "")
      .trim()
  )
  .filter(Boolean);

const groupedPlaces = [];

for (let i = 0; i < lines.length; i += 4) {
  groupedPlaces.push({
    name: lines[i],
    description: lines[i + 1] || "",
    bestTime: lines[i + 2] || "",
    map: lines[i + 3] || "",
  });
}

setPlaces(groupedPlaces);
        } else {
          setPlaces([]);
        }
      } catch {
        setPlaces([]);
      }
      setLoading(false);
    }

    fetchPlaces();
  }, [city]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800">
        📍 Must Visit Places
      </h2>

      {loading && (
        <p className="text-slate-600">
          Loading places...
        </p>
      )}

      {!loading && places.length === 0 && (
        <ul className="list-disc list-inside space-y-1 text-slate-700">
          {fallback.map((place, index) => (
            <li key={index}>{renderBoldText(place)}</li>
          ))}
        </ul>
      )}

      {places.length > 0 && (
  <ul className="space-y-4">
    {places.map((place, index) => {
      const mapsUrl =
        place.map ||
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${place.name} ${city}`
        )}`;

      return (
        <li
          key={index}
          className="bg-white/90 backdrop-blur
                     border border-emerald-200/60
                     rounded-xl p-5
                     shadow-md shadow-emerald-200/30"
        >
          {/* Place Name */}
          <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            📍 {place.name}
          </h3>

          {/* Description */}
          {place.description && (
            <p className="text-slate-600 mt-1 leading-relaxed">
              {place.description}
            </p>
          )}

          {/* Best time */}
          {place.bestTime && (
            <span className="inline-block mt-2 text-sm bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
              🕒 {place.bestTime}
            </span>
          )}

          {/* Map button */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-3
                       px-4 py-2 rounded-lg
                       bg-emerald-50 text-emerald-700
                       font-medium text-sm
                       hover:bg-emerald-100 transition"
          >
            🧭 Open in Google Maps
          </a>
        </li>
      );
    })}
  </ul>
)}

    </div>
  );
}

export default MustVisitPlaces;
