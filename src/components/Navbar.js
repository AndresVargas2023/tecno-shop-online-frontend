import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box, Badge, Typography } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../assets/images/TecnoShopOnline-Logo.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 0,
  marginRight: '1rem',
});

const LogoImage = styled('img')({
  height: 50,
  '@media (max-width: 600px)': {
    height: 40,
  },
});

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: '0 10px',
  textTransform: 'none',
  '@media (max-width: 600px)': {
    fontSize: '0.8rem',
    padding: '6px 10px',
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff5722',
  color: 'white',
  '&:hover': {
    backgroundColor: '#e64a19',
  },
  '@media (max-width: 600px)': {
    fontSize: '0.8rem',
    padding: '6px 10px',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  '@media (max-width: 600px)': {
    fontSize: '0.8rem',
    padding: '6px 10px',
  },
}));

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

  // Escuchar los cambios en el carrito
  useEffect(() => {
    const handleCartUpdate = () => {
      const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
      const cartQuantity = storedCart.reduce((total, product) => total + product.quantity, 0);
      setCartCount(cartQuantity);
    };

    window.addEventListener('storage', handleCartUpdate);

    // Obtener la cantidad inicial del carrito
    handleCartUpdate();

    return () => {
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
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
  };

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(to right, #2196f3, #1976d2)' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="back" sx={{ mr: 2 }} onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>

        <LogoContainer>
          <LogoImage src={logo} alt="Logo" />
          <NavButton component={Link} to="/">
            Inicio
          </NavButton>
          {isAuthenticated && (
            <NavButton component={Link} to="/profile">
              Ver mi perfil
            </NavButton>
          )}
          {(role === 'admin' || role === 'moderator') && (
            <NavButton component={Link} to="/admin">
              Administrar
            </NavButton>
          )}
        </LogoContainer>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
          <IconButton color="inherit" component={Link} to="/cart" sx={{ marginRight: '20px' }}>
            <Badge badgeContent={cartCount} color="error" overlap="rectangular">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <LogoutButton onClick={handleLogout} variant="contained">
              Cerrar sesión 🚪
            </LogoutButton>
          ) : (
            <LoginButton component={Link} to="/login" variant="contained">
              Iniciar sesión
            </LoginButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
