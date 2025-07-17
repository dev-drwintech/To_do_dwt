import React, { useEffect, useState } from 'react';
import '../src/css/TodoApp';
function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('http://localhost:8000/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Erreur de chargement des tâches:', err));
  };

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
      fetchTasks();
    })
    .catch(err => console.error('Erreur lors de la création:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: 'DELETE',
    })
    .then(() => fetchTasks())
    .catch(err => console.error('Erreur lors de la suppression:', err));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Liste des tâches</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom de la tâche"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <textarea
          placeholder="Description de la tâche"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px', co }}>Ajouter</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ margin: '10px 0', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
            <strong>{task.name}</strong>
            <p>{task.description}</p>
            <button
              onClick={() => handleDelete(task.id)}
              style={{ marginTop: '5px', padding: '4px 8px' }}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
