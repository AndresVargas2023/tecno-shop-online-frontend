import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importa ThemeProvider y createTheme
import Navbar from './components/Navbar'; // Componente de la barra de navegación
import HomePage from './HomePage'; // Página principal
import Admin from './administracion/admin'; // Componente de administración
import Login from './components/LoginForgotRegister/Login'; // Componente de inicio de sesión
import PrivateRoute from './routes/PrivateRoute'; // Ruta protegida para usuarios autorizados
import Register from './components/LoginForgotRegister/Register'; // Componente de registro
import ProductForm from './components/products/ProductForm'; // Formulario para agregar/editar productos
import ProductList from './administracion/ProductList'; // Componente para listar productos (administrador)
import ProductListCustomer from './components/products/ProductListCustomer'; // Componente para listar productos (clientes)
import AllProductsPage from './components/products/ProductListCustomer'; // Página para listar todos los productos
import CartPage from './components/products/CartPage'; // Importar el componente de carrito
import CheckoutPage from './components/products/CheckoutPage'; // Si tienes una página de checkout
import Layout from './components/Layout'; // Diseño base para la aplicación
import AdminUsers from './administracion/AdminUsers'; // Gestión de usuarios (administrador)
import EditUser from './administracion/EditUser'; // Edición de usuarios
import VerifyLink from './components/LoginForgotRegister/VerifyLink'; // Componente para verificar enlaces de correo electrónico
import UserProfile from './components/LoginForgotRegister/UserProfile'; // Perfil del usuario
import RequestPasswordReset from "./components/LoginForgotRegister/RequestPasswordReset"; // Solicitud de restablecimiento de contraseña
import ResetPassword from "./components/LoginForgotRegister/ResetPassword"; // Restablecimiento de contraseña
import About from './components/About';
import Contact from './components/Contact';  

// Crea un tema personalizado para la aplicación
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Color principal
    },
    secondary: {
      main: '#9c27b0', // Color secundario
    },
  },
});

function App() {
  return (
    // Envuelve la aplicación con ThemeProvider para aplicar el tema
    <ThemeProvider theme={theme}>
      <Router>
        {/* Barra de navegación presente en toda la aplicación */}
        <Navbar /> 

        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<HomePage />} />
          {/* Ruta para el inicio de sesión */}
          <Route path="/Login" element={<Login />} />
          {/* Ruta para mostrar productos por categoría o todos los productos */}
          <Route path="/products/:category" element={<ProductListCustomer />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          {/* Rutas protegidas para el administrador */}
          <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/edit/:userId" element={<EditUser />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/products/add" element={<ProductForm />} />
          
          {/* Ruta para editar productos */}
          <Route path="/edit-product/:id" element={<ProductForm />} />
          {/* Ruta para el registro de nuevos usuarios */}
          <Route path="/register" element={<Register />} />
          {/* Ruta para verificar enlaces de correo electrónico */}
          <Route path="/verify/:email" element={<VerifyLink />} />
          {/* Ruta para el perfil del usuario */}
          <Route path="/profile" element={<UserProfile />} />
          {/* Rutas para restablecimiento de contraseña */}
          <Route path="/request-password-reset" element={<RequestPasswordReset />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

        </Routes>

        {/* Diseño base para elementos comunes */}
        <Layout />
      </Router>
    </ThemeProvider>
  );
}

export default App;
