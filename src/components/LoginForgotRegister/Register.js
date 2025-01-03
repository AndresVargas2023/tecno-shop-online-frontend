import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import '../components.css';

function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [barrio, setBarrio] = useState('');
  const [dpt, setDpt] = useState(''); // id del departamento
  const [dptName, setDptName] = useState(''); // nombre del departamento
  const [city, setCity] = useState(''); // id de la ciudad
  const [cityName, setCityName] = useState(''); // nombre de la ciudad
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [departments, setDepartments] = useState([]); // Estado para departamentos
  const [cities, setCities] = useState([]); // Estado para ciudades

  useEffect(() => {
    fetch('https://api.delpi.dev/api/departamentos')
      .then((response) => response.json())
      .then((data) => setDepartments(data.data || []))
      .catch((error) => console.error('Error fetching departments:', error));
  }, []);

  useEffect(() => {
    if (dpt) {
      fetch(`https://api.delpi.dev/api/ciudades/${dpt}`)
        .then((response) => response.json())
        .then((data) => setCities(data))
        .catch((error) => console.error('Error fetching cities:', error));
    }
  }, [dpt]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        name,
        surname,
        email,
        password,
        barrio,
        dpt: dptName, // Enviar el nombre del departamento
        city: cityName, // Enviar el nombre de la ciudad
        phoneNumber,
      });

      console.log(response.data.message);
      setError('');
      setIsRegistered(true);
    } catch (err) {
      setError('Error al crear el usuario');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      {isRegistered ? (
        <Typography variant="h4" className="success-title">Usuario creado con éxito</Typography>
      ) : (
        <Typography variant="h4" className="register-title">Crear Usuario</Typography>
      )}

      {isRegistered ? (
        <Typography variant="h6" className="success-message">
          Se ha enviado un enlace a su correo electrónico para verificar su cuenta. Por favor, revise su bandeja de entrada.
        </Typography>
      ) : (
        <form onSubmit={handleRegister} className="register-form">
          <TextField
            className="input-field"
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            className="input-field"
            label="Apellido"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            className="input-field"
            label="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            className="input-field"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            className="input-field"
            label="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          {/* Selección de Departamento */}
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel>Selecciona tu departamento</InputLabel>
            <Select
              value={dpt}
              onChange={(e) => {
                const selectedDept = departments.find(dept => dept.id === e.target.value);
                setDpt(e.target.value);
                setDptName(selectedDept ? selectedDept.nombre : '');
              }}
              label="Selecciona tu departamento"
            >
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <MenuItem key={dept.id} value={dept.id}>
                    {dept.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em>No hay departamentos disponibles</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Selección de Ciudad */}
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel>Selecciona tu ciudad</InputLabel>
            <Select
              value={city}
              onChange={(e) => {
                const selectedCity = cities.find(city => city.id === e.target.value);
                setCity(e.target.value);
                setCityName(selectedCity ? selectedCity.nombre : '');
              }}
              label="Selecciona tu ciudad"
            >
              {cities.length > 0 ? (
                cities.map((cityItem) => (
                  <MenuItem key={cityItem.id} value={cityItem.id}>
                    {cityItem.nombre}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">
                  <em>No hay ciudades disponibles</em>
                </MenuItem>
              )}
            </Select>
          </FormControl>
          <TextField
            className="input-field"
            label="Barrio"
            value={barrio}
            onChange={(e) => setBarrio(e.target.value)}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            className="input-field"
            label="Número de Teléfono"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            fullWidth
            margin="normal"
            placeholder="09XXXXXXXX"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? <CircularProgress size={24} /> : 'Crear Usuario'}
          </Button>
        </form>
      )}

      {error && <Typography variant="body2" color="error" className="error-message">{error}</Typography>}
    </div>
  );
}

export default Register;
