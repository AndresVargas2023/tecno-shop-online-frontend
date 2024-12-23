import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Asegúrate de importar el Navbar
import HomePage from './HomePage';
import SmartphonesPage from './categories/SmartphonesPage';
import ComputersPage from './categories/ComputersPage';
import AccessoriesPage from './categories/AccessoriesPage';
import Admin from './administracion/admin'; // Importa el componente de administración
import Login from './components/Login';   // Importa tu Login
import PrivateRoute from './routes/PrivateRoute'; // Importa PrivateRoute desde 'routes'
import Register from './components/Register';  // Agregar la ruta para registro
import ProductForm from './components/ProductForm'; // Importa el formulario para agregar/editar productos
import ProductList from './administracion/ProductList';  // Componente para listar productos
import ProductListCustomer from './components/ProductListCustomer';  // Componente para listar productos


function App() {
  return (
    <Router>
      <Navbar /> 

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/smartphones" element={<SmartphonesPage />} />
        <Route path="/computers" element={<ComputersPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/Login" element={<Login />} />  {/* Ruta al Login */}
        <Route path="/products/:category" element={<ProductListCustomer />} /> {/* Ruta para productos por categoría */}
        <Route path="/products" element={<ProductListCustomer />} />
        <Route 
          path="/admin" 
          element={<PrivateRoute element={<Admin />} />} 
        />
        {/* Rutas para productos */}
        <Route path="/admin/products" element={<ProductList />} /> {/* Ruta para ver la lista de productos */}
        <Route path="/admin/products/add" element={<ProductForm />} /> {/* Ruta para agregar productos */}
        <Route path="/admin/products/edit/:id" element={<ProductForm />} /> {/* Ruta para editar productos */}
        <Route path="/register" element={<Register />} /> {/* Ruta para el registro */}
      </Routes>
    </Router>
  );
}

export default App;
