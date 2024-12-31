import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";

const ResetPassword = () => {
  const { token } = useParams(); // Token obtenido desde la URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(null); // Estado para verificar si el token es válido
  const navigate = useNavigate();

  // Verificar el token cuando el componente se monta
  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Llamada a la API para verificar el token
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/verify-link/${token}`
        );
        setIsTokenValid(true); // El token es válido
      } catch (err) {
        setError("Token inválido o ha expirado.");
        setIsTokenValid(false); // El token es inválido o ha expirado
        setMessage("");
        setTimeout(() => {
          // Redirigir al login si el token no es válido o ha expirado
          navigate("/login");
        }, 2000);
      }
    };
    verifyToken();
  }, [token, navigate]);

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Llamada a la API para restablecer la contraseña
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/reset-password`,
        {
          token,
          newPassword,
        }
      );

      // Guardar el token de sesión en localStorage
      const { token: newToken, message: successMessage, role, name, surname, userId } = response.data;
      localStorage.setItem("token", newToken);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", name);
      localStorage.setItem("userSurname", surname);
      localStorage.setItem("userId", userId);

      setMessage(successMessage);
      setError("");

      // Emitir evento de autenticación
      window.dispatchEvent(new Event("authChange"));

      // Redirigir a la página principal
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error al restablecer la contraseña.");
      setMessage("");
    }
  };

  // Si el token no es válido, no mostrar el formulario
  if (isTokenValid === null) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isTokenValid === false) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Restablecer Contraseña
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
        <TextField
          fullWidth
          label="Nueva Contraseña"
          type="password"
          variant="outlined"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          margin="normal"
        />
        <TextField
          fullWidth
          label="Confirmar Contraseña"
          type="password"
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Restablecer
        </Button>
      </form>
      {message && (
        <Typography variant="body1" color="success" sx={{ marginTop: 2 }}>
          {message}
        </Typography>
      )}
      {error && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default ResetPassword;
