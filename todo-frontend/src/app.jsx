// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './LoginForm.jsx';      // Assure-toi que ce fichier existe bien
import Register from './Register.jsx';
import TaskList from './TaskList.js';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Composant pour protéger les routes qui nécessitent d'être connecté
  const RequireAuth = ({ children }) => {
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div>
        <h1>Ma ToDo App</h1>
        {token && <button onClick={handleLogout}>Déconnexion</button>}

        <Routes>
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<RequireAuth><TaskList /></RequireAuth>} />
          {/* Redirige toute autre route vers /tasks si connecté, sinon vers /login */}
          <Route path="*" element={<Navigate to={token ? "/tasks" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
