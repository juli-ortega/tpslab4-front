import { Instrumento } from "./Instrumento"
import { Pedido } from "./Pedido"

export type PedidoDetalle = {
    cantidad: number
    pedido: Pedido
    instrumento: Instrumento
}