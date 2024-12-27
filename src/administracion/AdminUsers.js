import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Para hacer la petición HTTP
import { useNavigate } from 'react-router-dom'; // Para redirigir a la página de edición

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL; // Usar la variable de entorno

  // Cargar la lista de usuarios cuando el componente se monta
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/users`); // Usar la variable de entorno para la URL
        setUsers(response.data);
      } catch (err) {
        setError('Error al cargar los usuarios.');
      }
    };

    fetchUsers();
  }, [API_URL]);

  // Eliminar usuario
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${API_URL}/auth/users/${userId}`); // Usar la variable de entorno para la URL
      setUsers(users.filter((user) => user._id !== userId)); // Eliminar el usuario de la lista local
      alert('Usuario eliminado correctamente');
    } catch (err) {
      setError('Error al eliminar el usuario.');
    }
  };

  // Editar usuario
  const handleEdit = (userId) => {
    navigate(`/admin/users/edit/${userId}`); // Redirigir a la página de edición
  };

  return (
    <div className="admin-users-container">
      <h1 className="admin-users-header">Lista de Usuarios</h1>

      {error && <p className="error-message">{error}</p>}

      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo Electrónico</th>
            <th>Dirección</th>
            <th>Rol</th>
            <th>Acciones</th> {/* Nueva columna para los botones */}
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.email}</td>
                <td>{user.address || 'No disponible'}</td>
                <td>{user.role || 'No asignado'}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEdit(user._id)}>
                    Editar
                  </button>
                  <button className="delete-button" onClick={() => handleDelete(user._id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No se encontraron usuarios.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
