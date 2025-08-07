import React from 'react';
import { useAuth } from './context/AuthContext';
import LoginForm from './components/auth/LoginForm';
import Navigation from './components/navigation/Navigation';
import Feed from './components/posts/Feed';
import Profile from './components/profile/Profile';
import { useState } from 'react';

const App = () => {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState('feed');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      {currentView === 'feed' ? <Feed /> : <Profile />}
    </div>
  );
};

export default App;