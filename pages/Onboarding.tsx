import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Feather, ShoppingBag, Heart } from 'lucide-react';

const slides = [
    {
        icon: <Feather className="w-16 h-16 text-rh-terracotta" />,
        title: "Discover Authentic Crafts",
        description: "Explore unique, handcrafted products directly from the artisans of Uttarakhand.",
        image: "https://picsum.photos/seed/onboard1/800/1200"
    },
    {
        icon: <Heart className="w-16 h-16 text-rh-terracotta" />,
        title: "Shop with Purpose",
        description: "Every purchase you make empowers local communities and helps preserve cultural heritage.",
        image: "https://picsum.photos/seed/onboard2/800/1200"
    },
    {
        icon: <ShoppingBag className="w-16 h-16 text-rh-terracotta" />,
        title: "Every Product Tells a Story",
        description: "Go beyond the item. Listen to the voices and learn the traditions behind each creation.",
        image: "https://picsum.photos/seed/onboard3/800/1200"
    }
];

const Onboarding: React.FC = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const navigate = useNavigate();

    const goToNext = () => {
        if (activeSlide < slides.length - 1) {
            setActiveSlide(activeSlide + 1);
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-rh-off-white overflow-hidden">
            <div className="flex-1 relative">
                <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
                    {slides.map((slide, index) => (
                        <div key={index} className="w-full h-full flex-shrink-0">
                            <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-rh-off-white p-8 rounded-t-3xl z-10 -mt-16 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
                <div className="text-center">
                    <div className="mb-4">
                        {slides[activeSlide].icon}
                    </div>
                    <h1 className="text-3xl font-bold text-rh-dark">{slides[activeSlide].title}</h1>
                    <p className="text-gray-600 mt-2 text-lg">{slides[activeSlide].description}</p>
                </div>

                <div className="flex justify-center my-6 gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeSlide === index ? 'w-6 bg-rh-terracotta' : 'bg-gray-300'}`}
                        />
                    ))}
                </div>

                <button
                    onClick={goToNext}
                    className="w-full bg-rh-green text-white py-4 rounded-xl text-lg font-bold hover:bg-rh-green/90 transition-colors shadow-lg"
                >
                    {activeSlide === slides.length - 1 ? "Enter Marketplace" : "Next"}
                </button>
            </div>
        </div>
    );
};

export default Onboarding;
