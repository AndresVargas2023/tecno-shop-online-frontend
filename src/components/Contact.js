import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se podría enviar los datos a una API o servicio para su procesamiento
    console.log('Datos del formulario enviados:', formData);
    alert('¡Gracias por ponerte en contacto con nosotros!'); // Mensaje de confirmación
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      message: ''
    });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 4, mb: 6 }}>
        <Typography variant="h4" gutterBottom>
          Contáctanos
        </Typography>
        <Typography variant="body1" gutterBottom>
          Si tienes alguna pregunta o comentario, no dudes en ponerte en contacto con nosotros.
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 3,
          p: 3,
          borderRadius: 2,
          backgroundColor: '#f5f5f5',
        }}
      >
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Correo Electrónico"
              variant="outlined"
              fullWidth
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Número de Teléfono"
              variant="outlined"
              fullWidth
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Dirección"
              variant="outlined"
              fullWidth
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: '#e8f5e9', // Color de fondo para la dirección
                },
              }}
              helperText="Ejemplo: Itapúa - María Auxiliadora"
            />
            <TextField
              label="Mensaje"
              variant="outlined"
              fullWidth
              name="message"
              multiline
              rows={4}
              value={formData.message}
              onChange={handleChange}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                mt: 2,
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#1976d2',
                },
              }}
            >
              Enviar Mensaje
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default Contact;
