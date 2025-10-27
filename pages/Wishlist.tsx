import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { MOCK_PRODUCTS } from '../constants';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';

const Wishlist: React.FC = () => {
  const { wishlist } = useAppContext();
  const wishlistedProducts = MOCK_PRODUCTS.filter(product => wishlist.includes(product.id));

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="My Wishlist" />
      {wishlistedProducts.length === 0 ? (
        <div className="text-center py-20 px-4">
          <Heart className="w-16 h-16 mx-auto text-gray-300" />
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">Your wishlist is empty</h2>
          <p className="text-gray-500 mt-2">Tap the heart on any product to save it here.</p>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {wishlistedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
