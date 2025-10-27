
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_ARTISANS, MOCK_STORIES } from '../constants';
import type { Product, Artisan, Story } from '../types';

interface SearchResults {
    products: Product[];
    artisans: Artisan[];
    stories: Story[];
}

const SearchBar: React.FC = () => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const results: SearchResults = useMemo(() => {
        if (query.length < 2) {
            return { products: [], artisans: [], stories: [] };
        }

        const lowercasedQuery = query.toLowerCase();

        const products = MOCK_PRODUCTS.filter(
            p => p.title.toLowerCase().includes(lowercasedQuery) || p.description.toLowerCase().includes(lowercasedQuery)
        ).slice(0, 3);

        const artisans = MOCK_ARTISANS.filter(
            a => a.name.toLowerCase().includes(lowercasedQuery) || a.village.toLowerCase().includes(lowercasedQuery)
        ).slice(0, 3);
        
        const stories = MOCK_STORIES.filter(
            s => s.title.toLowerCase().includes(lowercasedQuery) || s.content.toLowerCase().includes(lowercasedQuery)
        ).slice(0, 3);

        return { products, artisans, stories };
    }, [query]);

    const hasResults = results.products.length > 0 || results.artisans.length > 0 || results.stories.length > 0;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <div className="relative w-full max-w-lg mx-auto" ref={searchRef}>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search products, artisans, stories..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    className="w-full pl-12 pr-10 py-3 bg-white border border-gray-200 rounded-full shadow-sm focus:ring-2 focus:ring-rh-terracotta focus:outline-none transition-shadow"
                />
                {query && (
                     <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600">
                        <X />
                    </button>
                )}
            </div>
            
            {isFocused && query.length > 1 && (
                <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg overflow-hidden z-20 animate-fade-in-down">
                    {hasResults ? (
                        <div className="max-h-96 overflow-y-auto">
                           {results.products.length > 0 && (
                               <div>
                                   <h3 className="p-3 font-bold text-sm text-gray-500 bg-gray-50 border-b">Products</h3>
                                   {results.products.map(product => (
                                       <Link to={`/product/${product.id}`} key={product.id} className="flex items-center gap-4 p-3 hover:bg-rh-off-white/50 transition-colors" onClick={() => setIsFocused(false)}>
                                           <img src={product.images[0]} alt={product.title} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                                           <div>
                                               <p className="font-semibold text-rh-dark">{product.title}</p>
                                               <p className="text-sm text-rh-green font-bold">₹{product.price}</p>
                                           </div>
                                       </Link>
                                   ))}
                               </div>
                           )}
                           {results.artisans.length > 0 && (
                               <div>
                                   <h3 className="p-3 font-bold text-sm text-gray-500 bg-gray-50 border-t">Artisans</h3>
                                   {results.artisans.map(artisan => (
                                       <Link to={`/artisan/${artisan.id}`} key={artisan.id} className="flex items-center gap-4 p-3 hover:bg-rh-off-white/50 transition-colors" onClick={() => setIsFocused(false)}>
                                           <img src={artisan.image} alt={artisan.name} className="w-12 h-12 object-cover rounded-full flex-shrink-0" />
                                           <div>
                                               <p className="font-semibold text-rh-dark">{artisan.name}</p>
                                               <p className="text-sm text-gray-500">{artisan.village}</p>
                                           </div>
                                       </Link>
                                   ))}
                               </div>
                           )}
                           {results.stories.length > 0 && (
                               <div>
                                   <h3 className="p-3 font-bold text-sm text-gray-500 bg-gray-50 border-t">Stories</h3>
                                   {results.stories.map(story => (
                                       <Link to={`/story/${story.id}`} key={story.id} className="flex items-center gap-4 p-3 hover:bg-rh-off-white/50 transition-colors" onClick={() => setIsFocused(false)}>
                                           <img src={story.image} alt={story.title} className="w-12 h-12 object-cover rounded-md flex-shrink-0" />
                                           <div>
                                               <p className="font-semibold text-rh-dark">{story.title}</p>
                                               <p className="text-sm text-gray-500 line-clamp-1">{story.content}</p>
                                           </div>
                                       </Link>
                                   ))}
                               </div>
                           )}
                        </div>
                    ) : (
                         <div className="p-4 text-center text-gray-500">
                             No results found for "{query}"
                         </div>
                    )}
                </div>
            )}
             <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default SearchBar;
