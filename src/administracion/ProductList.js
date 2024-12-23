import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Para obtener parámetros de la URL
import './admin'; // Importa el archivo CSS con los estilos mejorados

function ProductList() {
  const { category } = useParams(); // Obtén el parámetro de la categoría de la URL
  const [products, setProducts] = useState([]);

  // Carga de productos al montar el componente o cambiar la categoría
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = category 
          ? `${process.env.REACT_APP_API_URL}/products?category=${category}` // Si hay categoría, filtra por ella
          : `${process.env.REACT_APP_API_URL}/products`; // Si no, muestra todos los productos

        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, [category]); // Dependencia de la categoría para recargar cuando cambie

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

  return (
    <div className="product-list">
      <h2>Lista de Productos {category ? `en la categoría: ${category}` : ''}</h2>
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
