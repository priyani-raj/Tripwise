import { useState } from "react";
import TripInput from "./components/TripInput";
import PreferenceSelector from "./components/PreferenceSelector";
import TravelOptions from "./components/TravelOptions";
import HotelRecommendations from "./components/HotelRecommendations";
import Itinerary from "./components/Itinerary";
import Budget from "./components/Budget";
import { getDistance } from "./utils/getDistance";
import FoodRecommendations from "./components/FoodRecommendations";

function App() {
  const [tripData, setTripData] = useState(null);
  const [preference, setPreference] = useState("");
  const [travelMode, setTravelMode] = useState(null); // STRING
  const [distanceInfo, setDistanceInfo] = useState(null);

  return (
    <div>
      <h1>TripWise</h1>

      {!tripData && (
        <TripInput
          onSubmit={async (data) => {
            try {
              setTripData(data);
              const result = await getDistance(data.source, data.destination);
              setDistanceInfo(result);
            } catch (err) {
              alert(err.message);
            }
          }}
        />
      )}

      {tripData && !preference && (
        <PreferenceSelector onSelect={setPreference} />
      )}

      {tripData && preference && !travelMode && (
        <TravelOptions onSelect={setTravelMode} />
      )}

      {tripData && preference && travelMode && (
        <div>
          <h3>Trip Summary</h3>

          <p>{tripData.source} → {tripData.destination}</p>
          <p>Days: {tripData.days}</p>
          <p>Preference: {preference}</p>
          <p>Travel Mode: {travelMode}</p>

          {distanceInfo && (
            <p>
              Distance: {distanceInfo.distanceKm} km | Approx Time:{" "}
              {distanceInfo.durationMin} mins
            </p>
          )}

          <FoodRecommendations
            city={tripData.destination}
            preference={preference}
          />

          <HotelRecommendations
            city={tripData.destination}
            preference={preference}
          />

          <Itinerary
            days={Number(tripData.days)}
            preference={preference}
          />

          <Budget
            distanceKm={Number(distanceInfo?.distanceKm)}
            days={Number(tripData.days)}
            travelMode={travelMode}
            preference={preference}
          />
        </div>
      )}
    </div>
  );
}

export default App;
