import { useState } from "react";
import TripInput from "./components/TripInput";
import PreferenceSelector from "./components/PreferenceSelector";
import TravelOptions from "./components/TravelOptions";
import HotelRecommendations from "./components/HotelRecommendations";
import Itinerary from "./components/Itinerary";
import Budget from "./components/Budget";
import { getDistance } from "./utils/getDistance";
import FoodRecommendations from "./components/FoodRecommendations";
import MustVisitPlaces from "./components/MustVisitPlaces";
function App() {
  const [tripData, setTripData] = useState(null);
  const [preference, setPreference] = useState("");
  const [travelMode, setTravelMode] = useState(null);
  const [distanceInfo, setDistanceInfo] = useState(null);

  const [openSections, setOpenSections] = useState({
    summary: true,
    food: false,
    hotels: false,
    places:false,
    itinerary: false,
    budget: false,
  });

  function toggleSection(section) {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-indigo-300 to-blue-400 px-6 pt-6">
      {/* TITLE */}
      <h1 className="text-center text-4xl md:text-5xl font-extrabold text-blue-900 mb-8">
        TripWise ✈️
      </h1>

      {/* TRIP INPUT */}
      {!tripData && (
        <div className="max-w-xl mx-auto bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 md:p-8 border border-indigo-300/60">
          <TripInput
            onSubmit={async (data) => {
              try {
                setTripData(data);
                const result = await getDistance(
                  data.source,
                  data.destination
                );
                setDistanceInfo(result);
              } catch (err) {
                alert(err.message);
              }
            }}
          />
        </div>
      )}

      {/* PREFERENCE */}
      {tripData && !preference && (
        <div className="max-w-xl mx-auto bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 md:p-8 border border-indigo-300/60">
          <PreferenceSelector onSelect={setPreference} />
        </div>
      )}

      {/* TRAVEL MODE */}
      {tripData && preference && !travelMode && (
        <div className="max-w-xl mx-auto bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 md:p-8 border border-indigo-300/60">
          <TravelOptions onSelect={setTravelMode} />
        </div>
      )}

      {/* DASHBOARD WITH DROPDOWNS */}
      {tripData && preference && travelMode && (
        <div className="max-w-4xl mx-auto space-y-4">
          {/* SUMMARY */}
          <button
            onClick={() => toggleSection("summary")}
            className="w-full flex justify-between items-center bg-blue-100 text-blue-900 px-5 py-4 rounded-xl font-semibold hover:bg-blue-200 transition"
          >
            <span>📋 Trip Summary</span>
            <span>{openSections.summary ? "−" : "+"}</span>
          </button>

          {openSections.summary && (
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-indigo-300/60">
              <p className="font-semibold">
                {tripData.source} → {tripData.destination}
              </p>
              <p>Days: {tripData.days}</p>
              <p>Preference: {preference}</p>
              <p>Travel Mode: {travelMode}</p>

              {distanceInfo && (
                <p>
                  Distance: {distanceInfo.distanceKm} km | Time:{" "}
                  {distanceInfo.durationMin} mins
                </p>
              )}
            </div>
          )}

          {/* FOOD */}
          <button
            onClick={() => toggleSection("food")}
            className="w-full flex justify-between items-center bg-blue-100 text-blue-900 px-5 py-4 rounded-xl font-semibold hover:bg-blue-200 transition"
          >
            <span>🍜 Food Recommendations</span>
            <span>{openSections.food ? "−" : "+"}</span>
          </button>

          {openSections.food && (
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-indigo-300/60">
              <FoodRecommendations
                city={tripData.destination}
                preference={preference}
              />
            </div>
          )}

          {/* HOTELS */}
          <button
            onClick={() => toggleSection("hotels")}
            className="w-full flex justify-between items-center bg-blue-100 text-blue-900 px-5 py-4 rounded-xl font-semibold hover:bg-blue-200 transition"
          >
            <span>🏨 Hotel Recommendations</span>
            <span>{openSections.hotels ? "−" : "+"}</span>
          </button>

          {openSections.hotels && (
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-indigo-300/60">
              <HotelRecommendations
                city={tripData.destination}
                preference={preference}
              />
            </div>
          )}
          {/* 📍 MUST VISIT PLACES */}
          <div className="mb-4">
         <button
            onClick={() => toggleSection("places")}
            className="w-full flex justify-between items-center
            bg-blue-100 text-blue-900
            px-5 py-4 rounded-xl font-semibold
            hover:bg-blue-200 transition"
         >
          📍 Must Visit Places
         <span>{openSections.places ? "−" : "+"}</span>
          </button>

         {openSections.places && (
         <div className="mt-4 bg-white/90 backdrop-blur rounded-xl p-4 border border-blue-200/60">
          <MustVisitPlaces city={tripData.destination} />
            </div>
          )}
         </div>

          {/* ITINERARY */}
          <button
            onClick={() => toggleSection("itinerary")}
            className="w-full flex justify-between items-center bg-blue-100 text-blue-900 px-5 py-4 rounded-xl font-semibold hover:bg-blue-200 transition"
          >
            <span>🗓️ Itinerary</span>
            <span>{openSections.itinerary ? "−" : "+"}</span>
          </button>

          {openSections.itinerary && (
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-indigo-300/60">
              <Itinerary
                days={Number(tripData.days)}
                preference={preference}
              />
            </div>
          )}

          {/* BUDGET */}
          <button
            onClick={() => toggleSection("budget")}
            className="w-full flex justify-between items-center bg-blue-100 text-blue-900 px-5 py-4 rounded-xl font-semibold hover:bg-blue-200 transition"
          >
            <span>💰 Budget</span>
            <span>{openSections.budget ? "−" : "+"}</span>
          </button>

          {openSections.budget && (
            <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 border border-indigo-300/60">
              <Budget
                distanceKm={Number(distanceInfo?.distanceKm)}
                days={Number(tripData.days)}
                travelMode={travelMode}
                preference={preference}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
