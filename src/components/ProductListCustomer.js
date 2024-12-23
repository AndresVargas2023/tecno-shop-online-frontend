import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Para obtener parámetros de la URL
import './components.css'; // Para los estilos

function ProductListCustomer() {
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

  return (
    <div className="product-list-customer">
      <h2>{category ? `Productos en la categoría: ${category}` : 'Todos los productos'}</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.imageUrl} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Precio:</strong> ${product.price}</p>
              <button className="product-button">Ver más</button>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
}

export default ProductListCustomer;
