import { Categoria } from "./Categoria"

export type Instrumento = {
    id: number
    instrumento: string
    marca: string
    modelo: string
    imagen: File
    precio: number
    costoEnvio: string // Podrías hacerlo más específico como `"G" | string` si querés
    cantidadVendida: number
    descripcion: String
    categoria: Categoria
    cantidad: number
}
