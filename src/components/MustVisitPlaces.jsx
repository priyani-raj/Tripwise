import { useEffect, useState } from "react";
import fallbackPlaces from "../data/fallbackPlaces";
import { renderBoldText } from "../utils/renderBoldText";

function MustVisitPlaces({ city }) {
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
        const res = await fetch("http://localhost:5000/api/recommendations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            city,
            type: "places",
          }),
        });

        const data = await res.json();

        if (data?.recommendations) {
          const list = data.recommendations
            .split("\n")
            .map((line) =>
              line.replace(/^[-•*]\s*/, "").trim()
            )
            .filter(Boolean);

          setPlaces(list);
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
        <ul className="list-disc list-inside space-y-1 text-slate-700">
          {places.map((place, index) => (
            <li key={index}>{place}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MustVisitPlaces;
