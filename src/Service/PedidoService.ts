import { Pedido } from '../Models/Pedido';

export const getPedidos = async (): Promise<Pedido[]> => {
    const url = 'http://localhost:8080/api/v1/pedido'; // Asegúrate de que esta URL sea correcta

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error al obtener los pedidos');
        }

        const data: Pedido[] = await response.json();
        console.log('Pedidos obtenidos:', data);
        return data;
    } catch (error) {
        console.error('Error al obtener los pedidos:', error);
        throw error;
    }
};
