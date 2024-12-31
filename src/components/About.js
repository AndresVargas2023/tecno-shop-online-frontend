import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function About() {
  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');

  useEffect(() => {
    // Obtener datos del usuario desde localStorage
    const name = localStorage.getItem('userName');
    const surname = localStorage.getItem('userSurname');
    setUserName(name || 'Invitado'); // Fallback si no hay nombre
    setUserSurname(surname || '');
  }, []);

  return (
    <Container>
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Hola, {userName} {userSurname}
        </Typography>
        <Typography variant="h6" gutterBottom>
          ¡Bienvenido a TecnoShop Online!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Tu destino tecnológico de confianza. En TecnoShop Online, estamos comprometidos en ofrecerte una experiencia de compra única y satisfactoria.
          Nuestro catálogo cuenta con una amplia selección de productos de alta calidad y las mejores marcas, diseñados para satisfacer todas tus necesidades tecnológicas y del hogar.
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Descubre todo lo que tenemos para ti:
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">🌟 Smartphones</Typography>
              <Typography variant="body2" gutterBottom>
                Mantente conectado con los últimos modelos. Rendimiento de vanguardia y tecnología al alcance de tu mano.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/products/Smartphones">
                Explorar ➡️
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">💻 Computadoras</Typography>
              <Typography variant="body2" gutterBottom>
                Desde laptops compactas hasta PCs de alto rendimiento. Encuentra la solución perfecta para trabajar, estudiar o jugar.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/products/Computadoras">
                Explorar ➡️
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">🎧 Accesorios</Typography>
              <Typography variant="body2" gutterBottom>
                Auriculares, cargadores, teclados y más. Todo lo que necesitas para complementar y potenciar tu tecnología.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/products/Accesorios">
                Explorar ➡️
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6">🏠 Electrodomésticos</Typography>
              <Typography variant="body2" gutterBottom>
                Equipa tu hogar con los mejores electrodomésticos. Diseño, funcionalidad y eficiencia en un solo lugar.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/products/Electrodomésticos">
                Explorar ➡️
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default About;
