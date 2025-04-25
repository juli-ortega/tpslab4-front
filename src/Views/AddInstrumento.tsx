import { useForm } from "react-hook-form";
import { Instrumento } from "../Models/Instrumento";
import { saveInstrumento as fetchSaveInstrumento } from "../Service/InstrumentoService";
import { useState, ChangeEvent } from "react";

// Extiende la interfaz Instrumento para manejar el archivo
interface InstrumentoFormData extends Omit<Instrumento, 'imagen'> {
    imagen?: FileList; // Para manejar el input de tipo file
}

export default function AddInstrumento() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<InstrumentoFormData>();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const onSubmit = async (data: InstrumentoFormData) => {
        if (!data.imagen || data.imagen.length === 0) {
            setSubmitError("Debe seleccionar una imagen.");
            return;
        }

        const file = data.imagen[0];
        
        // Validar tipo de archivo (opcional)
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            setSubmitError("Formato de imagen no válido. Use JPEG, PNG o GIF.");
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            // Crear el objeto instrumento sin el campo imagen (que es FileList)
            const instrumentoData: Omit<Instrumento, 'imagen'> & { imagen?: string } = {
                ...data,
                imagen: undefined // No enviar el FileList directamente
            };

            // Llamar al servicio con los datos y el archivo
            await fetchSaveInstrumento(instrumentoData, file);
            
            setSubmitSuccess(true);
            reset(); // Limpiar el formulario después del éxito
        } catch (err) {
            console.error("Error al guardar:", err);
            setSubmitError(err instanceof Error ? err.message : "Error desconocido al guardar el instrumento");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <article className="pb-2 m-20">
            <div className="grid items-center justify-center max-w-2xl mx-auto">
                <h1 className="text-3xl pb-3 font-bold">Agregar instrumento</h1>

                {submitSuccess && (
                    <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
                        Instrumento agregado correctamente!
                    </div>
                )}

                {submitError && (
                    <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
                        {submitError}
                    </div>
                )}

                <form
                    className="grid gap-4 p-6 bg-white rounded-lg shadow-md"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                >
                    {/* Campos del formulario */}
                    <div className="grid gap-2">
                        <label htmlFor="instrumento" className="font-medium">Instrumento*</label>
                        <input
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            {...register("instrumento", { 
                                required: "Este campo es requerido",
                                minLength: {
                                    value: 2,
                                    message: "Mínimo 2 caracteres"
                                }
                            })}
                        />
                        {errors.instrumento && (
                            <span className="text-red-500 text-sm">{errors.instrumento.message}</span>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="marca" className="font-medium">Marca*</label>
                        <input
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            {...register("marca", { 
                                required: "Este campo es requerido",
                                minLength: {
                                    value: 2,
                                    message: "Mínimo 2 caracteres"
                                }
                            })}
                        />
                        {errors.marca && (
                            <span className="text-red-500 text-sm">{errors.marca.message}</span>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="modelo" className="font-medium">Modelo*</label>
                        <input
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="text"
                            {...register("modelo", { 
                                required: "Este campo es requerido",
                                minLength: {
                                    value: 2,
                                    message: "Mínimo 2 caracteres"
                                }
                            })}
                        />
                        {errors.modelo && (
                            <span className="text-red-500 text-sm">{errors.modelo.message}</span>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="descripcion" className="font-medium">Descripción*</label>
                        <textarea
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                            {...register("descripcion", { 
                                required: "Este campo es requerido",
                                minLength: {
                                    value: 10,
                                    message: "Mínimo 10 caracteres"
                                }
                            })}
                        />
                        {errors.descripcion && (
                            <span className="text-red-500 text-sm">{errors.descripcion.message}</span>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="imagen" className="font-medium">Imagen*</label>
                        <input
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="file"
                            accept="image/*"
                            {...register("imagen", { 
                                required: "Este campo es requerido",
                                validate: {
                                    isImage: (files) => 
                                        files && files[0] && files[0].type.startsWith('image/') 
                                        || "Debe ser un archivo de imagen"
                                }
                            })}
                        />
                        {errors.imagen && (
                            <span className="text-red-500 text-sm">{errors.imagen.message}</span>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="precio" className="font-medium">Precio*</label>
                        <input
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            step="0.01"
                            min="0"
                            {...register("precio", {
                                required: "Este campo es requerido",
                                min: { 
                                    value: 0, 
                                    message: "Debe ser mayor o igual a 0" 
                                },
                                valueAsNumber: true
                            })}
                        />
                        {errors.precio && (
                            <span className="text-red-500 text-sm">{errors.precio.message}</span>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="costoEnvio" className="font-medium">Costo de envío*</label>
                        <input
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            step="0.01"
                            min="0"
                            {...register("costoEnvio", {
                                required: "Este campo es requerido",
                                min: { 
                                    value: 0, 
                                    message: "Debe ser mayor o igual a 0" 
                                },
                                valueAsNumber: true
                            })}
                        />
                        {errors.costoEnvio && (
                            <span className="text-red-500 text-sm">{errors.costoEnvio.message}</span>
                        )}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="cantidadVendida" className="font-medium">Cantidad vendida*</label>
                        <input
                            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="number"
                            min="0"
                            {...register("cantidadVendida", {
                                required: "Este campo es requerido",
                                min: { 
                                    value: 0, 
                                    message: "Debe ser mayor o igual a 0" 
                                },
                                valueAsNumber: true
                            })}
                        />
                        {errors.cantidadVendida && (
                            <span className="text-red-500 text-sm">{errors.cantidadVendida.message}</span>
                        )}
                    </div>

                    <button 
                        className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Guardando..." : "Agregar Instrumento"}
                    </button>
                </form>
            </div>
        </article>
    );
}