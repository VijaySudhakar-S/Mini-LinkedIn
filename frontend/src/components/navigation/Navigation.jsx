import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navigation = ({ currentView, setCurrentView }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mini LinkedIn</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setCurrentView('feed')}
            className={`px-4 py-2 rounded transition-colors ${
              currentView === 'feed' ? 'bg-blue-700' : 'hover:bg-blue-700'
            }`}
          >
            Feed
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className={`px-4 py-2 rounded transition-colors ${
              currentView === 'profile' ? 'bg-blue-700' : 'hover:bg-blue-700'
            }`}
          >
            My Profile
          </button>
          <span className="flex items-center space-x-2">
            <User size={20} />
            <span>{user?.name}</span>
          </span>
          <button
            onClick={logout}
            className="flex items-center space-x-1 px-4 py-2 bg-red-500 hover:bg-red-600 rounded transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;