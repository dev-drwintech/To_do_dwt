import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Connexion from './Connexion';
import Inscription from './Inscription';

const AuthInterface = ({ 
  activeForm, 
  setActiveForm, 
  handleLoginSuccess, 
  handleRegisterSuccess 
}) => {
  return (
<div className="flex items-center justify-center w-screen h-screen bg-slate-500">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 bg-gray-700 shadow-xl rounded-2xl"
      >
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white">Bienvenue</h1>
          <p className="text-white">Accédez à votre compte</p>
        </div>

        <AnimatePresence mode="wait">
          {activeForm === null && (
            <motion.div
              key="buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <button
                onClick={() => setActiveForm('connexion')}
                className="w-full px-6 py-3 font-semibold text-white transition-colors duration-200 transform bg-blue-500 rounded-lg hover:bg-blue-600 hover:scale-105"
              >
                Se connecter
              </button>
              <button
                onClick={() => setActiveForm('inscription')}
                className="w-full px-6 py-3 font-semibold text-white transition-colors duration-200 transform bg-green-500 rounded-lg hover:bg-green-600 hover:scale-105"
              >
                S'inscrire
              </button>
            </motion.div>
          )}

          {activeForm === 'connexion' && (
            <motion.div
              key="connexion"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Connexion 
                onSuccess={handleLoginSuccess}
                onBack={() => setActiveForm(null)}
              />
            </motion.div>
          )}

          {activeForm === 'inscription' && (
            <motion.div
              key="inscription"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Inscription 
                onSuccess={handleRegisterSuccess}
                onBack={() => setActiveForm(null)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AuthInterface;
