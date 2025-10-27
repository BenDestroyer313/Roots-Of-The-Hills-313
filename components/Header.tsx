import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Languages } from 'lucide-react';
import { useAppContext } from '../hooks/useAppContext';

interface HeaderProps {
  title: string;
  actions?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, actions }) => {
  const navigate = useNavigate();
  const { currentUser, toggleLanguage } = useAppContext();

  return (
    <header className="sticky top-0 bg-rh-off-white/80 backdrop-blur-sm z-40 p-4 flex items-center justify-between shadow-sm">
      <button onClick={() => navigate(-1)} className="p-2 rounded-full hover:bg-gray-200">
        <ChevronLeft className="w-6 h-6 text-rh-dark" />
      </button>
      <h1 className="text-xl font-semibold text-rh-dark absolute left-1/2 -translate-x-1/2 whitespace-nowrap overflow-hidden text-ellipsis max-w-[60%]">
        {title}
      </h1>
      <div className="flex items-center gap-2">
        {actions}
        <button
          onClick={toggleLanguage}
          className="p-2 rounded-full hover:bg-gray-200 flex items-center gap-1 font-semibold text-rh-dark text-sm"
          aria-label={`Switch language, current is ${currentUser?.language === 'en' ? 'English' : 'Hindi'}`}
        >
            <Languages className="w-5 h-5" />
            <span>{currentUser?.language === 'en' ? 'EN' : 'HI'}</span>
        </button>
      </div>
    </header>
  );
};

export default Header;