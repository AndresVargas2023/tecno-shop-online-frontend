import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './components.css'; // Importa tus estilos

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, role } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', role);

      // Emitir evento personalizado para notificar cambios de autenticación
      window.dispatchEvent(new Event('authChange'));

      // Redirección basada en el rol
      if (role === 'admin' || role === 'moderator') {
        navigate('/admin'); // Redirigir a la página de administrador
      } else {
        navigate('/'); // Otra ruta para usuarios normales
      }
    } catch (err) {
      setError('Credenciales incorrectas');
      console.error("Error al iniciar sesión:", err); // Para depurar
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        <div className="forgot-link-container">
          <Link to="/forgot-password" className="forgot-link">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="register-link">
          <button onClick={handleRegister} className="register-button">
            ¿No tienes cuenta? Regístrate
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
