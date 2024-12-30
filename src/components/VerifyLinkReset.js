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
        setTimeout(() => navigate(`/reset-password/${token}`), 2000); // Redirige a la vista de restablecimiento
      } catch (err) {
        setError(err.response?.data?.message || "Token inválido o expirado.");
        setMessage("");
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
