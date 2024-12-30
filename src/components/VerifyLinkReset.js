import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyLink = () => {
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Usando la variable de entorno REACT_APP_API_URL
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/verify-link/${token}`);
        
        setMessage(response.data.message);
        setError("");

        // Redirigir a la vista de restablecimiento después de un breve retraso
        setTimeout(() => navigate(`/reset-password/${token}`), 2000);
      } catch (err) {
        // Manejo de error si el token es inválido o ha expirado
        const errorMessage = err.response?.data?.message || "Token inválido o expirado.";
        setError(errorMessage);
        setMessage("");

        // Redirige al login si el token es inválido o ha expirado
        if (errorMessage.includes("expirado") || errorMessage.includes("inválido")) {
          setTimeout(() => navigate("/login"), 3000); // Redirige al login después de 3 segundos
        }
      }
    };

    verifyToken();
  }, [token, navigate]);

  return (
    <div>
      <h2>Verificando Enlace</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default VerifyLink;
