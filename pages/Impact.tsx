
import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Trees, Globe, Heart } from 'lucide-react';

const pieData = [
    { name: 'Kumaon', value: 400 },
    { name: 'Garhwal', value: 300 },
];
const COLORS = ['#D97757', '#295D42'];

const barData = [
    { name: 'Jan', donations: 1200 },
    { name: 'Feb', donations: 2100 },
    { name: 'Mar', donations: 800 },
    { name: 'Apr', donations: 1600 },
];

const Impact: React.FC = () => {
    return (
        <div className="bg-rh-off-white/50 min-h-screen">
            <header className="p-6 pt-10 text-center">
                <h1 className="text-4xl font-bold text-rh-green">Your Purchase Creates Change</h1>
                <p className="text-gray-600 mt-2">See the collective impact we're making together.</p>
            </header>

            {/* Personal Impact */}
            <div className="p-4">
                 <div className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-xl font-bold text-rh-dark mb-4">Your Monthly Impact</h2>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-rh-terracotta/10 p-4 rounded-lg">
                            <Heart className="w-8 h-8 text-rh-terracotta mx-auto"/>
                            <p className="text-2xl font-bold mt-2">12</p>
                            <p className="text-sm text-gray-600">Families Supported</p>
                        </div>
                        <div className="bg-rh-green/10 p-4 rounded-lg">
                            <Trees className="w-8 h-8 text-rh-green mx-auto"/>
                            <p className="text-2xl font-bold mt-2">85kg</p>
                            <p className="text-sm text-gray-600">Carbon Saved</p>
                        </div>
                    </div>
                 </div>
            </div>
            
            {/* Global Impact Wall */}
             <div className="p-4">
                <h2 className="text-2xl font-bold text-rh-dark mb-4 text-center">Global Impact Wall</h2>
                <div className="grid grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-xl shadow-md text-center">
                        <Users className="w-10 h-10 text-rh-blue mx-auto mb-2"/>
                        <p className="text-3xl font-bold text-rh-dark">250+</p>
                        <p className="text-gray-500">Artisans Onboarded</p>
                     </div>
                     <div className="bg-white p-4 rounded-xl shadow-md text-center">
                        <Globe className="w-10 h-10 text-rh-terracotta mx-auto mb-2"/>
                        <p className="text-3xl font-bold text-rh-dark">15+</p>
                        <p className="text-gray-500">Villages Connected</p>
                     </div>
                </div>
             </div>

            {/* Charts */}
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-md p-4">
                    <h3 className="font-bold text-lg mb-4">Families Helped by Region</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                                {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-xl shadow-md p-4">
                    <h3 className="font-bold text-lg mb-4">Community Donations (Coins)</h3>
                    <ResponsiveContainer width="100%" height={200}>
                         <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="donations" fill="#4C91B3" />
                         </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default Impact;
