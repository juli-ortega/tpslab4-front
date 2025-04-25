import React, { useState, useEffect } from 'react';
import { useCart } from '../CartContext';

export default function CarritoSidebar() {
  const [abierto, setAbierto] = useState(false);
  const { carrito, total, vaciarCarrito, guardarCarrito, submitSuccess, setSubmitSuccess } = useCart();

  useEffect(() => {
    if (submitSuccess) {
      const timer = setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000); // Ocultar el mensaje después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, setSubmitSuccess]);

  return (
    <>
      <div className="fixed top-5 right-5 z-50">
        <button onClick={() => setAbierto(!abierto)} className="btn btn-primary relative">
          🛒
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {carrito.length}
          </span>
        </button>
      </div>

      {abierto && (
        <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-y-auto z-40">
          <h2 className="text-lg font-bold mb-4">Carrito</h2>
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            carrito.map((producto, index) => (
              <div key={index} className="mb-2 border-b pb-2 flex items-center gap-4">
                <img src={`${producto.imagen}`} alt={producto.instrumento} className="w-16 h-16 object-cover rounded" />
                <div>
                  <p className="font-semibold">{producto.instrumento}</p>
                  <p className="text-gray-600">${producto.precio}</p>
                </div>
              </div>
            ))
          )}
          <h3 className="text-lg mt-4">Total: ${total()}</h3>
          <div className='grid grid-cols-2 gap-4 mt-4'>
            <button onClick={vaciarCarrito} className="btn btn-danger mt-3 bg-blue-50 p-1 hover:bg-slate-500 hover:text-white">Vaciar carrito</button>
            <button onClick={guardarCarrito} className="btn btn-success mt-3  bg-green-200 hover:bg-green-500 hover:text-white">Guardar carrito</button>

          </div>
        </div>
      )}

      {submitSuccess && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-green-100 text-green-800 p-4 rounded shadow-md">
          Carrito guardado exitosamente!
        </div>
      )}
    </>
  );
}
