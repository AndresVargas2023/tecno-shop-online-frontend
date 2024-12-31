import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    if (!userRole || userRole === 'user') {
      navigate('/');
      return;
    }
    setRole(userRole);

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, [navigate]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`);
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Lista de Productos
      </Typography>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Precio</strong></TableCell>
              <TableCell><strong>Categoría</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(product._id)}
                    sx={{ marginRight: 1 }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDelete(product._id)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProductList;
