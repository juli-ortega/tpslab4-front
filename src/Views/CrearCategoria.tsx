import React, { useState } from "react";
import { Categoria } from "../Models/Categoria";
import { createCategory } from "../Service/CategoriaService";
import { useNavigate } from "react-router-dom";

export default function CrearCategoria() {
  const [denominacion, setDenominacion] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensaje("");

    try {
      if (!denominacion.trim()) {
        setError("La denominación no puede estar vacía");
        return;
      }

      const nuevaCategoria = await createCategory(denominacion);

      if (nuevaCategoria) {
        setMensaje(
          `Categoría "${nuevaCategoria.denominacion}" creada exitosamente!`
        );
        setDenominacion(""); // Limpiar el campo después de crear
      } else {
        setError("No se pudo crear la categoría");
      }
    } catch (err) {
      setError("Ocurrió un error al crear la categoría");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Crear Categoria</h1>
        <button
            onClick={() => navigate('/admin/instrumentos')}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
            Volver
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="denominacion"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre de la categoría:
          </label>
          <input
            type="text"
            id="denominacion"
            value={denominacion}
            onChange={(e) => setDenominacion(e.target.value)}
            placeholder="Ingrese el nombre de la categoría"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Crear Categoría
        </button>
      </form>

      {mensaje && (
        <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {mensaje}
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
