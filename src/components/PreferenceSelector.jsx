function PreferenceSelector({ onSelect }) {
  return (
    <div className="space-y-6">
      <h2 className="text-center text-2xl font-semibold text-slate-800">
        Select your travel preference
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => onSelect("foodie")}
          className="flex flex-col items-center justify-center gap-2
                     bg-white/90 border border-blue-200/60
                     rounded-2xl p-6
                     shadow-md shadow-blue-200/30
                     hover:shadow-lg hover:border-blue-300
                     transition duration-200"
        >
          <span className="text-3xl">🍽️</span>
          <span className="font-semibold text-slate-700">Foodie</span>
        </button>

        <button
          onClick={() => onSelect("explorer")}
          className="flex flex-col items-center justify-center gap-2
                     bg-white/90 border border-blue-200/60
                     rounded-2xl p-6
                     shadow-md shadow-blue-200/30
                     hover:shadow-lg hover:border-blue-300
                     transition duration-200"
        >
          <span className="text-3xl">🧭</span>
          <span className="font-semibold text-slate-700">Explorer</span>
        </button>

        <button
          onClick={() => onSelect("photographer")}
          className="flex flex-col items-center justify-center gap-2
                     bg-white/90 border border-blue-200/60
                     rounded-2xl p-6
                     shadow-md shadow-blue-200/30
                     hover:shadow-lg hover:border-blue-300
                     transition duration-200"
        >
          <span className="text-3xl">📸</span>
          <span className="font-semibold text-slate-700">Photographer</span>
        </button>
      </div>
    </div>
  );
}

export default PreferenceSelector;
