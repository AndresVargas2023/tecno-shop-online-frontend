import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente que se encarga de proteger las rutas privadas
const PrivateRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token'); // O cualquier otro método para verificar autenticación

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
