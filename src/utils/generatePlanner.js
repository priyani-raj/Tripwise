export function generatePlanner(days, preference, itineraryActivities) {
  const timeSlots = ["Morning", "Afternoon", "Evening", "Night"];
  const planner = [];

  const mixByPreference = {
    foodie: ["food", "food", "explore", "food"],
    explorer: ["explore", "explore", "food", "explore"],
    photographer: ["photography", "photography", "explore", "food"],
  };

  const activityMix =
    mixByPreference[preference] || ["explore", "food", "photography"];

  // ✅ Collect ALL available activities safely
  const allActivities = Object.values(itineraryActivities)
    .filter(Array.isArray)
    .flat();

  function getRandomActivity(category) {
    const list = itineraryActivities?.[category];

    // 🛑 HARD SAFETY CHECK
    if (!Array.isArray(list) || list.length === 0) {
      return allActivities.length > 0
        ? allActivities[Math.floor(Math.random() * allActivities.length)]
        : "Free time / Explore nearby";
    }

    return list[Math.floor(Math.random() * list.length)];
  }

  for (let day = 1; day <= days; day++) {
    const dayPlan = [];

    timeSlots.forEach((slot, index) => {
      const category = activityMix[index % activityMix.length];

      dayPlan.push({
        time: slot,
        activity: getRandomActivity(category),
        category,
      });
    });

    planner.push(dayPlan);
  }

  return planner;
}
