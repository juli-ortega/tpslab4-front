import { useForm } from "react-hook-form"
import { Instrumento } from "../Models/Instrumento"
import { saveInstrumento as fetchSaveInstrumento } from "../Service/InstrumentoService"

export default function AddInstrumento() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Instrumento>()

    const onSubmit = async (data: Instrumento) => {
        const formData = new FormData()
        for (const key in data) {
            // @ts-ignore
            formData.append(key, data[key])
        }

        try {
            const data = await fetchSaveInstrumento(formData)
            console.log(data)
            alert("Instrumento agregado correctamente")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <article className="pb-2 m-20">
            <div className="grid items-center justify-center">
                <h1 className="text-3xl pb-3">Agregar instrumento</h1>

                <form
                    className="grid gap-4 p-2"
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <div className="grid gap-2">
                        <label htmlFor="instrumento">Instrumento</label>
                        <input
                            className="border-4"
                            type="text"
                            {...register("instrumento", { required: "Este campo es requerido" })}
                        />
                        {errors.instrumento && <span className="text-red-500">{errors.instrumento.message}</span>}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="marca">Marca</label>
                        <input
                            className="border-4"
                            type="text"
                            {...register("marca", { required: "Este campo es requerido" })}
                        />
                        {errors.marca && <span className="text-red-500">{errors.marca.message}</span>}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="modelo">Modelo</label>
                        <input
                            className="border-4"
                            type="text"
                            {...register("modelo", { required: "Este campo es requerido" })}
                        />
                        {errors.modelo && <span className="text-red-500">{errors.modelo.message}</span>}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="descripcion">Descripción</label>
                        <input
                            className="border-4"
                            type="text"
                            {...register("descripcion", { required: "Este campo es requerido" })}
                        />
                        {errors.descripcion && <span className="text-red-500">{errors.descripcion.message}</span>}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="imagen">Imagen</label>
                        <input
                            className="border-4"
                            type="file"
                            {...register("imagen", { required: "Este campo es requerido" })}
                        />
                        {errors.imagen && <span className="text-red-500">{errors.imagen.message}</span>}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="precio">Precio</label>
                        <input
                            className="border-4"
                            type="number"
                            step="0.01"
                            {...register("precio", {
                                required: "Este campo es requerido",
                                min: { value: 0, message: "Debe ser mayor o igual a 0" },
                            })}
                        />
                        {errors.precio && <span className="text-red-500">{errors.precio.message}</span>}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="costoEnvio">Costo de envío</label>
                        <input
                            className="border-4"
                            type="number"
                            step="0.01"
                            {...register("costoEnvio", {
                                required: "Este campo es requerido",
                                min: { value: 0, message: "Debe ser mayor o igual a 0" },
                            })}
                        />
                        {errors.costoEnvio && <span className="text-red-500">{errors.costoEnvio.message}</span>}
                    </div>

                    <div className="grid gap-2">
                        <label htmlFor="cantidadVendida">Cantidad vendida</label>
                        <input
                            className="border-4"
                            type="number"
                            {...register("cantidadVendida", {
                                required: "Este campo es requerido",
                                min: { value: 0, message: "Debe ser mayor o igual a 0" },
                            })}
                        />
                        {errors.cantidadVendida && <span className="text-red-500">{errors.cantidadVendida.message}</span>}
                    </div>

                    <button className="p-2 bg-slate-700 text-white" type="submit">Agregar</button>
                </form>
            </div>
        </article>
    )
}
