import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8000/api/tasks'; // à adapter selon ton URL

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔄 Récupérer toutes les tâches
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

  // ✅ Ajouter une tâche
  const addTask = async () => {
    if (!taskName.trim()) return;
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: taskName,
          description: description,
        }),
      });

      if (response.ok) {
        setTaskName('');
        setDescription('');
        fetchTasks();
      } else {
        console.error('Erreur lors de l’ajout');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  };

  // ❌ Supprimer une tâche
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchTasks();
      } else {
        console.error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  };

  // ✅ Marquer une tâche comme terminée
  const markTaskCompleted = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/complete`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: true,
        }),
      });

      if (response.ok) {
        fetchTasks();
      } else {
        console.error('Erreur lors de la mise à jour de la tâche');
      }
    } catch (error) {
      console.error('Erreur réseau', error);
    }
  };

  // 🔍 Recherche des tâches par nom
  const filteredTasks = tasks.filter((task) =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Ma Liste de Tâches</h1>

        <div className="mb-4">
          <input
            type="text"
            className="border w-full p-2 rounded"
            placeholder="Rechercher une tâche"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2 mb-4">
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
            onClick={addTask}
          >
            Ajouter
          </button>
        </div>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <ul className="space-y-2">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className="border p-3 rounded bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{task.name}</p>
                    {task.description && (
                      <p className="text-sm text-gray-600">{task.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-green-500 text-sm"
                      onClick={() => markTaskCompleted(task.id)}
                    >
                      {task.completed ? 'Terminée' : 'Terminée'}
                    </button>
                    <button
                      className="text-red-500 text-sm"
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
