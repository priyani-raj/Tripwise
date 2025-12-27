function PreferenceSelector({ onSelect }) {
  return (
    <div>
      <h2>Select your travel preference</h2>

      <button onClick={() => onSelect("foodie")}>
        🍜 Foodie
      </button>

      <button onClick={() => onSelect("photographer")}>
        📸 Photographer
      </button>
    </div>
  );
}

export default PreferenceSelector;
