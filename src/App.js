import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importa ThemeProvider y createTheme
import Navbar from './components/Navbar'; // Asegúrate de importar el Navbar
import HomePage from './HomePage';

import Admin from './administracion/admin'; // Importa el componente de administración
import Login from './components/Login';   // Importa tu Login
import PrivateRoute from './routes/PrivateRoute'; // Importa PrivateRoute desde 'routes'
import Register from './components/Register';  // Agregar la ruta para registro
import Verification from './components/Verification';  // Agregar la ruta para registro
import ProductForm from './components/ProductForm'; // Importa el formulario para agregar/editar productos
import ProductList from './administracion/ProductList';  // Componente para listar productos
import ProductListCustomer from './components/ProductListCustomer';  // Componente para listar productos
import AllProductsPage from './components/ProductListCustomer';  // Componente para listar productos
import Layout from './components/Layout';
import AdminUsers from './administracion/AdminUsers';  // Importar el componente AdminUsers
import EditUser from './administracion/EditUser';  // Importar el componente de edición
import ForgotPassword from './components/ForgotPassword';
import VerifyLink from './components/VerifyLink';  // Asegúrate de importar el componente correctamente

// Crea un tema con una paleta definida
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',  // Puedes personalizar los colores del tema
    },
    secondary: {
      main: '#9c27b0',
    },
  },
});

function App() {
  return (
    // Envuelve tu aplicación con ThemeProvider para que todos los componentes puedan acceder al tema
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar /> 

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Login" element={<Login />} />  {/* Ruta al Login */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/products/:category" element={<ProductListCustomer />} /> {/* Ruta para productos por categoría */}
          <Route path="/products" element={<ProductListCustomer />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route 
            path="/admin" 
            element={<PrivateRoute element={<Admin />} />} 
          />
          <Route path="/admin/users" element={<AdminUsers />} /> {/* Nueva ruta */}
          <Route path="/admin/users/edit/:userId" element={<EditUser />} />
          <Route path="/admin/products" element={<ProductList />} /> {/* Ruta para ver la lista de productos */}
          <Route path="/admin/products/add" element={<ProductForm />} /> {/* Ruta para agregar productos */}
          <Route path="/edit-product/:id" element={<ProductForm />} />
          <Route path="/register" element={<Register />} /> {/* Ruta para el registro */}
          <Route path="/verify" element={<Verification />} />
          <Route path="/verify" element={<VerifyLink />} />


        </Routes>

        <Layout /> 
      </Router>
    </ThemeProvider>
  );
}

export default App;
