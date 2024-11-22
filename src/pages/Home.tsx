import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <h1 className="text-5xl font-bold mb-6">
        Bienvenue chez
        <br />
        <span className="text-primary">Burger House</span>
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Les meilleurs burgers de la ville. Commandez maintenant et récupérez votre commande dès qu'elle est prête !
      </p>
      <Link
        to="/menu"
        className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Voir le Menu
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}