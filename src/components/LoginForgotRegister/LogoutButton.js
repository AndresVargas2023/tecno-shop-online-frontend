import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Elimina el token del almacenamiento local
        localStorage.removeItem('token');
        // Redirige al inicio de sesión
        navigate('/login');
    };

    return (
        <button
            onClick={handleLogout}
            style={{
                backgroundColor: '#ff4757',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
            }}
        >
            Cerrar Sesión 🚪
        </button>
    );
};

export default LogoutButton;
