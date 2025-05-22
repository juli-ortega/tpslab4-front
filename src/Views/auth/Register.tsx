import React, { useState } from "react";
import { Usuario } from "../../Models/Usuario";
import RegisterUser from "../../Service/auth/register";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario>({
    nombreUsuario: "",
    clave: "",
    rol: "",
  });

  // Estado para errores
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!usuario.nombreUsuario.trim()) {
      newErrors.nombreUsuario = "El usuario es obligatorio";
    }

    if (!usuario.clave) {
      newErrors.clave = "La contraseña es obligatoria";
    } else if (usuario.clave.length < 4) {
      newErrors.clave = "La contraseña debe tener al menos 4 caracteres";
    }

    if (!usuario.rol) {
      newErrors.rol = "Debes seleccionar un rol";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Datos del registro:", usuario);
    try {
      await RegisterUser(usuario);
      navigate("/");
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      // Aquí podrías mostrar un mensaje de error al usuario
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsuario({
      ...usuario,
      rol: e.target.value,
    });
  };

  return (
    <div className="max-w-3xl mx-auto ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-6 bg-slate-100 py-8 rounded-lg shadow-lg"
      >
        <h1 className="font-bold text-2xl">Registrate</h1>
        <div className="flex flex-col justify-center items-center gap-6">
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

        <div className="flex flex-col justify-center items-center gap-5">
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

        {/* Radios para elegir el role */}
        <div className="flex flex-col gap-2">
          <span>Seleccioná un rol:</span>
          <label>
            <input
              type="radio"
              name="role"
              value="ADMIN"
              checked={usuario.rol === "ADMIN"}
              onChange={handleRoleChange}
            />
            ADMIN
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="USER"
              checked={usuario.rol === "USER"}
              onChange={handleRoleChange}
            />
            USER
          </label>
          {errors.rol && <p className="text-red-600 text-sm">{errors.rol}</p>}
        </div>

        <button
          type="submit"
          className="bg-slate-400 p-2 rounded-lg text-white cursor-pointer hover:bg-slate-600"
        >
          Registrate
        </button>
      </form>
    </div>
  );
}
