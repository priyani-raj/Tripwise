export async function getFoodPlaces(lat, lon) {
  const apiKey = import.meta.env.VITE_ORS_API_KEY;

  const res = await fetch("https://api.openrouteservice.org/pois", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify({
      request: "pois",
      geometry: {
        buffer: 2000,
        geojson: {
          type: "Point",
          coordinates: [lon, lat],
        },
      },
      filters: {
        category_group_ids: [130], // 🍽️ food & drink
      },
      limit: 5,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("ORS POI error:", text);
    throw new Error("Failed to fetch food places");
  }

  const data = await res.json();

  if (!data.features) return [];

  return data.features.map((poi) => ({
    id: poi.properties.osm_id,
    name: poi.properties.name || "Restaurant",
    category: poi.properties.category || "Food",
  }));
}
