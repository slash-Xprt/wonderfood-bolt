import { useState } from 'react';
import { CartItem } from '../types';
import { CreditCard, Store } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  onCancel: () => void;
  total: number;
  items: CartItem[];
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCode: string;
  phone: string;
  paymentMethod: 'counter' | 'card';
}

export default function CheckoutForm({ onCancel, total, items }: CheckoutFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+33',
    phone: '',
    paymentMethod: 'card',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (formData.paymentMethod === 'card') {
        const stripe = await stripePromise;
        if (!stripe) throw new Error('Erreur de chargement Stripe');

        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: total * 100,
            items,
            customer: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: `${formData.phoneCode}${formData.phone}`,
            },
          }),
        });

        const { clientSecret } = await response.json();

        const { error } = await stripe.confirmPayment({
          elements: await stripe.elements({ clientSecret }),
          confirmParams: {
            return_url: `${window.location.origin}/order-confirmation`,
          },
        });

        if (error) {
          throw new Error(error.message);
        }
      } else {
        await fetch('/api/create-order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items,
            total,
            customer: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              phone: `${formData.phoneCode}${formData.phone}`,
            },
            paymentMethod: 'counter',
          }),
        });
      }
      
      onCancel();
    } catch (error) {
      console.error('Erreur lors du traitement de la commande:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="flex-1 space-y-4 overflow-y-auto">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            Prénom
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Nom
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Numéro de téléphone
          </label>
          <div className="flex gap-2">
            <select
              id="phoneCode"
              name="phoneCode"
              className="px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              value={formData.phoneCode}
              onChange={handleChange}
            >
              <option value="+33">🇫🇷 +33</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+49">🇩🇪 +49</option>
              <option value="+34">🇪🇸 +34</option>
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="flex-1 px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary"
              value={formData.phone}
              onChange={handleChange}
              placeholder="612345678"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mode de paiement
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label
              className={`flex items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.paymentMethod === 'card'
                  ? 'border-primary bg-primary/5'
                  : 'hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === 'card'}
                onChange={handleChange}
                className="hidden"
              />
              <CreditCard className={`h-5 w-5 ${
                formData.paymentMethod === 'card' ? 'text-primary' : 'text-gray-400'
              }`} />
              <span className={formData.paymentMethod === 'card' ? 'text-primary' : 'text-gray-600'}>
                Payer par Carte
              </span>
            </label>
            
            <label
              className={`flex items-center gap-2 p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.paymentMethod === 'counter'
                  ? 'border-primary bg-primary/5'
                  : 'hover:bg-gray-50'
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="counter"
                checked={formData.paymentMethod === 'counter'}
                onChange={handleChange}
                className="hidden"
              />
              <Store className={`h-5 w-5 ${
                formData.paymentMethod === 'counter' ? 'text-primary' : 'text-gray-400'
              }`} />
              <span className={formData.paymentMethod === 'counter' ? 'text-primary' : 'text-gray-600'}>
                Payer sur Place
              </span>
            </label>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Résumé de la commande</h3>
          {items.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.quantity}x {item.name}</span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
          <div className="border-t mt-2 pt-2 font-semibold flex justify-between">
            <span>Total</span>
            <span>{total.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      <div className="border-t pt-4 mt-4 space-y-2">
        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Traitement...' : formData.paymentMethod === 'card' 
            ? 'Payer par Carte' 
            : 'Commander et Payer sur Place'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200"
          disabled={isSubmitting}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}