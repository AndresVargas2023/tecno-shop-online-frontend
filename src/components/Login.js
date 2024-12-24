import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './components.css';  // Asegúrate de tener este archivo CSS

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token } = response.data;

      // Guardar el token en el almacenamiento local
      localStorage.setItem('token', token);

      // Redirigir al panel de administración
      navigate('/admin');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  const handleRegister = () => {
    // Redirigir a la página de registro
    navigate('/Register');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <div className="input-container">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />
          </div>
          <button type="submit" className="submit-button">Iniciar sesión</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <div className="register-link">
          <button onClick={handleRegister} className="register-button">¿No tienes cuenta? Regístrate</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
