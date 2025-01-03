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
  const [image, setImage] = useState(null); // Cambio a archivo, no URL
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false); // Para controlar el estado de carga

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/products/${id}`);
          const product = response.data;
          setName(product.name);
          setPrice(product.price);
          setDescription(product.description);
          setImage(product.image);  // Si ya tiene una imagen
          setCategory(product.category);
        } catch (error) {
          console.error('Error al cargar el producto para editar:', error);
        }
      };
      fetchProduct();
    }
  }, [id]);

  // Manejar la carga del archivo de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    let imageUrl = '';
  
    // Verifica si el archivo de imagen está presente
    if (image) {
      console.log('Archivo de imagen seleccionado:', image);
  
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'productos_imagenes'); // Reemplaza con el nombre de tu preset
      formData.append('folder', 'products'); // Opcional: Si quieres que las imágenes se guarden en una carpeta específica
      
      try {
        console.log('Enviando imagen a Cloudinary...');
        const res = await axios.post('https://api.cloudinary.com/v1_1/dymjqs9mz/image/upload', formData);
        imageUrl = res.data.secure_url;
        console.log('Imagen subida correctamente:', imageUrl);
      } catch (error) {
        console.error('Error al subir la imagen:', error.response ? error.response.data : error.message);
      }
    }
    const productData = { name, price, description, image: imageUrl || '', category };
    console.log('Datos del producto:', productData);
  
    try {
      if (id) {
        // Actualiza el producto si tiene id
        await axios.put(`${process.env.REACT_APP_API_URL}/products/${id}`, productData);
      } else {
        // Crea un nuevo producto si no tiene id
        await axios.post(`${process.env.REACT_APP_API_URL}/products`, productData);
      }
      navigate('/admin/products');
    } catch (error) {
      console.error('Error al guardar el producto:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <Container 
      maxWidth="sm" 
      style={{
        padding: '2rem',
        backgroundColor: '#f4f4f4', 
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
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
          {/* Subida de imagen */}
          <Grid item xs={12}>
            <Button variant="contained" component="label">
              Subir Imagen
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
            {image && (
              <div>
                <img
                  src={URL.createObjectURL(image)} // Previsualización de la imagen
                  alt="Preview"
                  style={{ maxWidth: '100%', marginTop: '1rem' }}
                />
              </div>
            )}
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
              disabled={loading} // Deshabilitar el botón mientras se procesa
            >
              {loading ? 'Guardando...' : id ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default ProductForm;
