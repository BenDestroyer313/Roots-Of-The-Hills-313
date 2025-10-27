import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';

const MountainSVG = () => (
    <svg viewBox="0 0 100 40" className="absolute bottom-0 left-0 w-full h-auto text-rh-green opacity-10" preserveAspectRatio="none">
        <path d="M0 40 L0 25 Q 25 10, 50 25 T 100 20 L100 40 Z" fill="currentColor" />
        <path d="M0 40 L0 30 Q 15 20, 35 30 T 70 25 T 100 30 L100 40 Z" fill="currentColor" className="opacity-50" />
    </svg>
);

const Login: React.FC = () => {
    const { login } = useAppContext();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        login();
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-rh-off-white p-4 relative">
            <MountainSVG />
            <div className="w-full max-w-sm z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-rh-green">Roots of the Hills</h1>
                    <p className="text-gray-600 mt-2">Welcome back to the community.</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-xl">
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-rh-terracotta"
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                defaultValue="ben@rootsofhills.com"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow-inner appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-rh-terracotta"
                                id="password"
                                type="password"
                                placeholder="******************"
                                defaultValue="password"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="w-full bg-rh-terracotta hover:bg-rh-terracotta/90 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors" type="submit">
                                Sign In
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs mt-6">
                        Don't have an account? <Link to="/signup" className="text-rh-blue hover:underline">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;