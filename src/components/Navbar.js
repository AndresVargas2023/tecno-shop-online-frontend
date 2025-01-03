import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box, Badge, Typography } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../assets/images/TecnoShopOnline-Logo.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';

const Capsule = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '2px',
  backgroundColor: 'sky',
  margin: '1px',
  '@media (max-width: 500px)': {
    padding: '0px',
  },
});

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
});

const LogoImage = styled('img')({
  height: 50,
  marginLeft: '2px',
  '@media (max-width: 100px)': {
    height: 30,
  },
});

const IconLabelContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '@media (max-width: 600px)': {
    flex: 1,
  },
});

function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('userRole'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [userSurname, setUserSurname] = useState(localStorage.getItem('userSurname'));
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleAuthChange = () => {
      const userRole = localStorage.getItem('userRole');
      const token = localStorage.getItem('token');
      const name = localStorage.getItem('userName');
      const surname = localStorage.getItem('userSurname');

      setRole(userRole);
      setIsAuthenticated(!!token);
      setUserName(name);
      setUserSurname(surname);
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  useEffect(() => {
    const handleCartUpdate = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartQuantity = storedCart.reduce((total, product) => total + product.quantity, 0);
      setCartCount(cartQuantity);
    };

    window.addEventListener('storage', handleCartUpdate);
    handleCartUpdate();

    return () => {
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('cart');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userSurname');
    setRole(null);
    setIsAuthenticated(false);
    setUserName(null);
    setUserSurname(null);
    navigate('/login');
    window.dispatchEvent(new Event('authChange'));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(to right, #2196f3, #1976d2)', padding: '10px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        {/* Cápsula 1 (10%) */}
        <Capsule sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  <LogoContainer>
    <LogoImage src={logo} alt="Logo" />
  </LogoContainer>
  <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
    <ArrowBackIcon />
  </IconButton>
</Capsule>


        {/* Cápsula 2 (resto del espacio) */}
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Cápsula 2.1 - Mostrar "Hola" solo si está autenticado */}
          {isAuthenticated && (
            <Capsule sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
              <Typography variant="body1">
                Hola, {userName} {userSurname}
              </Typography>
            </Capsule>
          )}

          {/* Cápsula 2.2 - Distribución equitativa */}
          <Capsule sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
            <IconLabelContainer sx={{ flex: 1 }}>
              <IconButton color="inherit" component={Link} to="/">
                <HomeIcon />
              </IconButton>
              <Typography variant="caption">Inicio</Typography>
            </IconLabelContainer>

            {/* Mostrar "Mi Perfil" solo si está autenticado */}
            {isAuthenticated && (
              <IconLabelContainer sx={{ flex: 1 }}>
                <IconButton color="inherit" component={Link} to="/profile">
                  <PersonIcon />
                </IconButton>
                <Typography variant="caption">Mi Perfil</Typography>
              </IconLabelContainer>
            )}

            {/* Mostrar "Administrar" solo si el rol es admin o moderator */}
            {(role === 'admin' || role === 'moderator') && isAuthenticated && (
              <IconLabelContainer sx={{ flex: 1 }}>
                <IconButton color="inherit" component={Link} to="/admin">
                  <AdminPanelSettingsIcon />
                </IconButton>
                <Typography variant="caption">Administrar</Typography>
              </IconLabelContainer>
            )}

            <IconLabelContainer sx={{ flex: 1 }}>
              <IconButton color="inherit" component={Link} to="/cart">
                <Badge badgeContent={cartCount} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <Typography variant="caption">Carrito</Typography>
            </IconLabelContainer>

            {/* Mostrar "Iniciar sesión" o "Cerrar sesión" dependiendo de la autenticación */}
            <IconLabelContainer sx={{ flex: 1 }}>
              <IconButton
                color="inherit"
                component={Link}
                to={isAuthenticated ? '/' : '/login'}
                onClick={isAuthenticated ? handleLogout : null}
                sx={{
                  color: isAuthenticated ? '#d32f2f' : '#388e3c', // Rojo si autenticado, verde si no
                }}
              >
                {isAuthenticated ? <ExitToAppIcon /> : <LoginIcon />}
              </IconButton>
              <Typography variant="caption" sx={{ marginTop: '4px' }}>
                {isAuthenticated ? 'Cerrar sesión' : 'Iniciar sesión'}
              </Typography>
            </IconLabelContainer>
          </Capsule>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
