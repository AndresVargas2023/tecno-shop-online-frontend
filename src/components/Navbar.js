import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../assets/images/TecnoShopOnline-Logo.png';

const NavLinks = styled('div')(({ theme }) => ({
  marginLeft: theme.spacing(2),
  '& a': {
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      color: '#f5f5f5',
    },
  },
}));

const LogoContainer = styled('div')(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
}));

const LogoImage = styled('img')(({ theme }) => ({
  height: 50,
  marginRight: theme.spacing(1),
}));

const LogoutButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  backgroundColor: '#ff5722',
  color: 'white',
  '&:hover': {
    backgroundColor: '#e64a19',
  },
}));

const AdminButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  backgroundColor: '#4caf50',
  color: 'white',
  '&:hover': {
    backgroundColor: '#388e3c',
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  backgroundColor: '#1976d2',
  color: 'white',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
}));

function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('userRole'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const handleAuthChange = () => {
      const userRole = localStorage.getItem('userRole');
      const token = localStorage.getItem('token');

      setRole(userRole);
      setIsAuthenticated(!!token);
    };

    // Escuchar el evento personalizado
    window.addEventListener('authChange', handleAuthChange);

    // Cleanup al desmontar
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    setRole(null);
    setIsAuthenticated(false);
    navigate('/login');

    // Emitir el evento personalizado para notificar el cambio
    window.dispatchEvent(new Event('authChange'));
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#2196f3' }}>
      <Toolbar>
        <LogoContainer>
          <LogoImage src={logo} alt="Logo" />
        </LogoContainer>

        <NavLinks>
          <Link to="/">
            <Button color="inherit">Inicio</Button>
          </Link>
          <Link to="/about">
            <Button color="inherit">Acerca de</Button>
          </Link>
          <Link to="/contact">
            <Button color="inherit">Contacto</Button>
          </Link>
        </NavLinks>

        {isAuthenticated && (role === 'admin' || role === 'moderator') && (
          <Link to="/admin">
            <AdminButton color="inherit">Administrar</AdminButton>
          </Link>
        )}

        {isAuthenticated ? (
          <LogoutButton onClick={handleLogout} variant="contained">
            Cerrar sesión 🚪
          </LogoutButton>
        ) : (
          <Link to="/login">
            <LoginButton color="inherit">Iniciar sesión</LoginButton>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
