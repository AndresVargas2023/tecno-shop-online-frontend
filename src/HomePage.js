import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import 'font-awesome/css/font-awesome.min.css';
import { FaTiktok } from 'react-icons/fa';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Bienvenido a TecnoShop Online</h1>
        <p>La mejor tienda para tus necesidades tecnológicas</p>
        <button className="homepage-button">Explorar Productos</button>
      </header>

      <section className="search-bar">
        <input type="text" placeholder="Busca productos..." />
        <button className="search-button">Buscar</button>
      </section>
      <section className="homepage-section">
  <h2>Explora nuestras categorías</h2>
  <div className="categories">
    <div className="category-card">
      <h3>Smartphones</h3>
      <p>Encuentra los últimos modelos.</p>
      <button 
        className="explore-button" 
        onClick={() => navigate('/products/Smartphones')}>
        <i className="fa fa-mobile"></i> Explorar
      </button>
    </div>
    <div className="category-card">
      <h3>Computadoras</h3>
      <p>Las mejores laptops y PCs.</p>
      <button 
        className="explore-button" 
        onClick={() => navigate('/products/Computadoras')}>
        <i className="fa fa-laptop"></i> Explorar
      </button>
    </div>
    <div className="category-card">
      <h3>Accesorios</h3>
      <p>Complementos ideales para tu tecnología.</p>
      <button 
        className="explore-button" 
        onClick={() => navigate('/products/Accesorios')}>
        <i className="fa fa-headphones"></i> Explorar
      </button>
    </div>
    <div className="category-card">
      <h3>Electrodomésticos</h3>
      <p>Equipos esenciales para tu hogar.</p>
      <button 
        className="explore-button" 
        onClick={() => navigate('/products/Electrodomésticos')}>
        <i className="fa fa-blender"></i> Explorar
      </button>
    </div>
  </div>
</section>


<footer className="homepage-footer">
  <p>&copy; 2024 TecnoShop. Todos los derechos reservados.</p>
  <div className="social-media">
    <a href="https://www.facebook.com/people/TecnoShop-Online/61570247912665/" target="_blank" rel="noopener noreferrer">
      <i className="fa fa-facebook"></i>
    </a>
    <a href="https://www.tiktok.com/@tecnoshop_online24" target="_blank" rel="noopener noreferrer">
      <FaTiktok />
    </a>
    <a href="https://www.instagram.com/tecnoshopoline24/" target="_blank" rel="noopener noreferrer">
      <i className="fa fa-instagram"></i>
    </a>
    <a href="https://wa.me/595984086958" target="_blank" rel="noopener noreferrer">
      <i className="fa fa-whatsapp"></i>
    </a>
  </div>
  <p className="footer-text">Sitio web construido por <a href="https://www.weblabstudios.com" target="_blank" rel="noopener noreferrer">WebLab Studios</a></p>
</footer>


    </div>
  );
}

export default HomePage;
