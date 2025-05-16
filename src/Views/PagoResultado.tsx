import React, { useEffect, useState } from 'react';

export default function PagoResultado() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('payment_id');
    const status = urlParams.get('status');
    const preferenceId = urlParams.get('preference_id');

    if (paymentId && status && preferenceId) {
      fetch('http://localhost:8080/api/pedidos/actualizar-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentId, status, preferenceId }),
      })
        .then((res) => {
          if (res.ok) {
            setMensaje('Estado de pago actualizado correctamente.');
          } else {
            setMensaje('Error al actualizar el estado de pago.');
          }
        })
        .catch(() => {
          setMensaje('Error de conexión al actualizar estado.');
        });
    } else {
      setMensaje('No se encontraron datos de pago en la URL.');
    }
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Resultado del Pago</h2>
      <p>{mensaje}</p>
    </div>
  );
}
