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
import './admin.css';  // Importa el archivo CSS

function EditUser() {
  const { userId } = useParams();
  const [user, setUser] = useState({
    name: '',
    surname: '',
    email: '',
    address: '',
    dpt: '',
    city: '',
    barrio: '',
    phoneNumber: '',
    role: '',
    password: ''
  });
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/users/${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos del usuario');
        setLoading(false);
      }
    };

    const fetchDepartments = async () => {
      try {
        const response = await axios.get('https://api.delpi.dev/api/departamentos');
        setDepartments(response.data.data || []);
      } catch (err) {
        console.error('Error fetching departments:', err);
      }
    };

    fetchUser();
    fetchDepartments();
  }, [userId, API_URL]);

  useEffect(() => {
    if (user.dpt) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(`https://api.delpi.dev/api/ciudades/${user.dpt}`);
          setCities(response.data);
        } catch (err) {
          console.error('Error fetching cities:', err);
        }
      };

      fetchCities();
    }
  }, [user.dpt]);

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
      <Typography variant="h4" gutterBottom align="center">
        Editar Usuario
      </Typography>
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
            <FormControl fullWidth required>
              <InputLabel>Departamento</InputLabel>
              <Select
                name="dpt"
                value={user.dpt}
                onChange={handleChange}
              >
                <MenuItem value="" disabled>Selecciona un departamento</MenuItem>
                {departments.map((department) => (
                  <MenuItem key={department.id} value={department.id}>
                    {department.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Ciudad</InputLabel>
              <Select
                name="city"
                value={user.city}
                onChange={handleChange}
              >
                <MenuItem value="" disabled>Selecciona una ciudad</MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.id}>
                    {city.nombre}
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
