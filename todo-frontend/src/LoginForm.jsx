import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Appel préalable à /sanctum/csrf-cookie
      await fetch("http://localhost:8000/sanctum/csrf-cookie", {
        credentials: "include",
      });

      // 2. Envoi de la requête de connexion
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include", // Nécessaire avec Sanctum
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        // 3. Appelle onLogin pour stocker le "token" fictif (ou flag connecté)
        onLogin("connected"); // ou data.user si tu veux récupérer un nom, ID, etc.

        // 4. Redirige vers les tâches
        navigate("/tasks");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Échec de la connexion.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur réseau.");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Se connecter</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <p>Pas encore inscrit ? <Link to="/register">Créer un compte</Link></p>
    </div>
  );
}

export default LoginForm;
