import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './admin.css';  // Importa el archivo CSS

function EditUser() {
  const { userId } = useParams();
  const [user, setUser] = useState({ name: '', surname: '', email: '', address: '', role: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Inicializar el hook de navegación

  const API_URL = process.env.REACT_APP_API_URL; // Usar la variable de entorno

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/users/${userId}`); // Usar la variable de entorno para la URL
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos del usuario');
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId, API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/auth/users/${userId}`, user); // Usar la variable de entorno para la URL
      alert('Usuario actualizado correctamente');
      navigate('/admin/users'); // Redirigir a la lista de usuarios después de la actualización
    } catch (err) {
      setError('Error al actualizar el usuario');
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="edit-user-container">
      <h2>Editar Usuario</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <input
          type="text"
          name="surname"
          value={user.surname}
          onChange={handleChange}
          placeholder="Apellido"
          required
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          type="text"
          name="address"
          value={user.address}
          onChange={handleChange}
          placeholder="Dirección"
        />

        {/* Lista desplegable para el rol */}
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          required
        >
          <option value="" disabled>Selecciona un rol</option>
          <option value="admin">Administrador</option>
          <option value="user">Usuario</option>
          <option value="moderator">Moderador</option>
        </select>

        <button type="submit">Actualizar Usuario</button>
      </form>
    </div>
  );
}

export default EditUser;
