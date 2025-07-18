import React from 'react';

function TaskItem({ task, onDelete, onComplete, onModify }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'higher': return 'from-red-500 to-red-600';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'lower': return 'from-green-500 to-green-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'higher': return 'bg-red-100/80';
      case 'medium': return 'bg-yellow-100/80';
      case 'lower': return 'bg-green-100/80';
      default: return 'bg-gray-100/80';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'higher': return 'Haute';
      case 'medium': return 'Moyenne';
      case 'lower': return 'Basse';
      default: return priority;
    }
  };

  return (
    <div className={`relative group mb-4 transition-all duration-500 ${
      task.completed ? 'opacity-75 scale-98' : 'hover:scale-[1.02]'
    }`}>
      {/* Effet de glow en arrière-plan */}
      <div className={`absolute inset-0 rounded-2xl blur-xl transition-all duration-500 ${
        task.completed 
          ? 'bg-green-200/20' 
          : 'bg-white/30 group-hover:bg-white/40'
      }`}></div>
      
      {/* Carte principale */}
      <div className={`relative bg-white/25 backdrop-blur-xl border transition-all duration-500 ${
        task.completed 
          ? 'border-green-300/50 bg-green-50/20' 
          : 'border-white/40 hover:border-white/60'
      } rounded-2xl p-6 shadow-lg hover:shadow-xl`}>
        
        {/* Indicateur de statut */}
        <div className={`absolute top-4 left-4 w-3 h-3 rounded-full ${
          task.completed 
            ? 'bg-green-500 animate-pulse' 
            : 'bg-blue-500'
        }`}></div>
        
        <div className="flex justify-between items-start">
          {/* Informations de la tâche */}
          <div className="flex-1 pl-6">
            <h3 className={`text-lg font-semibold mb-2 transition-all duration-300 ${
              task.completed 
                ? 'text-gray-500 line-through' 
                : 'text-gray-800'
            }`}>
              {task.name}
            </h3>
            
            <p className="text-gray-600 mb-3 text-sm leading-relaxed">
              {task.description}
            </p>
            
            <div className="flex items-center gap-3 mb-3">
              <small className="text-gray-500 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {task.end_date || 'Pas de date'}
              </small>
              
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${getPriorityBg(task.priority)}`}>
                <span className={`w-2 h-2 rounded-full mr-2 bg-gradient-to-r ${getPriorityColor(task.priority)}`}></span>
                {getPriorityText(task.priority)}
              </span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col gap-2 ml-4">
            {!task.completed && (
              <button
                onClick={() => onComplete(task.id)}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Terminer
              </button>
            )}
            
            {!task.completed && (
              <button
                onClick={() => onModify(task.id)}
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-medium rounded-xl hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Modifier
              </button>
            )}
            
            <button
              onClick={() => onDelete(task.id)}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;