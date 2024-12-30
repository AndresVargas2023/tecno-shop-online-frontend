import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Typography } from '@mui/material';
import './components.css';

function Register() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para manejar "Procesando..."
  const [isVerifying, setIsVerifying] = useState(false); // Estado para manejar "Verificando..."
  const navigate = useNavigate();

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

  const handleVerify = async (e) => {
    e.preventDefault();

    setIsVerifying(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify`, {
        email,
        code: verificationCode,
      });

      setError('');
      console.log(response.data.message);

      await handleLogin();
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Error al verificar el código');
      } else {
        setError('Error al verificar el código');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogin = async () => {
    try {
      const loginResponse = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        email,
        password,
      });

      localStorage.setItem('token', loginResponse.data.token);
      localStorage.setItem('userRole', loginResponse.data.role);
      localStorage.setItem('userName', loginResponse.data.name);
      localStorage.setItem('userSurname', loginResponse.data.surname);

      // Emitir evento de autenticación
      window.dispatchEvent(new Event('authChange'));

      navigate('/');
    } catch (err) {
      setError('Error al iniciar sesión automáticamente. Por favor, inicia sesión manualmente.');
    }
  };

  return (
    <div className="register-container">
      <Typography variant="h4" className="register-title">Crear Usuario</Typography>
      {isRegistered ? (
        <div className="verification-form">
          <Typography variant="h6" className="verification-message">
            Se ha enviado un correo con el código de verificación, por favor verifica tu correo.
          </Typography>
          <form onSubmit={handleVerify} className="form-verify">
            <TextField
              className="input-field"
              type="text"
              label="Código de verificación"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isVerifying}
              fullWidth
            >
              {isVerifying ? <CircularProgress size={24} /> : 'Verificar Código'}
            </Button>
          </form>
        </div>
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

      {(isLoading || isVerifying) && (
        <Typography variant="body1" color="textSecondary" className="loading-message">
          Por favor, espere, esto puede tardar un momento...
        </Typography>
      )}

      {error && <Typography variant="body2" color="error" className="error-message">{error}</Typography>}
    </div>
  );
}

export default Register;
