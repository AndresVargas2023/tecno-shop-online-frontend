import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  Typography,
  useMediaQuery
} from '@mui/material';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const isSmallScreen = useMediaQuery('(max-width:600px)'); // Detecta si la pantalla es pequeña

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/auth/users`);
        setUsers(response.data);
      } catch (err) {
        setError('Error al cargar los usuarios.');
      }
    };

    fetchUsers();
  }, [API_URL]);

  return (
    <div className="admin-users-container" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        Lista de Usuarios
      </Typography>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

      <TableContainer component={Box} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Apellido</strong></TableCell>
              <TableCell><strong>Correo Electrónico</strong></TableCell>
              <TableCell><strong>Rol</strong></TableCell>
              <TableCell><strong>Acciones</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.surname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role || 'No asignado'}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate(`/admin/users/edit/${user._id}`)}
                        sx={{ marginBottom: isSmallScreen ? '10px' : '0', marginRight: isSmallScreen ? '0' : '10px' }}
                      >
                        Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
                            axios.delete(`${API_URL}/auth/users/${user._id}`);
                            setUsers(users.filter((u) => u._id !== user._id));
                          }
                        }}
                        sx={{ marginBottom: isSmallScreen ? '10px' : '0' }}
                      >
                        Eliminar
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" align="center">No se encontraron usuarios.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default AdminUsers;
