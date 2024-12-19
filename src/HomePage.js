import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import 'font-awesome/css/font-awesome.min.css'; // Importar Font Awesome

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Bienvenido a TecnoShop Online</h1>
        <p>La mejor tienda para tus necesidades tecnológicas</p>
        <button className="homepage-button">Explorar Productos</button>
      </header>
      <section className="homepage-section">
        <h2>Explora nuestras categorías</h2>
        <div className="categories">
          <div className="category-card">
            <h3>Smartphones</h3>
            <p>Encuentra los últimos modelos.</p>
            <button 
              className="explore-button" 
              onClick={() => navigate('/smartphones')}>
              <i className="fa fa-mobile"></i> Explorar
            </button>
          </div>
          <div className="category-card">
            <h3>Computadoras</h3>
            <p>Las mejores laptops y PCs.</p>
            <button 
              className="explore-button" 
              onClick={() => navigate('/computers')}>
              <i className="fa fa-laptop"></i> Explorar
            </button>
          </div>
          <div className="category-card">
            <h3>Accesorios</h3>
            <p>Complementos ideales para tu tecnología.</p>
            <button 
              className="explore-button" 
              onClick={() => navigate('/accessories')}>
              <i className="fa fa-headphones"></i> Explorar
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
