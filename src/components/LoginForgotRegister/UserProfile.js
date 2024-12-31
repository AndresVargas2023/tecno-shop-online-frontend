import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, CircularProgress, Grid, Box, Alert } from '@mui/material';

function UserProfile() {
  const { userId } = useParams(); // Obtener el ID del usuario desde la URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserId = localStorage.getItem('userId');  // Obtener el userId desde localStorage
      if (!storedUserId) {
        console.error('El userId no está disponible');
        setError('No se pudo cargar el perfil');
        setLoading(false);
        return;  // No hacer la solicitud si no hay un userId válido
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/users/${storedUserId}`);
        if (!response.ok) {
          throw new Error('No se pudo cargar el perfil');
        }

        const userData = await response.json();
        console.log(userData);  // Imprimir los datos obtenidos
        setUser(userData); // Actualizar el estado con los datos del usuario
        setLoading(false); // Cambiar el estado de loading a false
      } catch (error) {
        console.error('Error al cargar el perfil', error);
        setError('No se pudo cargar el perfil');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]); // Solo se ejecutará cuando cambie el ID del usuario

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: '100%', padding: 2 }}>
        <Alert severity="error">⚠️ {error}</Alert>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ width: '100%', padding: 2 }}>
        <Alert severity="warning">❌ Usuario no encontrado</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Paper elevation={3} sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          👤 Perfil de {user.name} {user.surname}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="textSecondary">
              📧 <strong>Email:</strong> {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="textSecondary">
              🏠 <strong>Dirección:</strong> {user.address || 'No disponible'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="textSecondary">
              💼 <strong>Rol:</strong> {user.role || 'No asignado'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" color="textSecondary">
              ✅ <strong>Verificado:</strong> {user.isVerified ? 'Sí' : 'No'}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default UserProfile;
