import React, { useState, useMemo, useEffect, useRef } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';
import { SlidersHorizontal, Map, BrainCircuit, Star, Zap, Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import { getCulturalRecommendations } from '../services/geminiService';
import { useAppContext } from '../hooks/useAppContext';
import SearchBar from '../components/SearchBar';


const MountainSVGBackground = () => (
    <div className="absolute top-0 left-0 w-full h-64 -z-10 overflow-hidden">
      <svg viewBox="0 0 100 40" className="absolute -bottom-1 left-0 w-full h-auto text-rh-green opacity-10" preserveAspectRatio="none">
          <path d="M0 40 L0 25 Q 25 10, 50 25 T 100 20 L100 40 Z" fill="currentColor" />
      </svg>
       <svg viewBox="0 0 100 40" className="absolute -bottom-1 left-0 w-full h-auto text-rh-blue opacity-10" preserveAspectRatio="none">
         <path d="M0 40 L0 30 Q 15 20, 35 30 T 70 25 T 100 30 L100 40 Z" fill="currentColor" />
      </svg>
    </div>
);

const ProductCarousel: React.FC<{ title: string; products: Product[]; icon: React.ReactElement }> = ({ title, products, icon }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const scroll = (scrollOffset: number) => {
        if(scrollRef.current) {
            scrollRef.current.scrollLeft += scrollOffset;
        }
    };
    if (products.length === 0) return null;
    return (
        <div className="py-4">
            <div className="flex justify-between items-center px-4 mb-3">
                <div className="flex items-center gap-2">
                    {/* FIX: Cast icon to React.ReactElement<any> to resolve TypeScript error with React.cloneElement */}
                    {React.cloneElement(icon as React.ReactElement<any>, { className: "w-6 h-6 text-rh-terracotta"})}
                    <h2 className="text-xl font-bold text-rh-dark">{title}</h2>
                </div>
                 <div className="flex gap-2">
                    <button onClick={() => scroll(-300)} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"><ChevronLeft /></button>
                    <button onClick={() => scroll(300)} className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100"><ChevronRight /></button>
                </div>
            </div>
            <div ref={scrollRef} className="flex gap-4 overflow-x-auto px-4 pb-4 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                {products.map(product => (
                    <div key={product.id} className="w-64 flex-shrink-0">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

const Shop: React.FC = () => {
    const {currentUser} = useAppContext();
    const [products] = useState<Product[]>(MOCK_PRODUCTS);
    const [filters, setFilters] = useState({ category: 'All', region: 'All', price: 5000 });
    const [showFilters, setShowFilters] = useState(false);
    const [aiRecommendation, setAiRecommendation] = useState('');
    const [isLoadingAi, setIsLoadingAi] = useState(false);

    const getAiRecs = async () => {
        setIsLoadingAi(true);
        const context = `It's currently near the Harela festival. User ${currentUser?.name} has previously shown interest in Kumaon region handicrafts.`;
        const recs = await getCulturalRecommendations(context);
        setAiRecommendation(recs);
        setIsLoadingAi(false);
    }
    
    useEffect(() => {
        getAiRecs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { featuredProducts, seasonalProducts, festivalProducts, filteredProducts } = useMemo(() => {
        const featured = products.filter(p => p.featured);
        const seasonal = products.filter(p => p.season === 'Winter'); // Example season
        const festival = products.filter(p => p.category === 'Festival');
        
        const filtered = products.filter(p => {
            const categoryMatch = filters.category === 'All' || p.category === filters.category;
            const regionMatch = filters.region === 'All' || p.region === filters.region;
            const priceMatch = p.price <= filters.price;
            return categoryMatch && regionMatch && priceMatch;
        });
        return { featuredProducts: featured, seasonalProducts: seasonal, festivalProducts: festival, filteredProducts: filtered };
    }, [products, filters]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({...prev, [name]: value}));
    }

    return (
        <div className="min-h-screen relative">
            <MountainSVGBackground />
            <header className="p-6 pt-10 text-center relative">
                <SearchBar />
            </header>

            {/* AI Curator Section */}
            <div className="px-4 py-2">
                <div className="bg-gradient-to-r from-rh-blue/20 to-rh-green/20 rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <BrainCircuit className="w-8 h-8 text-rh-blue" />
                        <h3 className="font-bold text-lg text-rh-dark">AI Culture Curator</h3>
                    </div>
                    {isLoadingAi ? (
                         <p className="mt-2 text-gray-600 animate-pulse">Thinking of something special for you...</p>
                    ) : (
                        <p className="mt-2 text-gray-700">{aiRecommendation}</p>
                    )}
                </div>
            </div>
            
            <ProductCarousel title="Featured Products" products={featuredProducts} icon={<Star />} />
            <ProductCarousel title="Seasonal Picks" products={seasonalProducts} icon={<Sun />} />
            <ProductCarousel title="Festival Collections" products={festivalProducts} icon={<Zap />} />

            {/* Filter Controls */}
            <div className="p-4 flex justify-between items-center sticky top-0 bg-rh-off-white/80 backdrop-blur-sm z-30 border-t border-b border-gray-200">
                 <h2 className="text-xl font-bold text-rh-dark">All Products</h2>
                <div>
                    <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
                        <SlidersHorizontal className="w-5 h-5 text-rh-terracotta" />
                        <span>Filters</span>
                    </button>
                </div>
            </div>
            
            {showFilters && (
                <div className="p-4 bg-white/50 animate-fade-in-down">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Category</label>
                            <select name="category" value={filters.category} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rh-terracotta focus:border-rh-terracotta sm:text-sm rounded-md">
                                <option>All</option>
                                <option>Handicrafts</option>
                                <option>Organic Food</option>
                                <option>Herbal Products</option>
                                <option>Festival</option>
                            </select>
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-gray-700">Region</label>
                            <select name="region" value={filters.region} onChange={handleFilterChange} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-rh-terracotta focus:border-rh-terracotta sm:text-sm rounded-md">
                                <option>All</option>
                                <option>Kumaon</option>
                                <option>Garhwal</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Max Price: ₹{filters.price}</label>
                            <input type="range" name="price" min="100" max="5000" step="50" value={filters.price} onChange={handleFilterChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rh-terracotta" />
                        </div>
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            
            <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.3s ease-out forwards;
                }
                .scroll-smooth::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default Shop;
