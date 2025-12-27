import {
  calculateTravelCost,
  calculateFoodCost,
  calculateHotelCost,
} from "../utils/costCalculator";

function Budget({ distanceKm, days, travelMode, preference }) {
  if (!distanceKm || !travelMode) return null;

  const travelCost = calculateTravelCost(distanceKm, travelMode);
  const foodCost = calculateFoodCost(days, preference);
  const hotelCost = calculateHotelCost(days, "standard");

  const total = travelCost + foodCost + hotelCost;

  return (
    <div>
      <h2>💰 Estimated Budget</h2>

      <p>🚍 Travel ({travelMode}): ₹{travelCost}</p>
      <p>🍽️ Food ({days} days): ₹{foodCost}</p>
      <p>🏨 Hotel ({days} nights): ₹{hotelCost}</p>

      <h3>Total Estimated Cost: ₹{total}</h3>
    </div>
  );
}

export default Budget;
