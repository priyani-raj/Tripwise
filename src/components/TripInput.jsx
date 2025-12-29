import { useState } from "react";

function TripInput({ onSubmit }) {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");

  function handleSubmit() {
    onSubmit({
      source,
      destination,
      days,
    });
  }

  return (
    <div className="space-y-4">
      <h2 className="text-center text-2xl font-semibold text-slate-800">
        Trip Details
      </h2>

      <input
        className="w-full px-4 py-3 rounded-xl border border-blue-300
                   focus:outline-none focus:ring-2 focus:ring-blue-400
                   placeholder-slate-400"
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <input
        className="w-full px-4 py-3 rounded-xl border border-blue-300
                   focus:outline-none focus:ring-2 focus:ring-blue-400
                   placeholder-slate-400"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <input
        className="w-full px-4 py-3 rounded-xl border border-blue-300
                   focus:outline-none focus:ring-2 focus:ring-blue-400
                   placeholder-slate-400"
        placeholder="Number of days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white font-semibold
                   py-3 rounded-xl
                   shadow-md shadow-blue-300/40
                   hover:bg-blue-700 hover:shadow-lg
                   active:scale-95 transition duration-200"
      >
        Continue
      </button>
    </div>
  );
}

export default TripInput;
