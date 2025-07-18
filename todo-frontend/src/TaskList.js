import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({ name: '', description: '' });
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = () => {
    fetch('http://localhost:8000/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate('/login');
        }
        return res.json();
      })
      .then((data) => setTasks(data))
      .catch((err) => console.error('Erreur de chargement des tâches:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => fetchTasks())
      .catch((err) => console.error('Erreur lors de la suppression:', err));
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setUpdatedTask({ name: task.name, description: task.description });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateSubmit = (id) => {
    fetch(`http://localhost:8000/api/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedTask),
    })
      .then(() => {
        setEditingTaskId(null);
        fetchTasks();
      })
      .catch((err) => console.error('Erreur lors de la mise à jour:', err));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Liste des tâches</h2>
      <button onClick={() => navigate('/add')} style={{ marginBottom: '20px' }}>
        Ajouter une tâche
      </button>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc' }}>
            {editingTaskId === task.id ? (
              <div>
                <input
                  type="text"
                  name="name"
                  value={updatedTask.name}
                  onChange={handleUpdateChange}
                  placeholder="Nom"
                  style={{ width: '100%', marginBottom: '5px' }}
                />
                <input
                  type="text"
                  name="description"
                  value={updatedTask.description}
                  onChange={handleUpdateChange}
                  placeholder="Description"
                  style={{ width: '100%', marginBottom: '5px' }}
                />
                <button onClick={() => handleUpdateSubmit(task.id)}>Enregistrer</button>
                <button onClick={() => setEditingTaskId(null)} style={{ marginLeft: '10px' }}>
                  Annuler
                </button>
              </div>
            ) : (
              <div>
                <strong>{task.name}</strong>
                <p>{task.description}</p>
                <button onClick={() => handleEdit(task)}>Modifier</button>
                <button onClick={() => handleDelete(task.id)} style={{ marginLeft: '10px' }}>
                  Supprimer
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
