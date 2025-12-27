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
    <div>
      <h2>Trip Details</h2>

      <input
        placeholder="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <br />

      <input
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />

      <br />

      <input
        placeholder="Number of days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
      />

      <br />

      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
}

export default TripInput;
