import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  TextField,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Search from '@mui/icons-material/Search';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

function ProductListCustomer() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category
          ? `${process.env.REACT_APP_API_URL}/products?category=${category}`
          : `${process.env.REACT_APP_API_URL}/products`;

        const response = await axios.get(url);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(value) ||
      product.description.toLowerCase().includes(value)
    );

    setFilteredProducts(filtered);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product) => {
    let storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Buscar si el producto ya existe en el carrito
    const productIndex = storedCart.findIndex(item => item.productId === product._id);

    if (productIndex === -1) {
      storedCart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image, // Agregamos la URL de la imagen
        quantity: 1,
      });
    } else {
      storedCart[productIndex].quantity += 1;
    }
    
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(storedCart));
    
  
    // Emitir un evento para que el Navbar se actualice sin recargar la página
    window.dispatchEvent(new Event('storage'));
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {category ? `Productos en la categoría: ${category}` : 'Todos los productos'}
      </Typography>

      {/* Barra de búsqueda */}
      <TextField
        label="Busca productos..."
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        InputProps={{
          endAdornment: <Search />,
        }}
        style={{ marginBottom: '20px' }}
      />

      {/* Grilla de productos */}
      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card>
                {/* Imagen clickeable */}
                <CardMedia
                  component="img"
                  alt={product.name}
                  image={product.image}
                  style={{
                    cursor: 'pointer',
                    height: 200,
                    objectFit: 'contain',
                    borderRadius: '8px',
                    margin: '5px',
                  }}
                  onClick={() => handleProductClick(product._id)}
                />
                {/* Contenido del producto */}
                <CardContent>
                  <Typography variant="h6">
                    {product.name}
                    <Button
                      size="small"
                      style={{ marginLeft: '8px', textTransform: 'none' }}
                      onClick={() => handleProductClick(product._id)}
                    >
                      Ver detalles
                    </Button>
                  </Typography>

                  {/* Precio y carrito */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                    <Chip
                      label={`₲ ${product.price.toLocaleString('es-PY')}`} // Mostrar el precio con símbolo de guaraní
                      color="primary"
                      icon={<AttachMoneyIcon fontSize="small" style={{ marginRight: '5px', color: '#4caf50' }} />} // Añadir ícono de billete
                      style={{ fontSize: '1rem', padding: '8px', fontWeight: 'bold' }}
                    />
                    <IconButton
                      color="primary"
                      style={{
                        transition: 'color 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '8px',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = 'green')}
                      onMouseLeave={(e) => (e.target.style.color = '')}
                      onClick={() => handleAddToCart(product)}
                    >
                      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Añadir al carrito</span>
                      <ShoppingCartIcon style={{ marginRight: '5px', fontSize: '20px' }} />
                    </IconButton>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No se encontraron productos.
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default ProductListCustomer;
