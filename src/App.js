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

function App() {
  return (
    <Router>
      {/* Navbar aparece en todas las páginas */}
      <Navbar /> 

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/smartphones" element={<SmartphonesPage />} />
        <Route path="/computers" element={<ComputersPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
        <Route path="/Login" element={<Login />} />  {/* Ruta al Login */}
        <Route 
          path="/admin" 
          element={<PrivateRoute element={<Admin />} />} 
        />
        <Route path="/register" element={<Register />} /> {/* Ruta para el registro */}
      </Routes>
    </Router>
  );
}

export default App;
