import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams(); // Token obtenido desde la URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Llamada a la API para restablecer la contraseña
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/reset-password`,
        {
          token,
          newPassword,
        }
      );

      // Guardar el token de sesión en localStorage
      const { token: newToken, message: successMessage, role, name, surname, userId } = response.data;
      localStorage.setItem("token", newToken);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userName", name); // Guardamos el nombre
      localStorage.setItem("userSurname", surname); // Guardamos el apellido
      localStorage.setItem("userId", userId); // Guardamos el userId

      setMessage(successMessage);
      setError("");

      // Emitir evento de autenticación
      window.dispatchEvent(new Event("authChange"));

      // Redirigir al login después de un tiempo o a la página principal
      setTimeout(() => {
        // Redirigir a la página principal
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error al restablecer la contraseña.");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Restablecer Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nueva Contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Restablecer</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
