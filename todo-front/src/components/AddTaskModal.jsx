import React, { useState } from 'react';

function AddTaskModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    priority: 'medium',
    end_date: '',
  });

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    onClose();
    setForm({ name: '', description: '', priority: 'medium', end_date: '' });
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-300">
        {/* Header avec effet glassmorphique */}
        <div className="relative mb-8">
          <div className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full blur-xl"></div>
          <h2 className="text-2xl font-bold text-gray-800 relative z-10">
            Ajouter une tâche
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-2"></div>
        </div>

        <div className="space-y-6">
          {/* Nom de la tâche */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la tâche
            </label>
            <input
              type="text"
              name="name"
              placeholder="Entrez le nom de la tâche"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-500 group-hover:bg-white/70"
            />
          </div>

          {/* Description */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Décrivez la tâche (optionnel)"
              value={form.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 placeholder-gray-500 resize-none group-hover:bg-white/70"
            />
          </div>

          {/* Priorité */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priorité
            </label>
            <div className="relative">
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer group-hover:bg-white/70"
              >
                <option value="lower">🟢 Basse</option>
                <option value="medium">🟡 Moyenne</option>
                <option value="height">🔴 Élevée</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Date d'échéance */}
          <div className="group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date d'échéance
            </label>
            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 group-hover:bg-white/70"
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 bg-gray-200/80 backdrop-blur-sm text-gray-700 rounded-xl font-medium hover:bg-gray-300/80 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTaskModal;

// Composant de démonstration
// export default function TaskModalDemo() {
//   const [showModal, setShowModal] = useState(false);

//   const handleSubmit = async (formData) => {
//     console.log('Données soumises:', formData);
//     // Simuler une requête API
//     await new Promise(resolve => setTimeout(resolve, 500));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
//       <div className="text-center">
//         <h1 className="text-3xl font-bold text-gray-800 mb-8">
//           Modal de Tâche - Design Glassmorphique
//         </h1>
//         <button
//           onClick={() => setShowModal(true)}
//           className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
//         >
//           Ouvrir la Modal
//         </button>
//       </div>

//       {showModal && (
//         <AddTaskModal
//           onClose={() => setShowModal(false)}
//           onSubmit={handleSubmit}
//         />
//       )}
//     </div>
//   );
// }