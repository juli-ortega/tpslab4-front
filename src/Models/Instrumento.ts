export type Instrumento = {
    id: number
    instrumento: string
    marca: string
    modelo: string
    imagen: string
    precio: number
    costoEnvio: string // Podrías hacerlo más específico como `"G" | string` si querés
    cantidadVendida: number
    descripcion: string
}
