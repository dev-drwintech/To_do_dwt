import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TodoApp() {
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;

    fetch('http://localhost:8000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newName,
        description: newDescription,
      }),
    })
      .then(() => {
        setNewName('');
        setNewDescription('');
        navigate('/');
      })
      .catch((err) => console.error('Erreur lors de la création:', err));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Ajouter une tâche</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom de la tâche"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          required
        />
        <textarea
          placeholder="Description de la tâche"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>
          Ajouter
        </button>
      </form>
    </div>
  );
}

export default TodoApp;
