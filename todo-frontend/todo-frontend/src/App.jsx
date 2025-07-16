import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8000/api/tasks';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Erreur lors du chargement des tâches', error);
    }
    setLoading(false);
  };

  const addTask = async () => {
    if (!taskName.trim()) return;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: taskName, description }),
      });

      if (response.ok) {
        setTaskName('');
        setDescription('');
        fetchTasks();
      }
    } catch (error) {
      console.error('Erreur lors de l’ajout', error);
    }
  };

  const updateTask = async () => {
    if (!taskName.trim()) return;
    try {
      const response = await fetch(`${API_URL}/${editingTask.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: taskName, description }),
      });

      if (response.ok) {
        setTaskName('');
        setDescription('');
        setEditingTask(null);
        fetchTasks();
      }
    } catch (error) {
      console.error('Erreur lors de la modification', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  const markTaskCompleted = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/toggle`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        fetchTasks();
      }
    } catch (error) {
      console.error('Erreur lors du changement de statut', error);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl bg-white p-6 rounded shadow overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Ma Liste de Tâches</h1>

        <input
          type="text"
          className="border w-full p-2 mb-4 rounded"
          placeholder="Rechercher une tâche"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="w-full space-y-2 mb-6">
          <input
            type="text"
            className="border w-full p-2 rounded"
            placeholder="Nom de la tâche"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <textarea
            className="border w-full p-2 rounded"
            placeholder="Description de la tâche"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={editingTask ? updateTask : addTask}
          >
            {editingTask ? 'Mettre à jour' : 'Ajouter'}
          </button>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <ul className="w-full space-y-2 max-h-[45vh] overflow-y-auto">
            {filteredTasks.map((task) => (
              <li key={task.id} className="border p-3 rounded bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
                      {task.name}
                    </p>
                    {task.description && (
                      <p className="text-sm text-gray-600">{task.description}</p>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-1 text-sm">
                    <button
                      className="text-green-600"
                      onClick={() => markTaskCompleted(task.id)}
                    >
                      {task.completed ? 'Terminée' : 'Marquer comme terminée'}
                    </button>
                    <button
                      className="text-yellow-600"
                      onClick={() => {
                        setEditingTask(task);
                        setTaskName(task.name);
                        setDescription(task.description);
                      }}
                    >
                      Modifier
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => deleteTask(task.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
