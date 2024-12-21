import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      alert('Usuario administrador creado');
      navigate('/login'); // Redirigir a la página de login después de crear el usuario
    } catch (err) {
      setError('Error al crear el usuario');
    }
  };

  return (
    <div>
      <h2>Crear Usuario Administrador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Crear Usuario</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Register;
