import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import createPreferenceMP from "../Service/MercadoPagoService";
import { PreferenceMP } from "../Models/PreferenceMP";
import { useState } from "react";

type props = {
    montoCarrito: number
}

export default function CheckoutMP({ montoCarrito = 0 }:props) {
  const [idPreference, setIdPreference] = useState<string>("");

  const getPreferenceMP = async () => {
    if (montoCarrito > 0) {
      const response: PreferenceMP = await createPreferenceMP({id: 0, fecha: new Date().toISOString(), total: montoCarrito});
      if (response) {
        setIdPreference(response.id);
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
      <button onClick={getPreferenceMP}>Comprar con Mercado Pago</button>
      <div className={idPreference ? "block" : "hidden"}>
        <Wallet
          initialization={{ preferenceId: idPreference, redirectMode: "blank" }}
          customization={{ texts: { valueProp: "smart_option" } }}
        />
      </div>
    </div>
  );
}
