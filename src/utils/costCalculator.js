// Travel cost based on distance and mode
export function calculateTravelCost(distanceKm, mode) {
  const rates = {
    bus: 1.2,
    train: 1.8,
    car: 6,
    flight: 8,
  };

  return Math.round(distanceKm * rates[mode]);
}

// Food cost based on preference
export function calculateFoodCost(days, preference) {
  const foodRates = {
    budget: 300,
    foodie: 800,
    premium: 1500,
  };

  return days * (foodRates[preference] || 500);
}

// Hotel cost per night
export function calculateHotelCost(days, hotelType) {
  const hotelRates = {
    budget: 800,
    standard: 1500,
    premium: 3000,
  };

  return days * (hotelRates[hotelType] || 1500);
}
