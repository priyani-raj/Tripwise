function HotelRecommendations({ preference }) {
  const hotels = [
    {
      name: "Ganga View Stay",
      area: "Assi Ghat",
      price: 1800,
      tags: ["photographer"],
    },
    {
      name: "Foodie Inn",
      area: "Godowlia",
      price: 1500,
      tags: ["foodie"],
    },
    {
      name: "Budget Lodge",
      area: "Near Railway Station",
      price: 900,
      tags: ["budget"],
    },
  ];

  const filteredHotels = hotels.filter((hotel) =>
    hotel.tags.includes(preference)
  );

  return (
    <div>
      <h2>Recommended Hotels</h2>

      {filteredHotels.map((hotel) => (
        <div key={hotel.name}>
          <h3>{hotel.name}</h3>
          <p>Area: {hotel.area}</p>
          <p>₹{hotel.price} / night</p>
        </div>
      ))}

      {filteredHotels.length === 0 && (
        <p>No exact match found. Showing general options.</p>
      )}
    </div>
  );
}

export default HotelRecommendations;
