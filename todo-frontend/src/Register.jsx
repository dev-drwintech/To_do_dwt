// src/pages/Register.jsx
import React, { useState } from "react";
import { UNSAFE_ErrorResponseImpl, useNavigate } from "react-router-dom";
import api from "../src/axios.js";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.get("/sanctum/csrf-cookie");

      const response = await api.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      console.log(response)

      console.log("Inscription réussie", response.data);
      navigate("/login");
    } catch (error) {
      console.error("Erreur d'inscription", error);
      console.log(error)
      alert("Échec de l'inscription");
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          name="password_confirmation"
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        /><br />
        <button type="submit">S'inscrire</button>
        <p>Déjà inscrit ? <a href="/login">Connecte-toi ici</a></p>

      </form>
    </div>
  );
};

export default Register;
