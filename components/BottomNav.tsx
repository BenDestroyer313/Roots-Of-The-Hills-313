import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ICONS } from '../constants';
import { useAppContext } from '../hooks/useAppContext';
import { ShoppingCart } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Shop', icon: NAV_ICONS.shop },
  { path: '/story', label: 'Story', icon: NAV_ICONS.story },
  { path: '/mitra', label: 'Mitra', icon: NAV_ICONS.mitra },
  { path: '/impact', label: 'Impact', icon: NAV_ICONS.impact },
  { path: '/profile', label: 'Profile', icon: NAV_ICONS.profile },
];

const BottomNav: React.FC = () => {
  const { cart } = useAppContext();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-rh-off-white/80 backdrop-blur-sm shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
      <nav className="flex justify-around max-w-2xl mx-auto pr-20">
        {navItems.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full pt-2 pb-1 text-center transition-colors duration-200 ${
                isActive ? 'text-rh-green' : 'text-gray-500 hover:text-rh-green'
              }`
            }
          >
            {React.cloneElement(icon, { className: 'w-6 h-6' })}
            <span className="text-xs mt-1">{label}</span>
          </NavLink>
        ))}
      </nav>
        <NavLink to="/cart" className="absolute top-1/2 -translate-y-1/2 right-4 bg-rh-terracotta text-white p-3 rounded-full shadow-lg hover:bg-rh-terracotta/90 transition-transform transform hover:scale-105">
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-rh-green text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{totalItems}</span>}
        </NavLink>
    </footer>
  );
};

export default BottomNav;