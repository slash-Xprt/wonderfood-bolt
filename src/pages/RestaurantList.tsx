import { useState } from 'react';
import { Search } from 'lucide-react';

const RESTAURANTS = [
  {
    id: 1,
    name: "Burger House",
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300",
    cuisine: "American",
    rating: 4.5,
    deliveryTime: "20-30",
  },
  {
    id: 2,
    name: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300",
    cuisine: "Italian",
    rating: 4.7,
    deliveryTime: "25-35",
  },
  {
    id: 3,
    name: "Sushi Master",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "30-40",
  },
];

export default function RestaurantList() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search restaurants..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESTAURANTS.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
              <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
              <div className="flex items-center justify-between">
                <span className="text-primary">⭐ {restaurant.rating}</span>
                <span className="text-gray-600">{restaurant.deliveryTime} mins</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}