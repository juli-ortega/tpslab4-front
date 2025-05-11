import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Instrumento } from "../Models/Instrumento";
import { getInstrumento, updateInstrumento } from "../Service/InstrumentoService";
import Swal from "sweetalert2";
import { getCategoriaById, getCategorias } from "../Service/CategoriaService";
import { Categoria } from "../Models/Categoria";

interface InstrumentoFormData extends Partial<Omit<Instrumento, 'imagen'>> {
    imagen?: FileList;
    currentImage?: string;
}

export default function EditarInstrumento() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [currentImage, setCurrentImage] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
        setValue
    } = useForm<InstrumentoFormData>();

    const imagenFile = watch("imagen");

    // Efecto para cargar el instrumento
    useEffect(() => {
        const fetchInstrumento = async () => {
            try {
                if (!id) return;

                const instrumento = await getInstrumento(parseInt(id));
                setCurrentImage(instrumento.imagen || "");
                reset({
                    ...instrumento,
                    currentImage: instrumento.imagen,
                    categoria: instrumento.categoria.id // asegurate que esté disponible el id de la categoría
                });

            } catch (err) {
                setError("Error al cargar el instrumento");
                console.error(err);
            }
        };

        fetchInstrumento();
    }, [id, reset]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await getCategorias();
                setCategorias(data);
            } catch (error) {
                console.error("Error al cargar las categorías", error);
            }
        };

        fetchCategorias();
    }, []);


    // Efecto para manejar la vista previa de la imagen
    useEffect(() => {
        if (imagenFile && imagenFile.length > 0) {
            const file = imagenFile[0];
            if (file && file.type && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        } else {
            setImagePreview(null);
        }
    }, [imagenFile]);

    const validateImage = (files: FileList | undefined) => {
        if (!files || files.length === 0) return true; // No hay archivo, validación pasa

        const file = files[0];
        if (file.type && !file.type.startsWith('image/')) {
            return "Debe seleccionar un archivo de imagen válido";
        }

        return true;
    };

    const onSubmit = async (data: InstrumentoFormData) => {
        if (!id) return;

        setIsSubmitting(true);
        setError(null);

        console.log(data)

        try {
            const formData = new FormData();

            // Agregar solo los campos que se han modificado
            if (data.instrumento) formData.append('nombre', data.instrumento);
            if (data.marca) formData.append('marca', data.marca);
            if (data.modelo) formData.append('modelo', data.modelo);
            if (data.precio !== undefined) formData.append('precio', data.precio.toString());
            if (data.costoEnvio !== undefined) formData.append('costoEnvio', data.costoEnvio.toString());
            if (data.cantidadVendida !== undefined) formData.append('cantidadVendida', data.cantidadVendida.toString());
            if (data.descripcion) formData.append('descripcion', data.descripcion);
            if (data.categoria !== undefined) formData.append('categoria', data.categoria.toString());
            


            // Si hay una nueva imagen, agregarla
            if (data.imagen && data.imagen.length > 0) {
                formData.append('imagen', data.imagen[0]);
            }

            // Llamar al servicio de actualización
            const updatedInstrumento = await updateInstrumento(parseInt(id), formData);

            Swal.fire({
                title: '¡Éxito!',
                text: 'Instrumento actualizado correctamente',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/admin/instrumentos');
            });
        } catch (err) {
            setError("Error al actualizar el instrumento");
            console.error(err);
            Swal.fire({
                title: 'Error',
                text: 'No se pudo actualizar el instrumento',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Editar Instrumento</h1>
                    <button
                        onClick={() => navigate('/admin/instrumentos')}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                    >
                        Volver
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre
                            </label>
                            <input
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("instrumento")}
                            />
                            {errors.instrumento && (
                                <p className="mt-1 text-sm text-red-500">{errors.instrumento.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Marca
                            </label>
                            <input
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("marca")}
                            />
                            {errors.marca && (
                                <p className="mt-1 text-sm text-red-500">{errors.marca.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Modelo
                            </label>
                            <input
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("modelo")}
                            />
                            {errors.modelo && (
                                <p className="mt-1 text-sm text-red-500">{errors.modelo.message}</p>
                            )}
                        </div>

                        <input
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            step="0.01"
                            {...register("precio", {
                                valueAsNumber: true,
                                required: "El precio es obligatorio",
                                min: { value: 0, message: "El precio debe ser mayor que 0" }
                            })}
                        />
                        {errors.precio && (
                            <p className="mt-1 text-sm text-red-500">{errors.precio.message}</p>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Costo de Envío
                            </label>
                            <input
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("costoEnvio")}
                            />
                            {errors.costoEnvio && (
                                <p className="mt-1 text-sm text-red-500">{errors.costoEnvio.message}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cantidad Vendida
                            </label>
                            <input
                                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="number"
                                {...register("cantidadVendida", {
                                    valueAsNumber: true
                                })}
                            />
                            {errors.cantidadVendida && (
                                <p className="mt-1 text-sm text-red-500">{errors.cantidadVendida.message}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                            {...register("descripcion", {
                                minLength: {
                                    value: 10,
                                    message: "Mínimo 10 caracteres"
                                }
                            })}
                        />
                        {errors.descripcion && (
                            <p className="mt-1 text-sm text-red-500">{errors.descripcion.message}</p>
                        )}
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Categoría
                        </label>
                        <select
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            {...register("categoria", { required: "La categoría es obligatoria" })}
                            defaultValue=""
                        >
                            <option value="" disabled>Selecciona una categoría</option>
                            {categorias.map((categoria) => (
                                <option key={categoria.id} value={categoria.id}>
                                    {categoria.denominacion}
                                </option>
                            ))}
                        </select>
                        {errors.categoria && (
                            <p className="mt-1 text-sm text-red-500">{errors.categoria.message}</p>
                        )}
                    </div>


                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Imagen (opcional)
                        </label>
                        {(imagePreview || currentImage) && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-500 mb-2">
                                    {imagePreview ? "Vista previa de la nueva imagen" : "Imagen actual"}
                                </p>
                                <img
                                    src={imagePreview || `${currentImage}`}
                                    alt="Imagen del instrumento"
                                    className="h-32 object-contain border rounded"
                                />
                            </div>
                        )}
                        <input
                            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="file"
                            accept="image/*"
                            {...register("imagen", {
                                validate: validateImage
                            })}
                        />
                        {errors.imagen && (
                            <p className="mt-1 text-sm text-red-500">{errors.imagen.message}</p>
                        )}
                    </div>

                    <div className="mt-8 flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/instrumentos')}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:bg-blue-300"
                        >
                            {isSubmitting ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
