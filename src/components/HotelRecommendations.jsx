import fallbackHotels from "../data/fallbackHotels";

function HotelRecommendations({ city, preference }) {
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

  const hotels = fallbackHotels[pref]?.[normalizedCity] || [];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-800 flex items-center gap-2">
        🏨 Hotel Recommendations
      </h2>

      {hotels.length === 0 ? (
        <p className="text-slate-600">
          No hotel data available for this preference.
        </p>
      ) : (
        <div className="space-y-3">
          {hotels.map((hotel, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur
                         border border-blue-200/60
                         rounded-xl p-4
                         shadow-md shadow-blue-200/30"
            >
              <p className="font-medium text-slate-800">
                {hotel}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HotelRecommendations;
