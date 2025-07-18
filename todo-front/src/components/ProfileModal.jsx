import React, { useState } from 'react';
import { FaUser, FaUserTie, FaTimes, FaSave } from 'react-icons/fa';

function ProfileModal({ profile, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: profile.name || '',
    gender: profile.gender || 'male',
    role: profile.role || '',
    email: profile.email || '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Le nom est obligatoire");
      return;
    }

    if (!formData.email.trim()) {
      alert("L'email est obligatoire");
      return;
    }

    if (formData.password || formData.password_confirmation) {
      if (formData.password !== formData.password_confirmation) {
        alert("Les mots de passe ne correspondent pas.");
        return;
      }
    }

    const dataToSubmit = { ...formData };
    if (!dataToSubmit.password) {
      delete dataToSubmit.password;
      delete dataToSubmit.password_confirmation;
    }

    onSubmit(dataToSubmit);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-8 max-w-lg w-5/6 max-h-[80vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-100">
          <h2 className="text-2xl font-bold text-red-600">Gestion du profil</h2>
          <button 
            className="text-gray-400 hover:text-red-600 hover:bg-gray-100 p-2 rounded-full transition-all"
            onClick={onClose}
            type="button"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-4 shadow-lg">
            {formData.gender === 'female' ? <FaUser /> : <FaUserTie />}
          </div>
          <div className="text-xl font-bold text-gray-800 mb-2">{formData.name || 'Nom utilisateur'}</div>
          <div className="text-gray-600">{formData.role}</div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">
              Nom d'utilisateur
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Entrez votre nom"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Entrez votre email"
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-2">
              Rôle
            </label>
            <input
              id="role"
              name="role"
              type="text"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="Votre rôle ou titre"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
              Nouveau mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Laissez vide pour ne pas changer"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-bold text-gray-700 mb-2">
              Confirmer le mot de passe
            </label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={formData.password_confirmation}
              onChange={handleInputChange}
              placeholder="Confirmez le nouveau mot de passe"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-4">
              Choisissez votre avatar
            </label>
            <div className="flex gap-4 justify-center">
              <div
                className={`flex flex-col items-center gap-2 cursor-pointer p-4 rounded-xl border-2 transition-all min-w-[120px] ${
                  formData.gender === 'male' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-300 bg-white hover:border-orange-500 hover:bg-orange-50'
                }`}
                onClick={() => handleGenderSelect('male')}
              >
                <div className={`text-3xl transition-colors ${
                  formData.gender === 'male' ? 'text-orange-500' : 'text-gray-400'
                }`}>
                  <FaUserTie />
                </div>
                <span className={`font-bold transition-colors ${
                  formData.gender === 'male' ? 'text-orange-500' : 'text-gray-400'
                }`}>
                  Homme
                </span>
              </div>

              <div
                className={`flex flex-col items-center gap-2 cursor-pointer p-4 rounded-xl border-2 transition-all min-w-[120px] ${
                  formData.gender === 'female' 
                    ? 'border-orange-500 bg-orange-50' 
                    : 'border-gray-300 bg-white hover:border-orange-500 hover:bg-orange-50'
                }`}
                onClick={() => handleGenderSelect('female')}
              >
                <div className={`text-3xl transition-colors ${
                  formData.gender === 'female' ? 'text-orange-500' : 'text-gray-400'
                }`}>
                  <FaUser />
                </div>
                <span className={`font-bold transition-colors ${
                  formData.gender === 'female' ? 'text-orange-500' : 'text-gray-400'
                }`}>
                  Femme
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-gray-600 transition-all hover:-translate-y-0.5"
            >
              Annuler
            </button>
            <button 
              type="submit"
              className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-orange-600 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <FaSave />
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileModal;
