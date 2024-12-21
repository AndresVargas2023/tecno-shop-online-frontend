import React from 'react';
import './admin.css';  // Importa el archivo CSS

function Admin() {
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
          <button className="admin-button" onClick={() => window.location.href = "/admin/products"}>
            Ver Productos
          </button>
          <button className="admin-button" onClick={() => window.location.href = "/admin/products/add"}>
            Agregar Productos
          </button>
          <button className="admin-button" onClick={() => window.location.href = "/admin/products/edit"}>
            Modificar Productos
          </button>
        </div>

        {/* Opciones para gestionar usuarios */}
        <div className="admin-users">
          <h3>Gestionar Usuarios</h3>
          <ul>
            <li><a href="/admin/users" className="admin-link">Ver Usuarios</a></li>
            <li><a href="/admin/users/add" className="admin-link">Agregar Usuario</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Admin;
