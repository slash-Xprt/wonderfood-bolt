import { useState } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menu';
import { useCart } from '../context/CartContext';

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart } = useCart();

  const filteredItems = selectedCategory
    ? MENU_ITEMS.filter(item => item.category === selectedCategory)
    : MENU_ITEMS;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Notre Menu</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {MENU_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(
              category.id === selectedCategory ? null : category.id
            )}
            className={`relative h-32 rounded-lg overflow-hidden group ${
              category.id === selectedCategory ? 'ring-2 ring-primary' : ''
            }`}
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-lg font-semibold">
                {category.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <span className="font-semibold">{item.price.toFixed(2)} €</span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button
                onClick={() => addToCart(item)}
                className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90"
              >
                Ajouter au Panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}