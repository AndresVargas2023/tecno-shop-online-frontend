import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './components.css';

function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false); // Controla si se muestra el formulario de verificación
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        name,
        surname,
        email,
        password,
        confirmPassword,
      });

      console.log(response.data.message); // Mostrar mensaje solo en consola
      setError('');
      setIsRegistered(true); // Mostrar el formulario de verificación
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al crear el usuario');
      } else {
        setError('Error al crear el usuario');
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify`, {
        email,
        code: verificationCode,
      });

      setError('');
      console.log(response.data.message); // Mostrar mensaje solo en consola

      // Realizar login automático después de la verificación
      await handleLogin();
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al verificar el código');
      } else {
        setError('Error al verificar el código');
      }
    }
  };

  const handleLogin = async () => {
    try {
      const loginResponse = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('token', loginResponse.data.token); // Guardar token
      navigate('/'); // Redirigir a la página principal
    } catch (err) {
      setError('Error al iniciar sesión automáticamente. Por favor, inicia sesión manualmente.');
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Crear Usuario</h2>
      {isRegistered ? (
        <div className="verification-form">
          <h3 className="verification-message">Se ha enviado un correo con el código de verificación, por favor verifica tu correo.</h3>
          <form onSubmit={handleVerify} className="form-verify">
            <input
              className="input-field"
              type="text"
              placeholder="Código de verificación"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
            />
            <button type="submit" className="submit-button">Verificar Código</button>
          </form>
        </div>
      ) : (
        <form onSubmit={handleRegister} className="register-form">
          <input
            className="input-field"
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="text"
            placeholder="Apellido"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-button">Crear Usuario</button>
        </form>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Register;
