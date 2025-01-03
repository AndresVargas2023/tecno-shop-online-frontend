import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../components.css'; // Importa tus estilos

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL; // Usar la variable de entorno

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud de inicio de sesión
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data; // Asegúrate de que el backend esté enviando el objeto `user` con todos los datos

      // Guardar todos los datos en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userSurname', user.surname);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userId', user.userId);
      localStorage.setItem('userAddress', user.address);
      localStorage.setItem('userDpt', user.dpt);
      localStorage.setItem('userCity', user.city);
      localStorage.setItem('userBarrio', user.barrio);
      localStorage.setItem('userPhoneNumber', user.phoneNumber);

      // Emitir evento personalizado para notificar cambios de autenticación
      window.dispatchEvent(new Event('authChange'));

      // Redirección basada en el rol
      if (user.role === 'admin' || user.role === 'moderator') {
        navigate('/admin'); // Redirigir a la página de administrador
      } else {
        navigate('/'); // Otra ruta para usuarios normales
      }
    } catch (err) {
      // Mostrar el mensaje de error dependiendo de la respuesta
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al iniciar sesión');
      } else {
        setError('Error al iniciar sesión');
      }
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
        {error && <p className="error-message">{error}</p>} {/* Mostrar el mensaje de error */}
        <div className="forgot-link-container">
          <Link to="/request-password-reset" className="forgot-link">
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
