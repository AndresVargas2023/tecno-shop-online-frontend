import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // useNavigate para la navegación
import './admin'; // Importa el archivo CSS con los estilos mejorados

function ProductList() {
  const navigate = useNavigate(); // Para la redirección
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  // Función para eliminar un producto
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    if (confirmDelete) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/products/${id}`);
        // Actualiza la lista de productos al eliminar
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id)); // Usar _id
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
      }
    }
  };

  // Función para redirigir al formulario de edición
  const handleEdit = (id) => {
    navigate(`/edit-product/${id}`); // Redirige a la página de edición con el ID del producto
  };

  return (
    <div className="product-list">
      <h2>Lista de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}> {/* Cambiado de id a _id */}
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => handleEdit(product._id)}>Editar</button>
                <button onClick={() => handleDelete(product._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
