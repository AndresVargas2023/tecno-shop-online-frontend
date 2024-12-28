import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function VerifyLink() {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  
  const email = new URLSearchParams(location.search).get('email');
  const code = new URLSearchParams(location.search).get('code');

  useEffect(() => {
    if (email && code) {
      axios.get(`${process.env.REACT_APP_API_URL}/auth/verify`, {
        params: {
          email: email,
          code: code
        }
      })
      .then(response => {
        setMessage(response.data.message);
        setTimeout(() => {
          navigate('/login');  // Redirige a login u otra página
        }, 3000);
      })
      .catch(err => {
        setMessage('Hubo un error en la verificación.');
      });
    } else {
      setMessage('Faltan parámetros en la URL.');
    }
  }, [email, code, navigate]);

  return (
    <div>
      <h2>{message}</h2>
    </div>
  );
}

export default VerifyLink;
