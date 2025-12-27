function Itinerary({ days, preference }) {
  const itinerary = [];

  for (let d = 1; d <= days; d++) {
    if (preference === "foodie") {
      itinerary.push({
        day: d,
        plan: [
          "Breakfast at famous local spot 🍽️",
          "City sightseeing 🏛️",
          "Lunch at popular restaurant",
          "Street food walk in evening 🌮",
        ],
      });
    } else if (preference === "photographer") {
      itinerary.push({
        day: d,
        plan: [
          "Sunrise photography 📸",
          "Heritage walk",
          "Lunch break",
          "Golden hour photography 🌇",
        ],
      });
    }
  }

  return (
    <div>
      <h2>Day-wise Itinerary</h2>

      {itinerary.map((dayPlan) => (
        <div key={dayPlan.day}>
          <h3>Day {dayPlan.day}</h3>
          <ul>
            {dayPlan.plan.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Itinerary;
