import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './components.css';

function Verification() {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return <p>Error: No se proporcionó un correo electrónico.</p>;
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/verify`, {
        params: {
          email: email,          // Enviamos el email
          code: verificationCode // Enviamos el código ingresado
        }
      });

      // Si la verificación fue exitosa
      const { message } = response.data;
      setError('');
      alert(message);
      navigate('/login'); // O redirige donde prefieras
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error al verificar el código');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="verification-container">
      <h3 className="verification-message">
        Se ha enviado un correo con el código de verificación. Verifica tu correo.
      </h3>
      <form onSubmit={handleVerify} className="form-verify">
        <input
          className="input-field"
          type="text"
          placeholder="Código de verificación"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <button type="submit" className="submit-button" disabled={isLoading}>
          {isLoading ? 'Procesando...' : 'Verificar Código'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Verification;
