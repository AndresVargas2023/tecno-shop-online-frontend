import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Box, Typography, Container } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';  // Ícono para ver productos
import AddBoxIcon from '@mui/icons-material/AddBox';    // Ícono para agregar productos
import PeopleIcon from '@mui/icons-material/People';    // Ícono para administrar usuarios

function Admin() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);

  // Obtener el rol del usuario al cargar el componente
  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    console.log('Rol obtenido desde localStorage:', userRole);

    // Si no hay rol o el rol es 'usuario', redirigir al login o página de inicio
    if (!userRole || userRole === 'user') {
      console.log('Acceso no autorizado, redirigiendo...');
      navigate('/');  // Redirige al inicio si el rol es 'usuario'
      return;
    }

    setRole(userRole);
  }, [navigate]);

  return (
    <Container maxWidth="lg" sx={{ padding: '2rem' }}>
      <Typography variant="h3" gutterBottom align="center">
        Panel de Administración
      </Typography>
      <Typography variant="h6" paragraph align="center">
        Bienvenido al panel de administración de TecnoShop. Aquí podrás gestionar productos, usuarios y más.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Botones para gestionar productos */}
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '100%', maxWidth: 300 }}
            startIcon={<ViewListIcon />} // Ícono para ver productos
            onClick={() => navigate('/admin/products')}
          >
            Ver Productos
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: '100%', maxWidth: 300 }}
            startIcon={<AddBoxIcon />} // Ícono para agregar productos
            onClick={() => navigate('/admin/products/add')}
          >
            Agregar Productos
          </Button>

          {/* Mostrar el botón de Administrar Usuarios solo si el rol es 'moderator' */}
          {role === 'moderator' && (
            <Button
              variant="contained"
              color="warning"
              sx={{ width: '100%', maxWidth: 300 }}
              startIcon={<PeopleIcon />} // Ícono para administrar usuarios
              onClick={() => navigate('/admin/users')}
            >
              Administrar Usuarios
            </Button>
          )}

          {/* Si el rol no es 'moderator', se muestra este mensaje */}
          {role && role !== 'moderator' && (
            <Typography variant="body1" color="textSecondary">
              No tienes permisos para administrar usuarios.
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Admin;
