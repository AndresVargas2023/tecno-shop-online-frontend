import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, Box } from '@mui/material';
import { styled } from '@mui/system';
import logo from '../assets/images/TecnoShopOnline-Logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Estilos responsivos utilizando sx de Material UI
const LogoContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexGrow: 1,
});

const LogoImage = styled('img')({
  height: 50,
  marginRight: 10,
  '@media (max-width: 600px)': {
    height: 40,
  },
});

const UserBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  color: 'white',
  justifyContent: 'center',
  flexGrow: 1,
});

const LogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#ff5722',
  color: 'white',
  '&:hover': {
    backgroundColor: '#e64a19',
  },
  '@media (max-width: 600px)': {
    fontSize: '0.8rem',
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
  },
}));

const DrawerList = styled(List)(({ theme }) => ({
  width: 250,
  backgroundColor: theme.palette.primary.main,
  '@media (max-width: 600px)': {
    width: '100%',
  },
}));

const DrawerLink = styled('div')({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 20px',
  color: 'white',
  textDecoration: 'none',
  '&:hover': {
    backgroundColor: '#333',
    textDecoration: 'none',
  },
  '& svg': {
    marginRight: '10px',
  },
});

function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('userRole'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [userSurname, setUserSurname] = useState(localStorage.getItem('userSurname'));
  const [openDrawer, setOpenDrawer] = useState(false);

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

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <AppBar position="sticky" sx={{ background: 'linear-gradient(to right, #2196f3, #1976d2)' }}>
      <Toolbar>
        {/* Botón para retroceder */}
        <IconButton edge="start" color="inherit" aria-label="back" sx={{ mr: 2 }} onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </IconButton>

        {/* Botón para abrir el menú */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>

        <LogoContainer>
          <LogoImage src={logo} alt="Logo" />
        </LogoContainer>

        <Drawer anchor="left" open={openDrawer} onClose={toggleDrawer}>
          <DrawerList>
            <ListItem button onClick={toggleDrawer}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                <DrawerLink>
                  <HomeIcon sx={{ mr: 2 }} />
                  Inicio
                </DrawerLink>
              </Link>
            </ListItem>
            {isAuthenticated && (
              <ListItem button onClick={toggleDrawer}>
                <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
                  <DrawerLink>Ver mi perfil</DrawerLink>
                </Link>
              </ListItem>
            )}
            {(role === 'admin' || role === 'moderator') && (
              <ListItem button onClick={toggleDrawer}>
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none' }}>
                  <DrawerLink>Administrar</DrawerLink>
                </Link>
              </ListItem>
            )}
          </DrawerList>
        </Drawer>

        <UserBox>
          {isAuthenticated && (
            <span style={{ color: 'white', marginRight: '1rem' }}>
              Hola, {userName} {userSurname}
            </span>
          )}
        </UserBox>

        {isAuthenticated ? (
          <LogoutButton onClick={handleLogout} variant="contained">
            Cerrar sesión 🚪
          </LogoutButton>
        ) : (
          <Link to="/login">
            <LoginButton variant="contained">Iniciar sesión</LoginButton>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
