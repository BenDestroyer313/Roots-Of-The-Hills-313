
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_ARTISANS, MOCK_PRODUCTS, MOCK_STORIES } from '../constants';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { UserPlus, Check } from 'lucide-react';

const ArtisanProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { followedArtisans, toggleFollowArtisan } = useAppContext();

  const artisan = MOCK_ARTISANS.find(a => a.id === id);
  const story = MOCK_STORIES.find(s => s.artisanId === id);
  const products = MOCK_PRODUCTS.filter(p => p.artisanId === id);

  if (!artisan) {
    return <div>Artisan not found</div>;
  }

  const isFollowing = followedArtisans.includes(artisan.id);

  return (
    <div className="bg-rh-off-white/50 min-h-screen">
      <Header title={artisan.name} />
      
      <div className="p-6 bg-white rounded-b-3xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img src={artisan.image} alt={artisan.name} className="w-28 h-28 rounded-full border-4 border-rh-terracotta/50 shadow-lg" />
          <div className="text-center sm:text-left">
            <h1 className="text-3xl font-bold text-rh-dark">{artisan.name}</h1>
            <p className="text-rh-terracotta font-semibold">{artisan.village}</p>
            <p className="text-gray-600 mt-2">{artisan.story}</p>
          </div>
        </div>
        <button 
          onClick={() => toggleFollowArtisan(artisan.id)}
          className={`w-full mt-6 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${isFollowing ? 'bg-rh-green text-white' : 'bg-rh-blue text-white hover:bg-rh-blue/90'}`}
        >
          {isFollowing ? <><Check className="w-5 h-5" /> Following</> : <><UserPlus className="w-5 h-5" /> Follow Artisan</>}
        </button>
      </div>

      {story && (
        <div className="p-4">
          <Link to={`/story/${story.id}`} className="block bg-gradient-to-r from-rh-blue/10 to-rh-green/10 p-4 rounded-xl hover:shadow-md transition-shadow">
            <h3 className="font-bold text-rh-dark">Read {artisan.name.split(' ')[0]}'s Story: "{story.title}"</h3>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{story.content}</p>
          </Link>
        </div>
      )}

      <div className="p-4">
        <h2 className="text-2xl font-bold text-rh-dark mb-4">Products by {artisan.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtisanProfile;
