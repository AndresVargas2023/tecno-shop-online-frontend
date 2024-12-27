import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import './components.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');  // Estado para almacenar el código de recuperación
  const [newPassword, setNewPassword] = useState('');  // Estado para la nueva contraseña
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);  // Paso actual (1 para enviar código, 2 para ingresar código y nueva contraseña)
  const [loading, setLoading] = useState(false);  // Estado para la carga mientras se espera la respuesta
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL; // Usar la variable de entorno para la URL base

  const handleRequestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/request-password-reset`, { email });
      setMessage('Se ha enviado un código de recuperación a tu correo electrónico');
      setStep(2);  // Cambiar a la segunda parte del proceso
      setLoading(false);
    } catch (err) {
      setError('Hubo un problema al enviar el código. Intenta de nuevo.');
      setLoading(false);
    }
  };

  const handleSubmitResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Verificar código de recuperación
      const verifyResponse = await axios.post(`${API_URL}/auth/verify-password-reset-code`, { 
        email,  // Se incluye el correo para verificar el código en el backend
        code 
      });

      if (verifyResponse.status === 200) {
        // Verificar código exitoso, ahora restablecer la contraseña
        const resetResponse = await axios.post(`${API_URL}/auth/reset-password`, {
          token: code,  // Token que se envía en el cuerpo
          newPassword  // Nueva contraseña
        });

        // Si la contraseña se restablece exitosamente
        setMessage('Tu contraseña ha sido restablecida exitosamente');
        setLoading(false);

        // Redirigir al login después de un exitoso restablecimiento de contraseña
        navigate('/login');
      }
    } catch (err) {
      setError('Hubo un problema al restablecer tu contraseña. Intenta de nuevo.');
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <Box className="login-container">
      <Box className="login-box">
        <Typography variant="h5" gutterBottom>
          {step === 1 ? 'Recuperar Contraseña' : 'Restablecer Contraseña'}
        </Typography>

        {step === 1 ? (
          // Paso 1: Solicitar el código
          <form onSubmit={handleRequestCode}>
            <TextField
              label="Correo electrónico"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ marginTop: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Enviar Código'}
            </Button>
          </form>
        ) : (
          // Paso 2: Ingresar código y nueva contraseña
          <form onSubmit={handleSubmitResetPassword}>
            <TextField
              label="Código de recuperación"
              variant="outlined"
              fullWidth
              margin="normal"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
            <TextField
              label="Nueva Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ marginTop: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Restablecer Contraseña'}
            </Button>
          </form>
        )}

        {message && <Typography color="success.main" sx={{ marginTop: 2 }}>{message}</Typography>}
        {error && <Typography color="error.main" sx={{ marginTop: 2 }}>{error}</Typography>}

        <Box sx={{ textAlign: 'center', marginTop: 3 }}>
          <Button onClick={handleBackToLogin} color="secondary">
            Volver al login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
