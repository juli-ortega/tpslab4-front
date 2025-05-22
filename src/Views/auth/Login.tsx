import React, { useState } from "react";
import { Usuario } from "../../Models/Usuario";
import LoginUser from "../../Service/auth/login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export default function Login() {
  const [usuario, setUsuario] = useState<Usuario>({
    nombreUsuario: "",
    clave: "",
  });

  const [errors, setErrors] = useState<{
    nombreUsuario?: string;
    clave?: string;
  }>({});
  const navigate = useNavigate();
  const { login } = useAuth();
  const validate = () => {
    const newErrors: { nombreUsuario?: string; clave?: string } = {};

    if (!usuario.nombreUsuario.trim()) {
      newErrors.nombreUsuario = "El nombre de usuario es obligatorio";
    }
    if (!usuario.clave.trim()) {
      newErrors.clave = "La contraseña es obligatoria";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await LoginUser(usuario);

      if (!response) return;

      login(response.token, response.role);

      navigate("/admin/instrumentos");
    } catch (error) {
      console.error("Error de login", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
    // Limpiar error del campo que se está modificando
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  return (
    <div className="max-w-3xl mx-auto ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-6 bg-slate-100 py-8 rounded-lg shadow-lg"
      >
        <h1 className="font-bold text-2xl">Iniciar Sesion</h1>

        <div className="flex flex-col justify-center items-center gap-2">
          <label htmlFor="nombreUsuario">Usuario</label>
          <input
            type="text"
            placeholder="usuario"
            name="nombreUsuario"
            value={usuario.nombreUsuario}
            onChange={handleChange}
            className={`border p-2 rounded ${
              errors.nombreUsuario ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.nombreUsuario && (
            <p className="text-red-600 text-sm">{errors.nombreUsuario}</p>
          )}
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <label htmlFor="clave">Contraseña</label>
          <input
            type="password"
            placeholder="contraseña"
            name="clave"
            value={usuario.clave}
            onChange={handleChange}
            className={`border p-2 rounded ${
              errors.clave ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.clave && (
            <p className="text-red-600 text-sm">{errors.clave}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-slate-400 p-2 rounded-lg text-white cursor-pointer hover:bg-slate-600"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}
