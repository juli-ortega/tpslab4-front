import React, { useEffect, useState } from 'react';
import { Pedido } from '../Models/Pedido';
import { getPedidos } from '../Service/PedidoService';

const PedidosView: React.FC = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const data = await getPedidos();
                setPedidos(data);
            } catch (error) {
                console.error('Error al obtener los pedidos:', error);
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
                <ul className="space-y-4">
                    {pedidos.map((pedido) => (
                        <li key={pedido.id} className="border p-4 rounded-lg shadow-md">
                            <p><strong>ID:</strong> {pedido.id}</p>
                            <p><strong>Fecha:</strong> {pedido.fecha}</p>
                            <p><strong>Total:</strong> ${pedido.total}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PedidosView;
