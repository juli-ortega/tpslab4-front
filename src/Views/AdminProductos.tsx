import { useEffect, useState } from "react";
import { Instrumento } from "../Models/Instrumento";
import { getInstrumentos, deleteInstrumento } from "../Service/InstrumentoService";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useAuth } from "../AuthContext";

export default function AdminInstrumentos() {
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const {userRole} = useAuth()

    useEffect(() => {
        const fetchInstrumentos = async () => {
            try {
                const data = await getInstrumentos();
                setInstrumentos(data);
                setLoading(false);
            } catch (err) {
                setError("Error al cargar los instrumentos");
                setLoading(false);
                console.error(err);
            }
        };

        fetchInstrumentos();
    }, []);

    const handleDelete = async (id: number) => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "No podrás revertir esta acción",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, borrar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                await deleteInstrumento(id);
                setInstrumentos(instrumentos.filter(instr => instr.id !== id));
                Swal.fire(
                    'Eliminado!',
                    'El instrumento ha sido eliminado.',
                    'success'
                );
            }
        } catch (err) {
            Swal.fire(
                'Error',
                'No se pudo eliminar el instrumento',
                'error'
            );
            console.error(err);
        }
    };

    if (loading) {
        return <div className="text-center py-8">Cargando instrumentos...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Administración de Instrumentos</h1>
                <Link 
                    to="/admin/instrumentos/nuevo"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Agregar Nuevo
                </Link>
                <Link 
                    to="/admin/instrumentos/categoria"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Agregar Nueva Categoria
                </Link>
                <Link 
                    to="/admin/instrumentos/estadisticas"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Ir a estadisticas
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">ID</th>
                            <th className="py-3 px-4 text-left">Instrumento</th>
                            <th className="py-3 px-4 text-left">Marca</th>
                            <th className="py-3 px-4 text-left">Precio</th>
                            <th className="py-3 px-4 text-left">Stock</th>
                            <th className="py-3 px-4 text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {instrumentos.map((instrumento) => (
                            <tr key={instrumento.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4">{instrumento.id}</td>
                                <td className="py-3 px-4">
                                    <div className="flex items-center">
                                        {instrumento.imagen && (
                                            <img 
                                            src={`${instrumento?.imagen}`}
                                                alt={instrumento.instrumento}
                                                className="w-10 h-10 object-cover rounded mr-3"
                                            />
                                        )}
                                        {instrumento.instrumento}
                                    </div>
                                </td>
                                <td className="py-3 px-4">{instrumento.marca}</td>
                                <td className="py-3 px-4">${instrumento.precio}</td>
                                <td className="py-3 px-4">{instrumento.cantidadVendida}</td>
                                <td className="py-3 px-4">
                                    <div className="flex justify-center space-x-2">
                                        <Link
                                            to={`/admin/instrumentos/editar/${instrumento.id}`}
                                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(instrumento.id!)}
                                            className={userRole === "ADMIN" ? "bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm" : "hidden"}
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}