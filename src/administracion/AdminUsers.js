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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Box,
  Grid
} from '@mui/material';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

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

  const handlePasswordUpdate = async () => {
    if (!newPassword) {
      alert('Por favor, introduce una nueva contraseña.');
      return;
    }

    setLoading(true);

    try {
      await axios.patch(`${API_URL}/auth/users/${selectedUserId}/password`, {
        newPassword,
      });
      alert('Contraseña actualizada correctamente.');
      setNewPassword('');
      setSelectedUserId(null);
      setOpenDialog(false); // Cerrar el diálogo
    } catch (err) {
      setError('Error al actualizar la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-users-container" style={{ padding: '20px' }}>
      <h1 className="admin-users-header" style={{ fontWeight: 'bold' }}>Lista de Usuarios</h1>
      {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

      <TableContainer component={Box} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Nombre</strong></TableCell>
              <TableCell><strong>Apellido</strong></TableCell>
              <TableCell><strong>Correo Electrónico</strong></TableCell>
              <TableCell><strong>Dirección</strong></TableCell>
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
                  <TableCell>{user.address || 'No disponible'}</TableCell>
                  <TableCell>{user.role || 'No asignado'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/admin/users/edit/${user._id}`)}
                      style={{ marginRight: '10px' }}
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
                      style={{ marginRight: '10px' }}
                    >
                      Eliminar
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setSelectedUserId(user._id);
                        setOpenDialog(true);
                      }}
                      style={{ marginTop: '10px' }}
                    >
                      Cambiar Contraseña
                    </Button>
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

      {/* Diálogo para cambiar la contraseña */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cambiar Contraseña</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Nueva Contraseña"
              type="password"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {loading && <CircularProgress sx={{ alignSelf: 'center' }} />}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Cancelar</Button>
          <Button
            onClick={handlePasswordUpdate}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminUsers;
