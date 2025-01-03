import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  CircularProgress,
  Grid,
  Box,
  Typography
} from '@mui/material';
import './admin.css';

function EditUser() {
  const { userId } = useParams();
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    dpt: '', // Nombre del departamento
    city: '', // Nombre de la ciudad
    barrio: '',
    phoneNumber: '',
    role: '',
    password: ''
  });
  const [departments, setDepartments] = useState([]); // Lista de departamentos
  const [cities, setCities] = useState([]); // Lista de ciudades del departamento seleccionado
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  // Cargar departamentos
  useEffect(() => {
    fetch('https://api.delpi.dev/api/departamentos')
      .then((response) => response.json())
      .then((data) => setDepartments(data.data || []))
      .catch((error) => console.error('Error fetching departments:', error));
  }, []);

  // Cargar ciudades cuando el departamento cambie
  useEffect(() => {
    if (user.dpt) {
      const selectedDept = departments.find(
        (dept) => dept.nombre.toLowerCase() === user.dpt.toLowerCase()
      );
      if (selectedDept) {
        fetch(`https://api.delpi.dev/api/ciudades/${selectedDept.id}`)
          .then((response) => response.json())
          .then((data) => setCities(data))
          .catch((error) => console.error('Error fetching cities:', error));
      }
    }
  }, [user.dpt, departments]);

  // Obtener datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/users/${userId}`);
        const userData = response.data;
        setUser({
          ...userData,
          dpt: userData.dpt || '',
          city: userData.city || ''
        });
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
      const updatedUser = { ...user };
      if (!updatedUser.password) {
        delete updatedUser.password;
      }
      await axios.put(`${API_URL}/auth/users/${userId}`, updatedUser);
      alert('Usuario actualizado correctamente');
      navigate('/admin/users');
    } catch (err) {
      setError('Error al actualizar el usuario');
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <div className="edit-user-container" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Editar Usuario</Typography>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              name="name"
              value={user.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="outlined"
              fullWidth
              name="surname"
              value={user.surname}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              name="email"
              value={user.email}
              onChange={handleChange}
              readOnly
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
              <InputLabel>Selecciona tu departamento</InputLabel>
              <Select
                value={user.dpt}
                onChange={(e) => {
                  setUser((prevState) => ({
                    ...prevState,
                    dpt: e.target.value,
                    city: '' // Limpiar la ciudad al cambiar el departamento
                  }));
                }}
                label="Selecciona tu departamento"
              >
                {departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.nombre}>
                    {dept.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth style={{ marginBottom: '20px' }}>
              <InputLabel>Selecciona tu ciudad</InputLabel>
              <Select
                value={user.city}
                onChange={(e) =>
                  setUser((prevState) => ({ ...prevState, city: e.target.value }))
                }
                label="Selecciona tu ciudad"
              >
                {cities.map((cityItem) => (
                  <MenuItem key={cityItem.id} value={cityItem.nombre}>
                    {cityItem.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Barrio"
              variant="outlined"
              fullWidth
              name="barrio"
              value={user.barrio}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Número de Teléfono"
              variant="outlined"
              fullWidth
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nueva Contraseña (dejar en blanco para no cambiar)"
              variant="outlined"
              fullWidth
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Rol</InputLabel>
              <Select
                name="role"
                value={user.role}
                onChange={handleChange}
              >
                <MenuItem value="" disabled>Selecciona un rol</MenuItem>
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="user">Usuario</MenuItem>
                <MenuItem value="moderator">Moderador</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Actualizar Usuario
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default EditUser;
