export async function getDistance(source, destination) {
  const apiKey = import.meta.env.VITE_ORS_API_KEY;

  // Geocode source
  const res1 = await fetch(
    `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${source}`
  );
  const data1 = await res1.json();

  if (!data1.features || data1.features.length === 0) {
    throw new Error("Source location not found");
  }

  const sourceCoords = data1.features[0].geometry.coordinates;

  // Geocode destination
  const res2 = await fetch(
    `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${destination}`
  );
  const data2 = await res2.json();

  if (!data2.features || data2.features.length === 0) {
    throw new Error("Destination location not found");
  }

  const destCoords = data2.features[0].geometry.coordinates;

  // Get distance
 const distRes = await fetch(
  "https://api.openrouteservice.org/v2/directions/driving-car/geojson",

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify({
        coordinates: [sourceCoords, destCoords],
      }),
    }
  );

  const distData = await distRes.json();

  const summary = distData.features?.[0]?.properties?.summary;

  if (!summary) {
    throw new Error("Route data not available");
  }

return {
  distanceKm: (summary.distance / 1000).toFixed(2),
  durationMin: (summary.duration / 60).toFixed(0),
  sourceCoords: {
    lat: sourceCoords[1],
    lon: sourceCoords[0],
  },
  destinationCoords: {
    lat: destCoords[1],
    lon: destCoords[0],
  },
};


}
