import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function VerifyLink() {
  const [isVerified, setIsVerified] = useState(false);
  const [isAlreadyVerified, setIsAlreadyVerified] = useState(false); // Estado para verificar si ya está verificado
  const [error, setError] = useState('');
  const { email } = useParams(); // Obtenemos el correo del enlace
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/verify-link`, { 
          email 
        });

        // Imprime la respuesta del servidor para depuración
        console.log('Response from server:', response.data);

        if (response.data.success) {
          if (response.data.message === 'Usuario ya verificado. Por favor, inicia sesión.') {
            setIsAlreadyVerified(true);  // Marca que el usuario ya está verificado
            setIsVerified(true);  // Cambia el estado de verificación a true
            setTimeout(() => {
              navigate('/login'); // Redirigir a la página de login después de 5 segundos
            }, 5000);  // 5 segundos
          } else {
            // Si la verificación fue exitosa, almacenamos el token y los datos del usuario
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userRole', response.data.role);
            localStorage.setItem('userName', response.data.name);
            localStorage.setItem('userSurname', response.data.surname);
            localStorage.setItem('userId', response.data.userId); // Guardar el userId

            // Emitir evento para notificar la autenticación
            window.dispatchEvent(new Event('authChange'));

            setIsVerified(true);
            setTimeout(() => {
              navigate('/'); // Redirigir a la página principal después de 5 segundos
            }, 5000);  // 5 segundos
          }
        } else {
          setError(response.data.message || 'Error desconocido al verificar el usuario');
        }
      } catch (err) {
        setError('Error al verificar el usuario');
        console.error(err);
      }
    };

    verifyUser();
  }, [email, navigate]);

  return (
    <div className="verify-link-container">
      {isVerified ? (
        isAlreadyVerified ? (
          <h2>El usuario ya está verificado. Redirigiendo a Inicio de sesión...</h2> // Mensaje para cuando ya está verificado
        ) : (
          <h2>Usuario verificado. Iniciando sesión...</h2> // Mensaje para cuando el usuario es verificado por primera vez
        )
      ) : (
        <h2>{error ? error : 'Verificando usuario...'}</h2>
      )}
    </div>
  );
}

export default VerifyLink;
