import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';  // Importar el formulario

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Obtener productos desde el servidor
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`); // Usar la variable de entorno
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductSubmit = () => {
    // Actualizar la lista de productos después de crear o modificar un producto
    setSelectedProduct(null);  // Cerrar el formulario de creación/edición
    // Refrescar la lista de productos
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`); // Usar la variable de entorno
        setProducts(response.data);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`); // Usar la variable de entorno
      // Refrescar la lista de productos
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  return (
    <div>
      <h1>Administrar Productos</h1>

      {/* Mostrar el formulario de creación o edición de productos */}
      <ProductForm 
        productId={selectedProduct} 
        onSubmit={handleProductSubmit} 
      />

      <h2>Lista de Productos</h2>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <p>{product.name}</p>
            <button onClick={() => setSelectedProduct(product._id)}>
              Editar
            </button>
            <button onClick={() => handleDeleteProduct(product._id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
