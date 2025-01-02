import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Grid, Card, CardContent, Select, MenuItem, FormControl, InputLabel, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import axios from 'axios';

function CheckoutPage() {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
    phone: '',
    observation: ''
  });

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [total, setTotal] = useState(0);
  const [departments, setDepartments] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  useEffect(() => {
    // Obtener departamentos
    fetch("https://api.delpi.dev/api/departamentos")
      .then((response) => response.json())
      .then((data) => setDepartments(data.data || []))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      fetch(`https://api.delpi.dev/api/ciudades/${selectedDepartment}`)
        .then((response) => response.json())
        .then((data) => {
          setCities(data);
        })
        .catch((error) => console.error("Error fetching cities:", error));
    }
  }, [selectedDepartment]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setSelectedCity(''); // Resetear la ciudad cuando cambie el departamento
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleSubmit = async () => {
    const purchaseDetails = {
      shippingInfo,
      products: cart,
      totalPrice: total,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/purchases`, purchaseDetails);
      console.log('Compra enviada:', response.data);
    } catch (error) {
      console.error('Error al enviar la compra:', error);
    }
  };

  return (
    <Box style={{ padding: '20px', maxWidth: '900px', margin: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        Finaliza tu compra
      </Typography>

      {/* Resumen del carrito como lista */}
      <Typography variant="h6" gutterBottom>
        Resumen de tu compra
      </Typography>
      <Grid container spacing={3}>
        {cart.map((item) => (
          <Grid item xs={12} sm={6} key={item.productId}>
            <Card style={{ border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', padding: '15px' }}>
              <CardContent>
                <Typography variant="h6" style={{ color: '#3f51b5', fontWeight: 'bold' }}>
                  {item.name}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: '8px' }}>
                  <strong>Cantidad:</strong> {item.quantity}
                </Typography>
                <Typography variant="body2" style={{ marginBottom: '8px' }}>
                  <strong>Precio:</strong> ₲ {item.price.toLocaleString('es-PY')}
                </Typography>
                <Divider style={{ margin: '10px 0' }} />
                <Typography variant="body2" style={{ color: '#555' }}>
                  <strong>Total:</strong> ₲ {(item.price * item.quantity).toLocaleString('es-PY')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Información de envío */}
      <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
        Información de envío
      </Typography>
      <TextField
        label="Nombre completo"
        variant="outlined"
        fullWidth
        name="name"
        value={shippingInfo.name}
        onChange={handleShippingChange}
        style={{ marginBottom: '10px' }}
      />

      {/* Selección de departamento */}
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Selecciona tu departamento</InputLabel>
        <Select
          value={selectedDepartment}
          onChange={handleDepartmentChange}
          label="Selecciona tu departamento"
        >
          {departments && departments.length > 0 ? (
            departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>
                {dept.nombre}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">
              <em>No hay departamentos disponibles</em>
            </MenuItem>
          )}
        </Select>
      </FormControl>

      {/* Selección de ciudad */}
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Selecciona tu ciudad</InputLabel>
        <Select
          value={selectedCity}
          onChange={handleCityChange}
          label="Selecciona tu ciudad"
        >
          {cities && cities.length > 0 ? (
            cities.map((city) => (
              <MenuItem key={city.id} value={city.id}>
                {city.nombre}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">
              <em>No hay ciudades disponibles</em>
            </MenuItem>
          )}
        </Select>
      </FormControl>

      {/* Barrio */}
      <TextField
        label="Barrio"
        variant="outlined"
        fullWidth
        name="address"
        value={shippingInfo.address}
        onChange={handleShippingChange}
        style={{ marginBottom: '10px' }}
      />

      {/* Correo electrónico - Campo opcional */}
      <TextField
        label="Correo electrónico (Opcional)"
        variant="outlined"
        fullWidth
        name="email"
        value={shippingInfo.email}
        onChange={handleShippingChange}
        style={{ marginBottom: '10px' }}
      />

      {/* Teléfono */}
      <TextField
        label="Teléfono"
        variant="outlined"
        fullWidth
        name="phone"
        value={shippingInfo.phone}
        onChange={handleShippingChange}
        style={{ marginBottom: '20px' }}
      />

      {/* Campo de Observaciones */}
      <TextField
        label="Observaciones"
        variant="outlined"
        fullWidth
        name="observation"
        value={shippingInfo.observation}
        onChange={handleShippingChange}
        multiline
        rows={4}
        style={{ marginBottom: '20px' }}
      />

      {/* Botón de finalizar compra */}
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Finalizar compra
      </Button>
    </Box>
  );
}

export default CheckoutPage;
