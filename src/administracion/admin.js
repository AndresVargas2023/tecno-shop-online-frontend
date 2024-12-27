import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate
import './admin.css';  // Importa el archivo CSS

function Admin() {
  const navigate = useNavigate();  // Inicializa el hook de navegación
  const [role, setRole] = useState(null);  // Estado para almacenar el rol del usuario

  // Obtener el rol del usuario al cargar el componente
  useEffect(() => {
    const userRole = localStorage.getItem('userRole'); // Obtenemos el rol desde localStorage
    console.log('Rol obtenido desde localStorage:', userRole);  // Log para depurar

    // Si no hay rol o el rol es 'usuario', redirigir al login o página de inicio
    if (!userRole || userRole === 'user') {
      console.log('Acceso no autorizado, redirigiendo...');
      navigate('/');  // Redirige al inicio si el rol es 'usuario'
      return;  // Evita la carga del resto del componente si no es admin o moderator
    }

    // Si el rol existe y es adecuado (admin o moderator), establecerlo en el estado
    setRole(userRole);  // Establecemos el rol en el estado
  }, [navigate]);

  return (
    <div className="admin-container">
      <h1 className="admin-header">Panel de Administración</h1>
      <p className="admin-description">
        Bienvenido al panel de administración de TecnoShop. Aquí podrás gestionar productos, usuarios y más.
      </p>

      <div className="admin-options">
        <h2>Opciones de Administración</h2>
        <div className="admin-buttons">
          {/* Botones para gestionar productos */}
          <button
            className="admin-button"
            onClick={() => navigate('/admin/products')}
          >
            Ver Productos
          </button>
          <button
            className="admin-button"
            onClick={() => navigate('/admin/products/add')}
          >
            Agregar Productos
          </button>

          {/* Mostrar el botón de Administrar Usuarios solo si el rol es 'moderator' */}
          {role === 'moderator' && (
            <button
              className="admin-button"
              onClick={() => navigate('/admin/users')}  // Redirige a la nueva ruta
            >
              Administrar Usuarios
            </button>
          )}

          {/* Si el rol no es 'moderator', se muestra este mensaje */}
          {role && role !== 'moderator' && (
            <p>No tienes permisos para administrar usuarios.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Admin;
