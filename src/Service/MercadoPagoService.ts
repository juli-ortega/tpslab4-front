import { Pedido } from '../Models/Pedido';
import { PreferenceMP } from '../Models/PreferenceMP';

export type PedidoDto = {
  pedido: Pedido;
  instrumentos: any[]; // o tu tipo Instrumento[]
};

// 🔧 Función para eliminar el `id` del pedido
function limpiarIdPedidoDto(dto: PedidoDto): PedidoDto {
  const copia: PedidoDto = {
    pedido: { ...dto.pedido },
    instrumentos: dto.instrumentos
  };
  delete (copia.pedido as any).id; // elimina id si existe
  return copia;
}

export async function crearPedidoConPreferencia(pedidoDto: PedidoDto): Promise<PreferenceMP> {
  const urlServer = "http://localhost:8080/api/v1/pedido/crear-con-mp";

  // 🧹 Limpiar el id antes de enviar
  const pedidoDtoLimpio = limpiarIdPedidoDto(pedidoDto);

  const response = await fetch(urlServer, {
    method: "POST",
    body: JSON.stringify(pedidoDtoLimpio),
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error("Error al crear pedido con preferencia");
  }

  const data = await response.json();
  console.log("Respuesta del servidor:", data);

  return data.preferenciaMp as PreferenceMP;
}
