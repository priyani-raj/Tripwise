function TravelOptions({ onSelect }) {
  return (
    <div>
      <h2>Select Travel Mode</h2>

      <button onClick={() => onSelect("bus")}>Bus</button>
      <button onClick={() => onSelect("train")}>Train</button>
      <button onClick={() => onSelect("car")}>Car</button>
      <button onClick={() => onSelect("flight")}>Flight</button>
    </div>
  );
}

export default TravelOptions;
