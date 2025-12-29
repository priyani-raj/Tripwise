function TravelOptions({ onSelect }) {
  return (
    <div className="space-y-6">
      <h2 className="text-center text-2xl font-semibold text-slate-800">
        Select Travel Mode
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onSelect("bus")}
          className="flex flex-col items-center justify-center gap-2
                     bg-white/90 border border-blue-200/60
                     rounded-2xl p-6
                     shadow-md shadow-blue-200/30
                     hover:shadow-lg hover:border-blue-300
                     active:scale-95 transition duration-200"
        >
          <span className="text-3xl">🚌</span>
          <span className="font-semibold text-slate-700">Bus</span>
        </button>

        <button
          onClick={() => onSelect("train")}
          className="flex flex-col items-center justify-center gap-2
                     bg-white/90 border border-blue-200/60
                     rounded-2xl p-6
                     shadow-md shadow-blue-200/30
                     hover:shadow-lg hover:border-blue-300
                     active:scale-95 transition duration-200"
        >
          <span className="text-3xl">🚆</span>
          <span className="font-semibold text-slate-700">Train</span>
        </button>

        <button
          onClick={() => onSelect("car")}
          className="flex flex-col items-center justify-center gap-2
                     bg-white/90 border border-blue-200/60
                     rounded-2xl p-6
                     shadow-md shadow-blue-200/30
                     hover:shadow-lg hover:border-blue-300
                     active:scale-95 transition duration-200"
        >
          <span className="text-3xl">🚗</span>
          <span className="font-semibold text-slate-700">Car</span>
        </button>

        <button
          onClick={() => onSelect("flight")}
          className="flex flex-col items-center justify-center gap-2
                     bg-white/90 border border-blue-200/60
                     rounded-2xl p-6
                     shadow-md shadow-blue-200/30
                     hover:shadow-lg hover:border-blue-300
                     active:scale-95 transition duration-200"
        >
          <span className="text-3xl">✈️</span>
          <span className="font-semibold text-slate-700">Flight</span>
        </button>
      </div>
    </div>
  );
}

export default TravelOptions;
