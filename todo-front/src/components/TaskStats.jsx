import React from 'react';

function TaskStats({ total, completed, highPriority }) {
  return (
    <div className="flex justify-between gap-4 mb-8">
      {/* Tâches totales */}
      <div className="flex-1 relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/40 to-orange-300/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full animate-pulse"></div>
          <div className="text-3xl font-bold text-orange-600 mb-2 bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent">
            {total}
          </div>
          <div className="text-sm font-medium text-gray-700">
            Tâches totales
          </div>
          <div className="mt-3 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Tâches terminées */}
      <div className="flex-1 relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-green-200/40 to-green-300/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-br from-green-400 to-green-600 rounded-full animate-pulse"></div>
          <div className="text-3xl font-bold text-green-600 mb-2 bg-gradient-to-br from-green-600 to-green-700 bg-clip-text text-transparent">
            {completed}
          </div>
          <div className="text-sm font-medium text-gray-700">
            Terminées
          </div>
          <div className="mt-3 w-full h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Priorité haute */}
      <div className="flex-1 relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-red-200/40 to-red-300/40 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
        <div className="relative bg-white/30 backdrop-blur-xl border border-white/40 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-pulse"></div>
          <div className="text-3xl font-bold text-red-600 mb-2 bg-gradient-to-br from-red-600 to-red-700 bg-clip-text text-transparent">
            {highPriority}
          </div>
          <div className="text-sm font-medium text-gray-700">
            Priorité haute
          </div>
          <div className="mt-3 w-full h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
}

export default TaskStats;