import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Box, Badge, Typography } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../assets/images/TecnoShopOnline-Logo.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home'; // Icono de Inicio
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'; // Icono Administrar
import PersonIcon from '@mui/icons-material/Person'; // Icono Mi Perfil

const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 0,
  marginRight: '1rem',
  flexWrap: 'nowrap',
  justifyContent: 'flex-start',
});

const LogoImage = styled('img')({
  height: 60,
  '@media (max-width: 600px)': {
    height: 50,
  },
});

const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: '0 15px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  '@media (max-width: 600px)': {
    fontSize: '0.9rem',
    padding: '8px 12px',
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff5722',
  color: 'white',
  '&:hover': {
    backgroundColor: '#e64a19',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
  },
  fontSize: '1rem',
  padding: '8px 16px',
  '@media (max-width: 600px)': {
    fontSize: '0.9rem',
    padding: '6px 12px',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
  },
  fontSize: '1rem',
  padding: '8px 16px',
  '@media (max-width: 600px)': {
    fontSize: '0.9rem',
    padding: '6px 12px',
  },
}));

const UserGreeting = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 'bold',
  marginRight: '1rem',
  '@media (max-width: 600px)': {
    fontSize: '0.9rem',
  },
}));

const CartContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginRight: '20px',
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
    localStorage.removeItem('cart'); // Elimina los datos del carrito
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
    <AppBar position="sticky" sx={{ background: 'linear-gradient(to right, #2196f3, #1976d2)', display: 'flex', justifyContent: 'space-around', flexWrap: 'nowrap' }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flex: '4' }}>
          <IconButton edge="start" color="inherit" aria-label="back" sx={{ mr: 2 }} onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>

          <LogoContainer>
            <LogoImage src={logo} alt="Logo" />
            <NavButton component={Link} to="/">
              <HomeIcon />
            </NavButton>
            {isAuthenticated && (
              <>
                <UserGreeting variant="body1">
                  Hola, {userName} {userSurname}
                </UserGreeting>
                <NavButton component={Link} to="/profile" startIcon={<PersonIcon />}>
                  Mi Perfil
                </NavButton>
              </>
            )}
            {(role === 'admin' || role === 'moderator') && (
              <NavButton component={Link} to="/admin" startIcon={<AdminPanelSettingsIcon />}>
                Administrar
              </NavButton>
            )}
          </LogoContainer>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', flex: '1'}}>
          <CartContainer>
            <IconButton color="inherit" component={Link} to="/cart">
              <Badge badgeContent={cartCount} color="error" overlap="rectangular">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </CartContainer>

          {isAuthenticated ? (
            <LogoutButton onClick={handleLogout} variant="contained" startIcon={<ExitToAppIcon />}>
              Cerrar sesión
            </LogoutButton>
          ) : (
            <LoginButton component={Link} to="/login" variant="contained" startIcon={<LoginIcon />}>
              Iniciar sesión
            </LoginButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
