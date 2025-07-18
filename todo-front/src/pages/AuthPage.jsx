import React, { useState } from 'react';
import Title from '../components/Title';
import FormInput from '../components/FormInput';
import FormOngletButton from '../components/FormOngletButton';
import ErrorOrSuccessMessages from '../components/ErrorOrSuccessMessages';
import FormButton from '../components/FormButton';
import axios from 'axios';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // États pour le formulaire de connexion
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  // États pour le formulaire d'enregistrement
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  // Gestion des changements pour la connexion
  const handleLoginChange = (e) => {
    setLoginForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Gestion des changements pour l'enregistrement
  const handleRegisterChange = (e) => {
    setRegisterForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Soumission du formulaire de connexion
  const handleLoginSubmit = async (e) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', loginForm);
      console.log('Connexion réussie:', response.data);
      setSuccess('Connexion réussie !');
      localStorage.setItem('token', response.data.token);
      window.location.href = '/dashboard';
      
    } catch (err) {
      setError('Erreur de connexion. Vérifiez vos identifiants.');
      console.error('Erreur de connexion:', err);
    } finally {
      setLoading(false);
    }
  };

  // Soumission du formulaire d'enregistrement
  const handleRegisterSubmit = async (e) => {

    // Validation des mots de passe
    if (registerForm.password !== registerForm.password_confirmation) {
      setError('Les mots de passe ne correspondent pas.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register', registerForm);
      console.log('Enregistrement réussi:', response.data);
      setSuccess('Compte créé avec succès !');
      
      // Basculer vers la connexion après l'enregistrement
      setTimeout(() => {
        setIsLogin(true);
        setSuccess('');
      }, 2000);
      
    } catch (err) {
      setError('Erreur lors de la création du compte.');
      console.error('Erreur d\'enregistrement:', err);
    } finally {
      setLoading(false);
    }
  };

  // Basculer entre connexion et enregistrement
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setSuccess('');
    setLoginForm({ email: '', password: '' });
    setRegisterForm({ name: '', email: '', password: '', password_confirmation: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-200/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      {/* Conteneur principal */}
      <div className="relative z-10 w-full max-w-md">
        {/* Header avec logo */}
            <Title  text="Ma To do List"/>

        {/* Formulaire principal */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 backdrop-blur-xl rounded-3xl blur-xl"></div>
          <div className="relative bg-white/25 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8">
            
            {/* Onglets */}
            <div className="flex mb-8">
                <FormOngletButton type="login" isLogin={isLogin} setIsLogin={setIsLogin} isLeft={true}/>
                <FormOngletButton type="register" isLogin={isLogin} setIsLogin={setIsLogin} isLeft={false}/>
            </div>

            {/* Messages d'erreur et de succès */}
            {error && <ErrorOrSuccessMessages  error={error} success={null}/>}
            {success && <ErrorOrSuccessMessages  success={success} error={null}/>}

            {/* Formulaire de connexion */}
            {isLogin ? (
              <div className="space-y-6">
                <FormInput label="Email" type="email" name="email" value={loginForm.email} onChange={handleLoginChange} placeholder="votre@email.com" required={true} />
                <FormInput label="Mot de passe" type="password" name="password" value={loginForm.password} onChange={handleLoginChange} placeholder="••••••••" required={true} />
                <FormButton onClick={handleLoginSubmit} loading={loading} loadingText="Connexion..." buttonLabel="Se connecter"/>
              </div>
            ) : (
              /* Formulaire d'inscription */
              <div className="space-y-6">
                <FormInput label="Nom complet" type="text" name="name" value={registerForm.name} onChange={handleRegisterChange} placeholder="Votre nom complet" required={true} />
                <FormInput label="Email" type="email" name="email" value={registerForm.email} onChange={handleRegisterChange} placeholder="votre@email.com" required={true} />
                <FormInput label="Mot de passe" type="password" name="password" value={registerForm.password} onChange={handleRegisterChange} placeholder="••••••••" required={true} />
                <FormInput label="Confirmer le mot de passe" type="password" name="password_confirmation" value={registerForm.password_confirmation} onChange={handleRegisterChange} placeholder="••••••••" required={true} />
                <FormButton onClick={handleRegisterSubmit} loading={loading} loadingText="Création..." buttonLabel="Créer un compte"/>
              </div>
            )}

            {/* Lien de basculement */}
            <div className="mt-8 text-center">
              <button onClick={toggleMode} className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-300">
                {isLogin ? (
                  <>Pas de compte ? <span className="text-orange-600">Inscrivez-vous</span></>
                ) : (
                  <>Déjà un compte ? <span className="text-orange-600">Connectez-vous</span></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;