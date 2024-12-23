import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './components.css';

function ProductListCustomer() {
  const { category } = useParams();
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
        console.log('Productos cargados:', response.data); // Ver los productos cargados
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error al cargar los productos:', error);
      }
    };

    fetchProducts();
  }, [category]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const lowercasedSearchTerm = e.target.value.toLowerCase();

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowercasedSearchTerm) || 
      product.description.toLowerCase().includes(lowercasedSearchTerm)
    );

    console.log('Productos filtrados:', filtered); // Ver los productos después de la búsqueda

    setFilteredProducts(filtered);
  };

  return (
    <div className="product-list-customer">
      <h2>{category ? `Productos en la categoría: ${category}` : 'Todos los productos'}</h2>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Busca productos..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
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
