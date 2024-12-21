import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Estilos para el Navbar

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');
    // Redirige al inicio de sesión
    navigate('/login');
  };

  // Verifica si el usuario está autenticado (si hay un token)
  const isAuthenticated = localStorage.getItem('token');

  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/about">Acerca de</Link></li>
        <li><Link to="/contact">Contacto</Link></li>
        <li><Link to="/admin">Administrar</Link></li>
        
        {/* Muestra el botón de logout solo si el usuario está autenticado */}
        {isAuthenticated && (
          <li>
            <button onClick={handleLogout} className="logout-btn">Cerrar sesión 🚪</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
