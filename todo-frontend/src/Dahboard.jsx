// import React, { useEffect, useState } from 'react';

// const API_URL = 'http://localhost:8000/api/tasks';

// const App = () => {
//   const [tasks, setTasks] = useState([]);
//   const [taskName, setTaskName] = useState('');
//   const [description, setDescription] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [editingTask, setEditingTask] = useState(null);

//   const fetchTasks = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(API_URL);
//       const data = await response.json();
//       setTasks(data);
//     } catch (error) {
//       console.error('Erreur lors du chargement des tâches', error);
//     }
//     setLoading(false);
//   };

//   const addTask = async () => {
//     if (!taskName.trim()) return;
//     try {
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ name: taskName, description }),
//       });

//       if (response.ok) {
//         setTaskName('');
//         setDescription('');
//         fetchTasks();
//       }
//     } catch (error) {
//       console.error('Erreur lors de l’ajout', error);
//     }
//   };

//   const updateTask = async () => {
//     if (!taskName.trim()) return;
//     try {
//       const response = await fetch(`${API_URL}/${editingTask.id}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: taskName, description }),
//       });

//       if (response.ok) {
//         setTaskName('');
//         setDescription('');
//         setEditingTask(null);
//         fetchTasks();
//       }
//     } catch (error) {
//       console.error('Erreur lors de la modification', error);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       const response = await fetch(`${API_URL}/${id}`, {
//         method: 'DELETE',
//       });

//       if (response.ok) {
//         fetchTasks();
//       }
//     } catch (error) {
//       console.error('Erreur lors de la suppression', error);
//     }
//   };

//   const markTaskCompleted = async (id) => {
//     try {
//       const response = await fetch(`${API_URL}/${id}/toggle`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (response.ok) {
//         fetchTasks();
//       }
//     } catch (error) {
//       console.error('Erreur lors du changement de statut', error);
//     }
//   };

//   const filteredTasks = tasks.filter((task) =>
//     task.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   return (
//     <div className="flex items-center justify-center w-screen h-screen p-4 bg-gray-100">
//       <div className="flex flex-col items-center justify-center w-full h-full max-w-2xl p-6 overflow-y-auto bg-white rounded shadow">
//         <h1 className="mb-6 text-3xl font-bold text-center">Ma Liste de Tâches</h1>

//         <input
//           type="text"
//           className="w-full p-2 mb-4 border rounded"
//           placeholder="Rechercher une tâche"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         <div className="w-full mb-6 space-y-2">
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             placeholder="Nom de la tâche"
//             value={taskName}
//             onChange={(e) => setTaskName(e.target.value)}
//           />
//           <textarea
//             className="w-full p-2 border rounded"
//             placeholder="Description de la tâche"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <button
//             className="w-full px-4 py-2 text-white bg-blue-500 rounded"
//             onClick={editingTask ? updateTask : addTask}
//           >
//             {editingTask ? 'Mettre à jour' : 'Ajouter'}
//           </button>
//         </div>

//         {loading ? (
//           <p>Chargement...</p>
//         ) : (
//           <ul className="w-full space-y-2 max-h-[45vh] overflow-y-auto">
//             {filteredTasks.map((task) => (
//               <li key={task.id} className="p-3 border rounded bg-gray-50">
//                 <div className="flex items-start justify-between">
//                   <div>
//                     <p className={`font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
//                       {task.name}
//                     </p>
//                     {task.description && (
//                       <p className="text-sm text-gray-600">{task.description}</p>
//                     )}
//                   </div>
//                   <div className="flex flex-col items-end space-y-1 text-sm">
//                     <button
//                       className="text-green-600"
//                       onClick={() => markTaskCompleted(task.id)}
//                     >
//                       {task.completed ? 'Terminée' : 'Marquer comme terminée'}
//                     </button>
//                     <button
//                       className="text-yellow-600"
//                       onClick={() => {
//                         setEditingTask(task);
//                         setTaskName(task.name);
//                         setDescription(task.description);
//                       }}
//                     >
//                       Modifier
//                     </button>
//                     <button
//                       className="text-red-600"
//                       onClick={() => deleteTask(task.id)}
//                     >
//                       Supprimer
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;

"use client"

import { useState, useEffect } from "react"
import {
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
  RotateCcw,
  Eye,
  EyeOff,
  ListTodo,
  Clock,
  CheckCircle2,
  TrendingUp,
  Search,
  Calendar,
  AlertCircle,
} from "lucide-react"

const TodoApp = () => {
  // ==================== ÉTATS ====================
  const [tasks, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [showCompleted, setShowCompleted] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [animatingTodos, setAnimatingTodos] = useState(new Set())
  const [sortBy, setSortBy] = useState("created")
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "en_cours",
    priority: "medium",
    category: "Personnel",
    dueDate: "",
  })

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0,
  })

  // ==================== CONFIGURATION CORRIGÉE ====================
  const API_BASE_URL =
    typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_URL
      ? process.env.NEXT_PUBLIC_API_URL
      : "http://localhost:8000/api"

  const categories = ["Personnel", "Travail", "Développement", "Santé", "Finances", "Loisirs"]
  const priorities = [
    { value: "low", label: "Faible", color: "text-green-600", bg: "bg-green-100" },
    { value: "medium", label: "Moyenne", color: "text-yellow-600", bg: "bg-yellow-100" },
    { value: "high", label: "Élevée", color: "text-red-600", bg: "bg-red-100" },
  ]

  // ==================== APPELS API CRUD (SANS RAFRAÎCHISSEMENT) ====================

  // 📖 READ - Récupérer toutes les tâches (SEULEMENT AU CHARGEMENT INITIAL)
  const fetchTodos = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()
      setTodos(data.data || data)
    } catch (error) {
      console.error("Erreur fetch tasks:", error)
      setError("Impossible de charger les tâches.")
    } finally {
      setLoading(false)
    }
  }

  // ➕ CREATE - Créer une nouvelle tâche (MISE À JOUR AUTOMATIQUE)
  const createTodo = async (todoData) => {
    try {
      setActionLoading(true)
      setError(null)

      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(todoData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()
      const newTodo = data.data || data

      // ✅ MISE À JOUR AUTOMATIQUE - Ajouter immédiatement à la liste
      setTodos((prevTodos) => [newTodo, ...prevTodos])
      animateTodo(newTodo.id)

      return true
    } catch (error) {
      console.error("Erreur create todo:", error)
      setError("Erreur lors de la création.")
      return false
    } finally {
      setActionLoading(false)
    }
  }

  // ✏️ UPDATE - Mettre à jour une tâche (MISE À JOUR AUTOMATIQUE)
  const updateTodo = async (id, todoData) => {
    try {
      setActionLoading(true)
      setError(null)

      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(todoData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()
      const updatedTodo = data.data || data

      // ✅ MISE À JOUR AUTOMATIQUE - Modifier immédiatement dans la liste
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)))
      animateTodo(id)

      return true
    } catch (error) {
      console.error("Erreur update todo:", error)
      setError("Erreur lors de la mise à jour.")
      return false
    } finally {
      setActionLoading(false)
    }
  }

  // 🗑️ DELETE - Supprimer une tâche (MISE À JOUR AUTOMATIQUE)
  const deleteTodo = async (id) => {
    try {
      setActionLoading(true)
      setError(null)

      // Animation avant suppression
      animateTodo(id)

      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`)
      }

      // ✅ MISE À JOUR AUTOMATIQUE - Supprimer immédiatement de la liste
      setTimeout(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
      }, 300) // Délai pour l'animation

      return true
    } catch (error) {
      console.error("Erreur delete todo:", error)
      setError("Erreur lors de la suppression.")
      return false
    } finally {
      setActionLoading(false)
    }
  }

  // 🔄 TOGGLE STATUS - Changer le statut (MISE À JOUR AUTOMATIQUE)
  const toggleStatus = async (id, currentStatus) => {
    try {
      setActionLoading(true)
      setError(null)

      const newStatus = currentStatus === "terminé" ? "en_cours" : "terminé"

      const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Erreur HTTP: ${response.status}`)
      }

      const data = await response.json()
      const updatedTodo = data.data || data

      // ✅ MISE À JOUR AUTOMATIQUE - Modifier le statut immédiatement
      setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)))
      animateTodo(id)

      return true
    } catch (error) {
      console.error("Erreur toggle status:", error)
      setError("Erreur lors du changement de statut.")
      return false
    } finally {
      setActionLoading(false)
    }
  }

  // ==================== HOOKS ====================
  // Chargement initial SEULEMENT
  useEffect(() => {
    fetchTodos()
  }, [])

  // Calcul automatique des statistiques à chaque changement
  useEffect(() => {
    const total = tasks.length
    const completed = tasks.filter((todo) => todo.status === "terminé").length
    const pending = total - completed
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
    setStats({ total, completed, pending, completionRate })
  }, [tasks])

  // ==================== FONCTIONS UTILITAIRES ====================
  const animateTodo = (id) => {
    setAnimatingTodos((prev) => new Set(prev).add(id))
    setTimeout(() => {
      setAnimatingTodos((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }, 600)
  }

  const handleSubmit = async () => {
    if (!formData.name.trim()) return

    const success = editingTodo ? await updateTodo(editingTodo.id, formData) : await createTodo(formData)

    if (success) {
      // Réinitialiser le formulaire
      setFormData({
        name: "",
        description: "",
        status: "en_cours",
        priority: "medium",
        category: "Personnel",
        dueDate: "",
      })
      setEditingTodo(null)
      setShowModal(false)
    }
  }

  const openEditModal = (todo) => {
    setEditingTodo(todo)
    setFormData({
      name: todo.name,
      description: todo.description || "",
      status: todo.status,
      priority: todo.priority || "medium",
      category: todo.category || "Personnel",
      dueDate: todo.dueDate || "",
    })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingTodo(null)
    setFormData({
      name: "",
      description: "",
      status: "en_cours",
      priority: "medium",
      category: "Personnel",
      dueDate: "",
    })
  }

  const filteredTodos = tasks
    .filter((todo) => showCompleted || todo.status !== "terminé")
    .filter(
      (todo) =>
        todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .filter((todo) => filterCategory === "all" || todo.category === filterCategory)
    .filter((todo) => filterPriority === "all" || todo.priority === filterPriority)
    .sort((a, b) => {
      switch (sortBy) {
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2)
        case "dueDate":
          return new Date(a.dueDate || "2099-12-31") - new Date(b.dueDate || "2099-12-31")
        case "alphabetical":
          return a.name.localeCompare(b.name)
        default:
          return new Date(b.created_at || b.createdAt) - new Date(a.created_at || a.createdAt)
      }
    })

  const getPriorityConfig = (priority) => priorities.find((p) => p.value === priority) || priorities[1]
  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date() && new Date(dueDate).toDateString() !== new Date().toDateString()
  }

  // ==================== RENDU ====================
  if (loading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-purple-200 rounded-full border-t-purple-600 animate-spin"></div>
          <p className="font-medium text-purple-200">Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* CONTENEUR PRINCIPAL PLEINE LARGEUR */}
      <div className="w-full px-4 py-0">
        {/* Erreurs */}
        {error && (
          <div className="flex items-center max-w-full p-4 mb-6 space-x-3 border bg-red-500/20 backdrop-blur-md rounded-2xl border-red-400/30">
            <AlertCircle className="flex-shrink-0 w-6 h-6 text-red-400" />
            <div>
              <p className="font-medium text-red-300">{error}</p>
              <button onClick={fetchTodos} className="text-sm text-red-200 underline hover:text-red-100">
                Réessayer
              </button>
            </div>
          </div>
        )}

        {/* Header PLEINE LARGEUR */}
        <div className="mb-4">
          <div className="w-full p-4 border shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl lg:p-6 border-white/20">
            <div className="flex flex-col items-start justify-between gap-6 xl:flex-row xl:items-center">
              <div className="flex items-center space-x-4">
                <div className="p-4 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
                  <ListTodo className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="mb-2 text-4xl font-bold text-white lg:text-6xl xl:text-7xl">Ma Todo List</h1>
                  <p className="text-lg text-purple-200">{stats.total} tâche(s) au total</p>
                </div>
              </div>

              {/* Stats RESPONSIVE */}
              <div className="flex flex-wrap gap-4 lg:gap-6">
                <div className="bg-green-500/20 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-green-400/30 min-w-[140px]">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                    <div>
                      <p className="text-sm text-green-300">Terminées</p>
                      <p className="text-xl font-bold text-white lg:text-2xl">{stats.completed}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-500/20 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-yellow-400/30 min-w-[140px]">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-yellow-400" />
                    <div>
                      <p className="text-sm text-yellow-300">En cours</p>
                      <p className="text-xl font-bold text-white lg:text-2xl">{stats.pending}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-blue-400/30 min-w-[140px]">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                    <div>
                      <p className="text-sm text-blue-300">Progression</p>
                      <p className="text-xl font-bold text-white lg:text-2xl">{stats.completionRate}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres PLEINE LARGEUR */}
        <div className="w-full p-6 mb-4 border shadow-xl bg-white/10 backdrop-blur-md rounded-2xl lg:p-8 border-white/20">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-8">
            <div className="relative xl:col-span-2 2xl:col-span-3">
              <Search className="absolute w-5 h-5 text-purple-300 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full py-3 pl-10 pr-4 text-base text-white placeholder-purple-200 transition-all border lg:py-4 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 text-base text-white transition-all border lg:py-4 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            >
              <option value="all">Toutes catégories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="text-gray-800">
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-3 text-base text-white transition-all border lg:py-4 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            >
              <option value="all">Toutes priorités</option>
              {priorities.map((priority) => (
                <option key={priority.value} value={priority.value} className="text-gray-800">
                  {priority.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 text-base text-white transition-all border lg:py-4 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            >
              <option value="created" className="text-gray-800">
                Plus récent
              </option>
              <option value="priority" className="text-gray-800">
                Priorité
              </option>
              <option value="dueDate" className="text-gray-800">
                Échéance
              </option>
              <option value="alphabetical" className="text-gray-800">
                Alphabétique
              </option>
            </select>

            <button
              onClick={() => setShowModal(true)}
              disabled={actionLoading}
              className="flex items-center justify-center px-6 py-3 space-x-2 text-base font-medium text-white transition-all duration-300 transform shadow-lg lg:py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl hover:shadow-xl hover:scale-105 disabled:opacity-50"
            >
              <Plus className="w-5 h-5" />
              <span>Ajouter</span>
            </button>
          </div>

          <div className="flex items-center mt-6 space-x-3">
            <input
              type="checkbox"
              id="showCompleted"
              checked={showCompleted}
              onChange={(e) => setShowCompleted(e.target.checked)}
              className="w-5 h-5 text-purple-600 rounded focus:ring-purple-400 focus:ring-2"
            />
            <label htmlFor="showCompleted" className="flex items-center space-x-2 text-base text-white cursor-pointer">
              {showCompleted ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
              <span>Afficher les terminées</span>
            </label>
          </div>
        </div>

        {/* Liste des tâches GRILLE RESPONSIVE PLEINE LARGEUR */}
        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-8 lg:gap-4">
          {filteredTodos.length === 0 ? (
            <div className="py-16 text-center col-span-full lg:py-24">
              <div className="max-w-2xl p-12 mx-auto border bg-white/10 backdrop-blur-md rounded-3xl lg:p-16 border-white/20">
                <ListTodo className="w-24 h-24 mx-auto mb-6 text-purple-300 lg:w-32 lg:h-32" />
                <p className="mb-2 text-2xl text-purple-200 lg:text-3xl">Aucune tâche</p>
                <p className="text-lg text-purple-300">Ajoutez votre première tâche !</p>
              </div>
            </div>
          ) : (
            filteredTodos.map((todo) => {
              const priorityConfig = getPriorityConfig(todo.priority)
              const isAnimating = animatingTodos.has(todo.id)
              const overdue = isOverdue(todo.dueDate)

              return (
                <div
                  key={todo.id}
                  className={`group relative bg-white/10 backdrop-blur-md rounded-xl p-4 lg:p-5 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 ${isAnimating ? "animate-pulse scale-110" : ""} ${todo.status === "terminé" ? "opacity-75" : ""} w-full`}
                >
                  <div
                    className={`absolute top-0 right-0 w-5 h-5 lg:w-6 lg:h-6 rounded-bl-xl ${priorityConfig.value === "high" ? "bg-red-500" : priorityConfig.value === "medium" ? "bg-yellow-500" : "bg-green-500"}`}
                  ></div>

                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {todo.status === "terminé" ? (
                          <CheckCircle2 className="flex-shrink-0 text-green-400 w-7 h-7 lg:w-8 lg:h-8" />
                        ) : (
                          <div className="flex-shrink-0 transition-colors border-2 border-purple-300 rounded-full w-7 h-7 lg:w-8 lg:h-8 group-hover:border-purple-400"></div>
                        )}
                        <div>
                          <span
                            className={`inline-block px-3 py-1 lg:px-4 lg:py-2 rounded-full text-xs lg:text-sm font-medium ${priorityConfig.bg} ${priorityConfig.color} mb-2`}
                          >
                            {priorityConfig.label}
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 text-xs text-purple-300 rounded-full lg:text-sm bg-purple-500/20 lg:px-4 lg:py-2">
                        {todo.category}
                      </span>
                    </div>

                    <h3
                      className={`text-xl lg:text-2xl font-bold mb-3 ${todo.status === "terminé" ? "line-through text-purple-300" : "text-white"} break-words`}
                    >
                      {todo.name}
                    </h3>

                    {todo.description && (
                      <p
                        className={`text-sm lg:text-base mb-4 ${todo.status === "terminé" ? "text-purple-400" : "text-purple-200"} break-words`}
                      >
                        {todo.description}
                      </p>
                    )}

                    {todo.dueDate && (
                      <div
                        className={`flex items-center space-x-2 text-sm lg:text-base ${overdue ? "text-red-400" : "text-purple-300"}`}
                      >
                        <Calendar className="w-4 h-4 lg:w-5 lg:h-5" />
                        <span className={overdue ? "font-bold" : ""}>
                          {new Date(todo.dueDate).toLocaleDateString("fr-FR")}
                          {overdue && " (En retard)"}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2 lg:space-x-3">
                    <button
                      onClick={() => toggleStatus(todo.id, todo.status)}
                      disabled={actionLoading}
                      className={`flex-1 py-3 lg:py-4 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 text-sm lg:text-base ${todo.status === "terminé" ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30" : "bg-green-500/20 text-green-400 hover:bg-green-500/30"}`}
                    >
                      {todo.status === "terminé" ? (
                        <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5" />
                      ) : (
                        <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
                      )}
                      <span className="hidden sm:inline">{todo.status === "terminé" ? "Reprendre" : "Terminer"}</span>
                    </button>
                    <button
                      onClick={() => openEditModal(todo)}
                      disabled={actionLoading}
                      className="px-4 py-3 text-blue-400 transition-all duration-300 lg:px-5 lg:py-4 bg-blue-500/20 rounded-xl hover:bg-blue-500/30 disabled:opacity-50"
                    >
                      <Edit3 className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      disabled={actionLoading}
                      className="px-4 py-3 text-red-400 transition-all duration-300 lg:px-5 lg:py-4 bg-red-500/20 rounded-xl hover:bg-red-500/30 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Modal RESPONSIVE */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 lg:p-8 w-full max-w-3xl lg:max-w-4xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center mb-6 space-x-3 lg:mb-8">
                {editingTodo ? (
                  <Edit3 className="w-8 h-8 text-blue-400 lg:w-10 lg:h-10" />
                ) : (
                  <Plus className="w-8 h-8 text-purple-400 lg:w-10 lg:h-10" />
                )}
                <h3 className="text-2xl font-bold text-white lg:text-3xl">{editingTodo ? "Modifier" : "Ajouter"}</h3>
              </div>

              <div className="space-y-6 lg:space-y-8">
                <div>
                  <label className="block mb-3 text-base font-medium text-purple-200 lg:text-lg">Nom *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-4 text-base text-white placeholder-purple-200 transition-all border lg:px-6 lg:py-5 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent lg:text-lg"
                    placeholder="Nom de la tâche"
                  />
                </div>

                <div>
                  <label className="block mb-3 text-base font-medium text-purple-200 lg:text-lg">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-4 text-base text-white placeholder-purple-200 transition-all border lg:px-6 lg:py-5 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent lg:text-lg"
                    placeholder="Description"
                    rows="4"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
                  <div>
                    <label className="block mb-3 text-base font-medium text-purple-200 lg:text-lg">Statut</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-4 text-base text-white transition-all border lg:px-6 lg:py-5 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent lg:text-lg"
                    >
                      <option value="en_cours" className="text-gray-800">
                        En cours
                      </option>
                      <option value="terminé" className="text-gray-800">
                        Terminé
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-3 text-base font-medium text-purple-200 lg:text-lg">Priorité</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-4 py-4 text-base text-white transition-all border lg:px-6 lg:py-5 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent lg:text-lg"
                    >
                      {priorities.map((priority) => (
                        <option key={priority.value} value={priority.value} className="text-gray-800">
                          {priority.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-3 text-base font-medium text-purple-200 lg:text-lg">Catégorie</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-4 text-base text-white transition-all border lg:px-6 lg:py-5 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent lg:text-lg"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="text-gray-800">
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-3 text-base font-medium text-purple-200 lg:text-lg">Échéance</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-4 py-4 text-base text-white transition-all border lg:px-6 lg:py-5 bg-white/20 backdrop-blur-sm border-white/30 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent lg:text-lg"
                  />
                </div>

                <div className="flex flex-col pt-4 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 lg:space-x-6 lg:pt-6">
                  <button
                    onClick={closeModal}
                    disabled={actionLoading}
                    className="flex-1 px-6 py-4 text-base font-medium text-white transition-all duration-300 lg:py-5 lg:px-8 bg-white/10 rounded-xl hover:bg-white/20 disabled:opacity-50 lg:text-lg"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.name.trim() || actionLoading}
                    className="flex items-center justify-center flex-1 px-6 py-4 space-x-2 text-base font-medium text-white transition-all duration-300 transform shadow-lg lg:py-5 lg:px-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed lg:text-lg"
                  >
                    {actionLoading ? (
                      <div className="w-6 h-6 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
                    ) : (
                      <>
                        {editingTodo ? (
                          <Edit3 className="w-5 h-5 lg:w-6 lg:h-6" />
                        ) : (
                          <Plus className="w-5 h-5 lg:w-6 lg:h-6" />
                        )}
                        <span>{editingTodo ? "Modifier" : "Créer"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TodoApp
