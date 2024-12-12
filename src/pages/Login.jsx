import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/Logo.png";
import fondo from "../assets/Fondo.jpg";
import axios from "axios";

export default function Login ({ onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (isRegistering) {
      if (!formData.name || !formData.email || !formData.role || !formData.password || !formData.confirmPassword) {
        alert("Por favor, completa todos los campos.");
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return false;
      }
      if (formData.password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return false;
      }
    }
    else {
      if (!formData.email || !formData.password) {
        alert("Por favor, ingresa tu correo y contraseña.");
        return false;
      }
    }
    return true;
  };

  const createUser = async () => {
    const newUser = {
      name: formData.name,
      email: formData.email,
      role: formData.role,
      password: formData.password,
    };
    try {
      const response = await axios.post("http://localhost:3000/usuarios", newUser);
      if (response.status === 201) {
        alert("Usuario creado exitosamente");
      } else {
        alert("Error al registrar el usuario. Por favor, intenta nuevamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al intentar registrar el usuario.");
    }
  };

  const loginUser = async () => {
    const credentials = {
      email: formData.email,
      password: formData.password,
    };
  
    try {
      const response = await axios.post("http://localhost:3000/login", credentials);
      if (response.status === 200) {
        alert("Inicio de sesión exitoso");
        onLogin(response.data);
      } else {
        alert("Por favor, verifica tu correo y contraseña.");
      }
    } catch (error) {
      console.error(error);
      alert("Error al intentar iniciar sesión.");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (isRegistering) {
      createUser();
      setIsRegistering(false);
    } else {
      loginUser();
    }
  };

  return (
    <div
      className="page-container"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="login-container">
        <div className="top-left-corner">
          <Link to="/">
            <img src={logo} alt="logo" className="logo-img" />
          </Link>
        </div>
        <h1>{isRegistering ? "Registro" : "Inicio de sesión"}</h1>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
              <input
                type="text"
                name="name"
                placeholder="Nombre completo"
                value={formData.name}
                onChange={handleChange}
                required
              />
          )}
          <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleChange}
              required
            />
          {isRegistering && (
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Seleccione un rol
                </option>
                <option value="Admin">Administrador</option>
                <option value="Cliente">Cliente</option>
              </select>
          )}
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {isRegistering && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit">
            {isRegistering ? "Registrar" : "Iniciar sesión"}
          </button>
        </form>
        <p>
          {isRegistering ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}{" "}
          <span
            className="toggle-link"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Inicia sesión aquí" : "Regístrate aquí"}
          </span>
        </p>
      </div>
    </div>
  );
};