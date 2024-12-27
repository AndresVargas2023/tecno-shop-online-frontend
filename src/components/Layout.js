import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Box, Container, Typography, IconButton, Button } from '@mui/material';
import { FaTiktok } from 'react-icons/fa';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

function Layout() {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box component="main" flexGrow={1}>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ bgcolor: 'primary.main', color: 'white', py: 1, textAlign: 'center' }}>
        
        {/* Enlaces de navegación */}
        <Box display="flex" justifyContent="center" gap={5} my={1}> {/* Reducido el margen aquí */}
          <Link to="/about" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" sx={{ color: 'white' }}>
              Acerca de
            </Button>
          </Link>
          <Link to="/contact" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="secondary" sx={{ color: 'white' }}>
              Contacto
            </Button>
          </Link>
        </Box>
        
        <Typography variant="body2" gutterBottom sx={{ my: 0.5 }}> {/* Reducido el margen aquí */}
          &copy; 2024 TecnoShop. Todos los derechos reservados.
        </Typography>

        {/* Redes sociales */}
        <Box display="flex" justifyContent="center" gap={1} my={0.5}> {/* Reducido el margen aquí */}
          <IconButton
            href="https://www.facebook.com/people/TecnoShop-Online/61570247912665/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'white' }}
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            href="https://www.tiktok.com/@tecnoshop_online24"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'white' }}
          >
            <FaTiktok />
          </IconButton>
          <IconButton
            href="https://www.instagram.com/tecnoshopoline24/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'white' }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            href="https://wa.me/595984086958"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: 'white' }}
          >
            <WhatsAppIcon />
          </IconButton>
        </Box>

        <Typography variant="body2" sx={{ my: 0.5 }}> {/* Reducido el margen aquí */}
          Sitio web construido por{' '}
          <Link
            href="https://www.weblabstudios.com"
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            color="secondary.light"
          >
            WebLab Studios
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Layout;
