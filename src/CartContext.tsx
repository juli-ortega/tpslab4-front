import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Instrumento } from '../src/Models/Instrumento';

type CartContextType = {
  carrito: Instrumento[];
  agregarAlCarrito: (instrumento: Instrumento) => void;
  vaciarCarrito: () => void;
  total: () => number;
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

  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito') || '[]');
    setCarrito(carritoGuardado);
  }, []);

  const agregarAlCarrito = (instrumento: Instrumento) => {
    const nuevoCarrito = [...carrito, instrumento];
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const total = () => carrito.reduce((acc, curr) => acc + curr.precio, 0);

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito, total }}>
      {children}
    </CartContext.Provider>
  );
};
