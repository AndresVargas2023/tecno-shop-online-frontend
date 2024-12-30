import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";

const RequestPasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Para mostrar el indicador de carga
  const API_URL = process.env.REACT_APP_API_URL; // Usar la variable de entorno para la URL base

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Iniciar carga

    try {
      const response = await axios.post(`${API_URL}/auth/request-password-reset`, { email });
      setMessage(response.data.message);
      setError("");
      setIsLoading(false); // Finalizar carga
    } catch (err) {
      setError(err.response?.data?.message || "Ocurrió un error");
      setMessage("");
      setIsLoading(false); // Finalizar carga
    }
  };

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
        Recuperar Contraseña
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
        <TextField
          fullWidth
          label="Ingresa tu correo electrónico"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          margin="normal"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2 }}
          disabled={isLoading}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : "Enviar Enlace"}
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

export default RequestPasswordReset;
