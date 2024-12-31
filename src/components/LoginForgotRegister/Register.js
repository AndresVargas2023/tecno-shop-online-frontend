import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import '../components.css';

function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar "Procesando..."
  const [isRegistered, setIsRegistered] = useState(false); // Estado para manejar el mensaje de registro exitoso

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
        confirmPassword,
        address,
      });

      console.log(response.data.message);
      setError('');
      setIsRegistered(true);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al crear el usuario');
      } else {
        setError('Error al crear el usuario');
      }
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
          <TextField
            className="input-field"
            label="Dirección"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            fullWidth
            margin="normal"
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

      {isLoading && (
        <Typography variant="body1" color="textSecondary" className="loading-message">
          Por favor, espere, esto puede tardar un momento...
        </Typography>
      )}

      {error && <Typography variant="body2" color="error" className="error-message">{error}</Typography>}
    </div>
  );
}

export default Register;
