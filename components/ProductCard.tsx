import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { Heart, Plus } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';
import { MOCK_ARTISANS } from '../constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, wishlist, toggleWishlist } = useAppContext();
  const isWishlisted = wishlist.includes(product.id);
  const artisan = MOCK_ARTISANS.find(a => a.id === product.artisanId);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
    
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  }

  return (
    <Link to={`/product/${product.id}`} className="bg-white rounded-lg shadow-md overflow-hidden group block hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img src={product.images[0]} alt={product.title} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
        <button onClick={handleToggleWishlist} className="absolute top-2 right-2 bg-white/70 p-2 rounded-full hover:bg-white transition-colors">
            <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
        </button>
        {product.verified && <span className="absolute top-2 left-2 bg-rh-green text-white text-xs px-2 py-1 rounded-full">Roots Verified</span>}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg truncate text-rh-dark">{product.title}</h3>
        <p className="text-gray-500 text-sm">by {artisan?.name || 'Unknown Artisan'}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-rh-green font-bold text-xl">₹{product.price}</span>
          <button onClick={handleAddToCart} className="bg-rh-terracotta text-white rounded-full p-2 hover:bg-rh-terracotta/90 transition-transform transform group-hover:scale-110">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
