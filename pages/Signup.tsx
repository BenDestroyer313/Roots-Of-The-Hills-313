import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Store } from 'lucide-react';

const MountainSVG = () => (
    <svg viewBox="0 0 100 40" className="absolute bottom-0 left-0 w-full h-auto text-rh-green opacity-10" preserveAspectRatio="none">
        <path d="M0 40 L0 25 Q 25 10, 50 25 T 100 20 L100 40 Z" fill="currentColor" />
        <path d="M0 40 L0 30 Q 15 20, 35 30 T 70 25 T 100 30 L100 40 Z" fill="currentColor" className="opacity-50" />
    </svg>
);

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState<'buyer' | 'artisan'>('buyer');

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock signup logic
        console.log('New user signed up as:', role);
        alert('Account created successfully! Please log in.');
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-rh-off-white p-4 relative">
            <MountainSVG />
            <div className="w-full max-w-sm z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-rh-green">Join the Community</h1>
                    <p className="text-gray-600 mt-2">Create an account to start your journey.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl">
                    <form onSubmit={handleSignup}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">I am a...</label>
                            <div className="flex gap-2">
                                <button type="button" onClick={() => setRole('buyer')} className={`flex-1 p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-colors ${role === 'buyer' ? 'border-rh-terracotta bg-rh-terracotta/10' : 'border-gray-200'}`}>
                                    <User className="w-5 h-5" /> Buyer
                                </button>
                                <button type="button" onClick={() => setRole('artisan')} className={`flex-1 p-3 rounded-lg border-2 flex items-center justify-center gap-2 transition-colors ${role === 'artisan' ? 'border-rh-terracotta bg-rh-terracotta/10' : 'border-gray-200'}`}>
                                    <Store className="w-5 h-5" /> Artisan
                                </button>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-rh-terracotta"
                                id="name" type="text" placeholder="Your Name" required />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-rh-terracotta"
                                id="email" type="email" placeholder="you@example.com" required />
                        </div>
                        
                        {role === 'artisan' && (
                             <div className="mb-4 transition-all duration-300">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="village">
                                    Village Name
                                </label>
                                <input
                                    className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-rh-terracotta"
                                    id="village" type="text" placeholder="e.g., Nainital, Kumaon" required />
                            </div>
                        )}

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-rh-terracotta"
                                id="password" type="password" placeholder="******************" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="w-full bg-rh-terracotta hover:bg-rh-terracotta/90 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors" type="submit">
                                Create Account
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs mt-6">
                        Already have an account? <Link to="/login" className="text-rh-blue hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;