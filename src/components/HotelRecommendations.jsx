import fallbackHotels from "../data/fallbackHotels";

function HotelRecommendations({ city, preference }) {
  if (!city || !preference) return null;

  // ✅ Normalize preference
  const pref = preference.trim().toLowerCase();

  // ✅ Normalize city
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

  // ✅ Fetch hotels safely
  const hotels = fallbackHotels[pref]?.[normalizedCity] || [];

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>🏨 Hotel Recommendations</h2>

      {hotels.length === 0 ? (
        <p>No hotel data available for this preference.</p>
      ) : (
        <ul>
          {hotels.map((hotel, index) => (
            <li key={index}>{hotel}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HotelRecommendations;
