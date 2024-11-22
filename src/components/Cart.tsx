import { useState } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutForm from './CheckoutForm';

export default function Cart() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { items, removeFromCart, updateQuantity, total, isCartOpen, setCartOpen } = useCart();

  const handleCheckout = () => {
    setIsCheckingOut(true);
  };

  return (
    <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {isCheckingOut ? 'Commander' : 'Votre Panier'}
          </h2>
          <button onClick={() => {
            setCartOpen(false);
            setIsCheckingOut(false);
          }}>
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {isCheckingOut ? (
          <CheckoutForm 
            onCancel={() => setIsCheckingOut(false)}
            total={total}
            items={items}
          />
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center mt-8">Votre panier est vide</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b pb-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-gray-600">{item.price.toFixed(2)} €</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="border-t pt-4 mt-auto">
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="font-semibold">{total.toFixed(2)} €</span>
              </div>
              <button 
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50"
                disabled={items.length === 0}
                onClick={handleCheckout}
              >
                Passer la Commande
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}