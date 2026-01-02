import { useEffect, useState } from "react";
import { itineraryActivities } from "../data/itineraryActivities";
import { generatePlanner } from "../utils/generatePlanner";
import jsPDF from "jspdf";

function Itinerary({ days, preference }) {
  const [planner, setPlanner] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Generate itinerary
  function generateItinerary() {
    const generated = generatePlanner(
      days,
      preference,
      itineraryActivities
    );
    setPlanner(generated);
  }

  useEffect(() => {
    generateItinerary();
  }, [days, preference]);

  // Edit handler
  function handleEdit(dayIndex, slotIndex, newValue) {
    setPlanner((prev) =>
      prev.map((day, dIdx) =>
        dIdx === dayIndex
          ? day.map((slot, sIdx) =>
              sIdx === slotIndex
                ? { ...slot, activity: newValue }
                : slot
            )
          : day
      )
    );
  }

  // Reset itinerary
  function handleReset() {
    generateItinerary();
    setIsEditing(false);
  }

  // Export as PDF
  function exportPDF() {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text("TripWise - Day-wise Itinerary", 10, y);
    y += 10;

    planner.forEach((day, dayIndex) => {
      doc.setFontSize(14);
      doc.text(`Day ${dayIndex + 1}`, 10, y);
      y += 8;

      doc.setFontSize(11);
      day.forEach((slot) => {
        doc.text(
          `${slot.time}: ${slot.activity}`,
          12,
          y
        );
        y += 6;
      });

      y += 4;
    });

    doc.save("tripwise-itinerary.pdf");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 justify-between items-center">
        <h2 className="text-2xl font-semibold">
          🗓️ Day-wise Planner
        </h2>

        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            {isEditing ? "Save" : "Edit"}
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
          >
            Reset
          </button>

          <button
            onClick={exportPDF}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Export PDF
          </button>
        </div>
      </div>

      {planner.map((dayPlan, dayIndex) => (
        <div
          key={dayIndex}
          className="bg-white/90 backdrop-blur border border-blue-200/60 rounded-xl p-4 shadow-md"
        >
          <h3 className="font-semibold mb-3">
            Day {dayIndex + 1}
          </h3>

          {dayPlan.map((slot, slotIndex) => (
            <div
              key={slotIndex}
              className="flex items-center gap-4 mb-2"
            >
              <span className="w-28 font-medium">
                {slot.time}
              </span>

              {isEditing ? (
                <input
                  value={slot.activity}
                  onChange={(e) =>
                    handleEdit(
                      dayIndex,
                      slotIndex,
                      e.target.value
                    )
                  }
                  className="border rounded-md px-2 py-1 w-full"
                />
              ) : (
                <span>{slot.activity}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Itinerary;
