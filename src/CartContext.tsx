import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Instrumento } from '../src/Models/Instrumento';

type CartContextType = {
  carrito: Instrumento[];
  agregarAlCarrito: (instrumento: Instrumento) => void;
  vaciarCarrito: () => void;
  total: () => number;
  guardarCarrito: () => void;
  submitSuccess: boolean;
  setSubmitSuccess: (value: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [carrito, setCarrito] = useState<Instrumento[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
    setCarrito(carritoGuardado);
  }, []);

  const agregarAlCarrito = (instrumento: Instrumento) => {
    const nuevoCarrito = [...carrito, instrumento];
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    setSubmitSuccess(true);
  };

  const guardarCarrito = async () => {
    const urlServer = 'http://localhost:8080/api/v1/pedido';
    const totalCompra = total();

    try {
      const response = await fetch(urlServer, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ total: totalCompra }),
      });

      if (response.ok) {
        console.log('Carrito guardado exitosamente');
        setSubmitSuccess(true);
        vaciarCarrito(); // Opcional: vaciar el carrito después de guardar
      } else {
        console.error('Error al guardar el carrito');
      }
    } catch (error) {
      console.error('Error al guardar el carrito:', error);
    }
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const total = () => carrito.reduce((acc, curr) => acc + curr.precio, 0);

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito, total, guardarCarrito, submitSuccess, setSubmitSuccess }}>
      {children}
    </CartContext.Provider>
  );
};
