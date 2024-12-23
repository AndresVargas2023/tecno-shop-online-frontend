import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Asegúrate de importar el Navbar
import HomePage from './HomePage';

import Admin from './administracion/admin'; // Importa el componente de administración
import Login from './components/Login';   // Importa tu Login
import PrivateRoute from './routes/PrivateRoute'; // Importa PrivateRoute desde 'routes'
import Register from './components/Register';  // Agregar la ruta para registro
import ProductForm from './components/ProductForm'; // Importa el formulario para agregar/editar productos
import ProductList from './administracion/ProductList';  // Componente para listar productos
import ProductListCustomer from './components/ProductListCustomer';  // Componente para listar productos
import AllProductsPage from './components/ProductListCustomer';  // Componente para listar productos


function App() {
  return (
    <Router>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />  {/* Ruta al Login */}
        <Route path="/products/:category" element={<ProductListCustomer />} /> {/* Ruta para productos por categoría */}
        <Route path="/products" element={<ProductListCustomer />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route 
          path="/admin" 
          element={<PrivateRoute element={<Admin />} />} 
        />
        {/* Rutas para productos */}
        <Route path="/admin/products" element={<ProductList />} /> {/* Ruta para ver la lista de productos */}
        <Route path="/admin/products/add" element={<ProductForm />} /> {/* Ruta para agregar productos */}
        <Route path="/edit-product/:id" element={<ProductForm />} />

        <Route path="/register" element={<Register />} /> {/* Ruta para el registro */}
      </Routes>
    </Router>
  );
}

export default App;
