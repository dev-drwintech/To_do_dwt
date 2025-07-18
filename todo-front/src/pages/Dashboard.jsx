import React, { useEffect, useState } from 'react';
import TaskItem from '../components/TaskItem';
import TaskStats from '../components/TaskStats';
import { FaPlus, FaUser, FaSignOutAlt, FaCog, FaCalendarAlt, FaClock } from 'react-icons/fa';
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';
import ProfileModal from '../components/ProfileModal';
import api from '../services/api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [userProfile, setUserProfile] = useState({
    name: localStorage.getItem('userName') || 'Utilisateur',
    email: localStorage.getItem('email') || ''
  });

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }

    fetchUserProfile();
    fetchTasks();

    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get('/me');
      const user = res.data;
      setUserProfile({
        name: user.name,
        email: user.email,
        gender: user.gender || 'male',
        role: user.role || '',
      });

      localStorage.setItem('userName', user.name);
      localStorage.setItem('email', user.email);
    } catch (err) {
      console.error('Erreur de profil', err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Erreur de chargement des tâches', err);
      if (err.response?.status === 401) handleLogout();
    }
  };

  const HandleAddTask = async (FormData) => {
    try {
      await api.post('/tasks', FormData);
      fetchTasks();
    } catch (err) {
      console.error("Erreur lors de l'ajout", err);
    }
  };

  const markAsCompleted = async (id) => {
    try {
      await api.patch(`/tasks/${id}`, { completed: true });
      fetchTasks();
    } catch (err) {
      console.error('Erreur lors de la complétion', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Erreur suppression', err);
    }
  };

  const modifyTask = (task) => {
    setEditTask(task);
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      await api.put(`/tasks/${id}`, updatedData);
      fetchTasks();
      setEditTask(null);
    } catch (err) {
      console.error('Erreur mise à jour', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    window.location.href = '/login';
  };

  const confirmLogout = () => setShowLogoutConfirm(true);

  const handleProfileUpdate = (newProfile) => {
    setUserProfile({
      name: newProfile.name,
      email: newProfile.email || userProfile.email,
    });
    localStorage.setItem('userName', newProfile.name);
    if (newProfile.email) localStorage.setItem('email', newProfile.email);
  };

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const highPriority = tasks.filter(t => t.priority === 'higher').length;

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const formatDate = (date) => date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formatTime = (date) => date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="max-w-6xl mx-auto p-0 bg-orange-50 min-h-screen">
      {/* Header */}
      <div
        className="
          p-6 mb-8 rounded-b-3xl text-white shadow-xl
          bg-gradient-to-r from-green-600/40 via-green-500/30 to-green-700/40
          animate-gradient-x
          flex flex-col md:flex-row md:justify-between md:items-center
        "
        style={{ minHeight: '120px' }}
      >
        <div className="flex items-center gap-4 mb-6 md:mb-0">
          <div
            className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl cursor-pointer border-2 border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110"
            onClick={() => setShowProfileModal(true)}
            title="Afficher le profil"
          >
            <FaUser />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold tracking-wide drop-shadow-md text-white/90">{userProfile.name}</h2>
            <h4 className="text-sm text-white/70 italic">{userProfile.email}</h4>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right select-none">
            <div className="flex items-center gap-2 text-sm opacity-80 text-white/90">
              <FaCalendarAlt />
              {formatDate(currentTime)}
            </div>
            <div className="flex items-center gap-2 text-sm opacity-80 text-white/90">
              <FaClock />
              {formatTime(currentTime)}
            </div>
          </div>

          <button
            className="btn-profile bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 text-white border border-white/30 hover:bg-white/30 hover:text-green-300 transition-all duration-300"
            onClick={() => setShowProfileModal(true)}
          >
            <FaCog />
            Profil
          </button>

          <button
            className="bg-red-700/90 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 text-white hover:bg-red-800 transition-all duration-300"
            onClick={confirmLogout}
          >
            <FaSignOutAlt />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Titre principal */}
      <h1 className="text-3xl font-bold text-center mb-8">Ma Todo List</h1>

      <div className="px-8 pb-8">
        <div className="mb-8">
          <TaskStats total={total} completed={completed} highPriority={highPriority} />
        </div>

        <div className="text-center mb-8">
          <button
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-all duration-300 flex items-center gap-2 mx-auto shadow-lg hover:-translate-y-0.5 hover:shadow-xl"
            onClick={() => setShowModal(true)}
          >
            <FaPlus /> Nouvelle tâche
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder=" Rechercher une tâche..."
            className="w-3/5 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
          >
            <option value="all">Toutes priorités</option>
            <option value="higher">Haute priorité</option>
            <option value="medium">Priorité moyenne</option>
            <option value="lower">Basse priorité</option>
          </select>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {search || priorityFilter !== 'all'
              ? 'Aucune tâche ne correspond à vos critères.'
              : 'Aucune tâche pour le moment. Créez-en une !'}
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onComplete={markAsCompleted}
              onModify={() => modifyTask(task)}
            />
          ))
        )}

        {showModal && (
          <AddTaskModal
            onClose={() => setShowModal(false)}
            onSubmit={HandleAddTask}
          />
        )}

        {editTask && (
          <EditTaskModal
            task={editTask}
            onClose={() => setEditTask(null)}
            onSubmit={handleUpdateTask}
          />
        )}

        {showProfileModal && (
          <ProfileModal
            profile={userProfile}
            onClose={() => setShowProfileModal(false)}
            onSubmit={handleProfileUpdate}
          />
        )}

        {showLogoutConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl text-center max-w-md w-5/6">
              <h3 className="text-xl font-bold mb-4">Confirmer la déconnexion</h3>
              <p className="mb-6 text-gray-600">Êtes-vous sûr de vouloir vous déconnecter ?</p>
              <div className="flex gap-4 justify-center">
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-bold"
                  onClick={handleLogout}
                >
                  Oui, déconnecter
                </button>
                <button
                  className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 font-bold"
                  onClick={() => setShowLogoutConfirm(false)}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Styles CSS */}
      <style>{`
        @keyframes gradient-x {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 20s ease infinite;
        }

        .btn-profile:hover {
          animation: profile-glow 1.5s infinite alternate;
          transform: rotate(5deg);
          box-shadow: 0 0 12px rgba(144, 238, 144, 0.7);
        }

        @keyframes profile-glow {
          from {
            box-shadow: 0 0 8px rgba(144, 238, 144, 0.5);
          }
          to {
            box-shadow: 0 0 20px rgba(144, 238, 144, 1);
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
