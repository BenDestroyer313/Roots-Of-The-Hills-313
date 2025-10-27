import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../hooks/useAppContext';
import Header from '../components/Header';
import { Save } from 'lucide-react';

const ProfileSettings: React.FC = () => {
  const { currentUser, updateUser } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState(currentUser?.name || '');
  const [avatar, setAvatar] = useState(currentUser?.avatar || '');

  if (!currentUser) {
    return null; 
  }

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, avatar });
    navigate('/profile');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Profile Settings" />
      <div className="p-6">
        <form onSubmit={handleSaveChanges}>
          <div className="flex flex-col items-center mb-8">
            <img src={avatar} alt="User Avatar" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg mb-4" />
          </div>

          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Display Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rh-terracotta focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                Avatar URL
              </label>
              <input
                type="text"
                id="avatar"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rh-terracotta focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-rh-green text-white py-3 rounded-lg text-lg font-bold flex items-center justify-center gap-2 hover:bg-rh-green/90"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
