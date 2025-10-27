import React from 'react';
import { MOCK_STORIES } from '../constants';
import StoryCard from '../components/StoryCard';
import { Feather } from 'lucide-react';

const StoryMode: React.FC = () => {
    return (
        <div className="bg-rh-off-white/50 min-h-screen">
            <header className="p-6 pt-10 text-center">
                <Feather className="w-16 h-16 mx-auto text-rh-terracotta" />
                <h1 className="text-4xl font-bold text-rh-green mt-4">Listen to the Roots</h1>
                <p className="text-gray-600 mt-2">Every product has a story. Discover the voices behind the craft.</p>
            </header>

            <div className="p-4 md:p-6">
                <div className="max-w-3xl mx-auto space-y-8">
                    {MOCK_STORIES.map(story => (
                        <StoryCard key={story.id} story={story} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StoryMode;
