import React from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { Settings, ShoppingBag, Heart, ShieldCheck, Gem, Users, BookOpen, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
    const { currentUser } = useAppContext();

    if (!currentUser) return null;

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="p-6 bg-gradient-to-b from-rh-green to-rh-blue text-white text-center rounded-b-3xl">
                <img src={currentUser.avatar} alt={currentUser.name} className="w-24 h-24 rounded-full mx-auto border-4 border-white/50 shadow-lg"/>
                <h1 className="text-2xl font-bold mt-4">{currentUser.name}</h1>
                <p className="opacity-80">{currentUser.mitraRank} Mitra</p>
            </div>
            
            {/* Quick Stats */}
            <div className="p-4 -mt-8 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-md text-center">
                    <Gem className="w-8 h-8 mx-auto text-rh-terracotta" />
                    <p className="text-2xl font-bold mt-1">{currentUser.coins}</p>
                    <p className="text-sm text-gray-500">Roots Coins</p>
                </div>
                 <div className="bg-white p-4 rounded-xl shadow-md text-center">
                    <ShieldCheck className="w-8 h-8 mx-auto text-rh-green" />
                    <p className="text-2xl font-bold mt-1">{currentUser.badges.length}</p>
                    <p className="text-sm text-gray-500">Badges Earned</p>
                </div>
            </div>

            {/* Badges */}
            <div className="px-4">
                <h3 className="font-bold text-lg text-rh-dark mb-2">My Badges</h3>
                <div className="flex gap-2">
                    {currentUser.badges.map(badge => (
                        <span key={badge} className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">{badge}</span>
                    ))}
                </div>
            </div>

            {/* Menu */}
            <div className="p-4 mt-6">
                <div className="bg-white rounded-xl shadow-md divide-y">
                   <MenuItem icon={<ShoppingBag />} text="Order History" link="/orders" />
                   <MenuItem icon={<Heart />} text="Wishlist" link="/wishlist" />
                   <MenuItem icon={<Settings />} text="Settings" link="/profile/settings" />
                </div>
            </div>

            <div className="p-4">
                <div className="bg-white rounded-xl shadow-md divide-y">
                   <MenuItem icon={<Users />} text="PahadiMitra Dashboard" link="/mitra"/>
                   <MenuItem icon={<BookOpen />} text="Roots Academy" link="/academy"/>
                   <MenuItem icon={<Calendar />} text="Workshops" link="/workshops"/>
                </div>
            </div>
            
        </div>
    );
};

interface MenuItemProps {
    icon: React.ReactElement<{ className?: string }>;
    text: string;
    link?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, text, link }) => {
    const content = (
         <div className="flex items-center gap-4 p-4 text-rh-dark hover:bg-gray-50 transition-colors cursor-pointer">
            {React.cloneElement(icon, {className: "w-6 h-6 text-rh-terracotta"})}
            <span className="font-semibold">{text}</span>
        </div>
    );
    return link ? <Link to={link}>{content}</Link> : content;
};

export default Profile;
