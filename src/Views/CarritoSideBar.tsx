import React, { useState } from 'react';
import { useCart } from '../CartContext';

export default function CarritoSidebar() {
  const [abierto, setAbierto] = useState(false);
  const { carrito, total, vaciarCarrito } = useCart();

  return (
    <>
      <button onClick={() => setAbierto(!abierto)} className="btn btn-primary fixed top-5 right-5 z-50">
        🛒 ({carrito.length})
      </button>

      {abierto && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-y-auto z-40">
          <h2 className="text-lg font-bold mb-4">Carrito</h2>
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            carrito.map((producto, index) => (
              <div key={index} className="mb-2 border-b pb-2">
                <p>{producto.instrumento}</p>
                <p>${producto.precio}</p>
              </div>
            ))
          )}
          <h3 className="text-lg mt-4">Total: ${total()}</h3>
          <button onClick={vaciarCarrito} className="btn btn-danger mt-3">Vaciar carrito</button>
        </div>
      )}
    </>
  );
}
