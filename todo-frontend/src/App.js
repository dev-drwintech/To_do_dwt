import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddTask from './AddTask';
import TaskList from './TaskList';

function App() {
  return (
    <Router>
      <nav style={{ padding: '10px' }}>
        <Link to="/tasks" style={{ marginRight: '10px' }}>Liste des tâches</Link>
        <Link to="/add">Ajouter une tâche</Link>
      </nav>
      <Routes>
        <Route path="/add" element={<AddTask />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </Router>
  );
}

export default App;
