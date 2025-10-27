
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_STORIES, MOCK_PRODUCTS, MOCK_ARTISANS } from '../constants';
import Header from '../components/Header';
import { PlayCircle, ShoppingBag } from 'lucide-react';

const StoryDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const story = MOCK_STORIES.find(s => s.id === id);

    if (!story) {
        return <div>Story not found</div>;
    }

    const artisan = MOCK_ARTISANS.find(a => a.id === story.artisanId);
    const relatedProducts = MOCK_PRODUCTS.filter(p => story.relatedProducts.includes(p.id));

    return (
        <div className="bg-white min-h-screen">
            <Header title={story.title} />
            <div className="relative h-64">
                <img src={story.image} alt={story.title} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                    <h1 className="text-3xl font-bold">{story.title}</h1>
                    {artisan && <p>A story by {artisan.name} from {artisan.village}</p>}
                </div>
                 <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80 hover:text-white transition-colors">
                     <PlayCircle className="w-20 h-20" />
                 </button>
            </div>
            <div className="p-6">
                <p className="text-lg text-gray-700 leading-relaxed">{story.content}</p>
            </div>
            
            {relatedProducts.length > 0 && (
                <div className="p-6 bg-rh-off-white/60">
                    <h3 className="text-xl font-bold text-rh-dark flex items-center gap-2 mb-4">
                        <ShoppingBag className="w-6 h-6 text-rh-terracotta" />
                        Products from this Story
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {relatedProducts.map(product => (
                            <Link to={`/product/${product.id}`} key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <img src={product.images[0]} alt={product.title} className="w-full h-24 object-cover"/>
                                <div className="p-3">
                                    <p className="font-semibold truncate">{product.title}</p>
                                    <p className="text-sm text-rh-green font-bold">₹{product.price}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StoryDetail;
