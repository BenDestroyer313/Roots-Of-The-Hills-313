
import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_ARTISANS } from '../constants';
import type { Story } from '../types';

interface StoryCardProps {
  story: Story;
}

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
    const artisan = MOCK_ARTISANS.find(a => a.id === story.artisanId);
    
    return (
        <Link to={`/story/${story.id}`} className="bg-white rounded-xl shadow-lg overflow-hidden block hover:shadow-2xl transition-shadow duration-300 mb-8">
            <img src={story.image} alt={story.title} className="w-full h-56 object-cover" />
            <div className="p-6">
                {story.festivalTag && <span className="text-xs font-semibold bg-rh-terracotta/20 text-rh-terracotta px-3 py-1 rounded-full">{story.festivalTag}</span>}
                <h3 className="font-bold text-2xl mt-3 text-rh-dark">{story.title}</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">{story.content}</p>
                 {artisan && (
                    <div className="flex items-center mt-4 pt-4 border-t border-gray-200">
                        <img src={artisan.image} alt={artisan.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="ml-3">
                            <p className="font-semibold text-rh-dark">{artisan.name}</p>
                            <p className="text-sm text-gray-500">{artisan.village}</p>
                        </div>
                    </div>
                 )}
            </div>
        </Link>
    );
};

export default StoryCard;
