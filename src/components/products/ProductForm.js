import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Container, Typography, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Extrae el id de los parámetros de la URL
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
          const product = response.data;
          setName(product.name);
          setPrice(product.price);
          setDescription(product.description);
          setImage(product.image);
          setCategory(product.category);
        } catch (error) {
          console.error('Error al cargar el producto para editar:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = { name, price, description, image, category };

    try {
      if (id) {
        await axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`, productData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/products`, productData);
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <Container 
      maxWidth="sm" 
      style={{
        padding: '2rem',
        backgroundColor: '#f4f4f4', // Color de fondo
        borderRadius: '8px', // Borde redondeado
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Sombra suave
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        {id ? 'Editar Producto' : 'Agregar Producto'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Nombre del Producto"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Precio"
              type="number"
              fullWidth
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="URL de la Imagen"
              fullWidth
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Categoría</InputLabel>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="Smartphones">Smartphones</MenuItem>
                <MenuItem value="Computadoras">Computadoras</MenuItem>
                <MenuItem value="Accesorios">Accesorios</MenuItem>
                <MenuItem value="Electrodomésticos">Electrodomésticos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              style={{ padding: '10px' }}
            >
              {id ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ProductForm;
