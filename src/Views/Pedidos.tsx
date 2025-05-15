import React, { useEffect, useState } from 'react';
import { Pedido } from '../Models/Pedido';
import { getPedidos } from '../Service/PedidoService';
import { getPedidosDetalles } from '../Service/PedidoService';
import { PedidoDetalle } from '../Models/PedidoDetalle';
import { formatDate } from '../utils/formatDate';

const PedidosView: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [detallesPorPedido, setDetallesPorPedido] = useState<{ [key: number]: PedidoDetalle[] }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const data = await getPedidos();
                setPedidos(data);

                // Para cada pedido, busco sus detalles
                const detallesPromises = data.map(async (pedido) => {
                    const detalles = await getPedidosDetalles(pedido.id);
                    return { pedidoId: pedido.id, detalles };
                });

                const detallesResults = await Promise.all(detallesPromises);

                const detallesMap: { [key: number]: PedidoDetalle[] } = {};
                detallesResults.forEach(({ pedidoId, detalles }) => {
                    detallesMap[pedidoId] = detalles;
                });

                setDetallesPorPedido(detallesMap);

            } catch (error) {
                console.error('Error al obtener los pedidos o detalles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }
    

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
            {pedidos.length === 0 ? (
                <p>No hay pedidos disponibles.</p>
            ) : (
                <ul className="space-y-6">
                    {pedidos.map((pedido) => (
                        <li key={pedido.id} className="border p-4 rounded-lg shadow-md">
                            <p><strong>Fecha:</strong> {formatDate(pedido.fecha)}</p>
                            <p><strong>Total:</strong> ${pedido.total}</p>

                            <h4 className="font-semibold mt-3">Detalles:</h4>
                            {detallesPorPedido[pedido.id]?.length ? (
                                <ul className="pl-4 list-disc">
                                    {detallesPorPedido[pedido.id].map((detalle, index) => (
                                        <li key={index}>
                                            {detalle.instrumento.instrumento} — Cantidad: {detalle.cantidad}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500">Sin detalles.</p>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PedidosView;
