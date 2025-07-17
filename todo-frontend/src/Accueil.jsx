import React, { useState, useEffect } from 'react';
import Dashboard from './Dahboard';
import AuthInterface from './AuthInterface';

const Accueil = () => {
  const [activeForm, setActiveForm] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setActiveForm(null);
  };

  const handleRegisterSuccess = () => {
    setActiveForm('connexion');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (user) {
    return (
      <div className="h-screen bg-white">
        <Dashboard user={user} onLogout={handleLogout} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <AuthInterface 
        activeForm={activeForm}
        setActiveForm={setActiveForm}
        handleLoginSuccess={handleLoginSuccess}
        handleRegisterSuccess={handleRegisterSuccess}
      />
    </div>
  );
};

export default Accueil;
