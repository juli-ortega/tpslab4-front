import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { crearPedidoConPreferencia } from "../Service/MercadoPagoService";
import type { PreferenceMP } from "../Models/PreferenceMP";
import type { Pedido } from "../Models/Pedido";
import type { Instrumento } from "../Models/Instrumento";
import type { PedidoDto } from "../Service/MercadoPagoService";
import { useState } from "react";
import { useCart } from "../CartContext";

type Props = {
  montoCarrito: number;
};

export default function CheckoutMP({ montoCarrito = 0 }: Props) {
  const [idPreference, setIdPreference] = useState<string>("");
  const { carrito, vaciarCarrito } = useCart();

  const getPreferenceMP = async () => {
    if (montoCarrito > 0 && carrito.length > 0) {
      const pedidoDto: PedidoDto = {
        pedido: {
          id: 0, // o null si usas nullable
          fecha: new Date().toISOString(),
          total: montoCarrito,
        } as Pedido,
        instrumentos: carrito as Instrumento[],
      };

      try {
        const response: PreferenceMP = await crearPedidoConPreferencia(
          pedidoDto
        );
        if (response && response.id) {
          setIdPreference(response.id);
        } else {
          alert("No se pudo obtener la preferencia de pago.");
        }
      } catch (error) {
        console.error("Error creando preferencia MP:", error);
        alert("Ocurrió un error al crear la preferencia de pago.");
      }
    } else {
      alert("Agregue un instrumento al carrito");
    }
  };

  initMercadoPago("TEST-ae238d69-1487-42e4-ad8a-4a50bfcb8418", {
    locale: "es-AR",
  });

  return (
    <div>
      <button
        onClick={getPreferenceMP}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Comprar con Mercado Pago
      </button>

      {idPreference && (
        <div>
          <Wallet
            initialization={{
              preferenceId: idPreference,
              redirectMode: "blank",
            }}
            customization={{ texts: { valueProp: "smart_option" } }}
          />
        </div>
      )}
    </div>
  );
}
