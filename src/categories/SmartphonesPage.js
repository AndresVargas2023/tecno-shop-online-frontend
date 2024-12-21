import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para la navegación
import './Category.css'; // Importar el archivo CSS para los estilos

function SmartphonesPage() {
  const navigate = useNavigate(); // Hook para manejar la navegación

  const productos = [
    {
      id: 1,
      nombre: "iPhone 14 Pro Max",
      caracteristicas: "Pantalla OLED, A15 Bionic, 5G",
      precio: "$1,099",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUAYY3tZbtcOM6FGRf0cJwqWCpUNR2GWP5qw&s"
    },
    {
      id: 2,
      nombre: "Samsung Galaxy S23 Ultra",
      caracteristicas: "Pantalla AMOLED, Snapdragon 8 Gen 2, Cámara de 200MP",
      precio: "$1,199",
      imagen: "https://tecnostore.com.py/v2/wp-content/uploads/2023/12/61b0o90kTRL.jpeg"
    },
    {
      id: 3,
      nombre: "Xiaomi Mi 13",
      caracteristicas: "Pantalla AMOLED, Snapdragon 8 Gen 2, 12GB RAM",
      precio: "$749",
      imagen: "https://i01.appmifile.com/v1/MI_18455B3E4DA706226CF7535A58E875F0267/pms_1678185493.04995228.png"
    },
    {
      id: 4,
      nombre: "Google Pixel 7",
      caracteristicas: "Pantalla OLED, Google Tensor, Cámara de 50MP",
      precio: "$599",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk_yuM2Vq3dxZbAlOsiLNSDlOdC_yg17Q6Uw&s"
    }
  ];

  const handleAddToCart = (producto) => {
    console.log(`${producto.nombre} agregado al carrito.`);
  };

  return (
    <div className="category-container">
      <h1 className="category-title">Smartphones</h1>
      <p className="category-description">
        Aquí puedes explorar todos los modelos de smartphones disponibles.
      </p>
      <div className="product-list">
        {productos.map((producto) => (
          <div className="product-card" key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} className="product-image" />
            <h2 className="product-name">{producto.nombre}</h2>
            <p className="product-characteristics">{producto.caracteristicas}</p>
            <p className="product-price">{producto.precio}</p>
            <button
              className="add-to-cart-button"
              onClick={() => handleAddToCart(producto)}
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
      <button 
        className="back-to-home-button" 
        onClick={() => navigate('/')}
      >
        Volver a la página principal
      </button>
    </div>
  );
}

export default SmartphonesPage;
