import { itineraryActivities } from "../data/itineraryActivities";
import { generatePlanner } from "../utils/generatePlanner";

function Itinerary({ days, preference }) {
  const planner = generatePlanner(
    days,
    preference,
    itineraryActivities
  );

  return (
    <div>
      <h2>🗓️ Day-wise Planner</h2>

      {planner.map((dayPlan, dayIndex) => (
        <div key={dayIndex} style={{ marginBottom: "20px" }}>
          <h3>Day {dayIndex + 1}</h3>

          <table>
            <tbody>
              {dayPlan.map((slot, index) => (
                <tr key={index}>
                  <td style={{ paddingRight: "15px", fontWeight: "bold" }}>
                    {slot.time}
                  </td>
                  <td>{slot.activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Itinerary;
