import { timeSlots } from "../data/timeSlots";

export function generatePlanner(days, preference, activities) {
  const plans = [];

  for (let day = 0; day < days; day++) {
    const dayPlan = timeSlots.map((slot, index) => {
      const options = activities[preference]?.[slot.key] || [];
      const activity =
        options.length > 0
          ? options[(day + index) % options.length]
          : "Free time";

      return {
        time: slot.label,
        activity,
      };
    });

    plans.push(dayPlan);
  }

  return plans;
}
