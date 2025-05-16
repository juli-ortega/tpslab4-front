import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Instrumento } from '../src/Models/Instrumento';
import type { Pedido } from './Models/Pedido';

type CartContextType = {
  carrito: Instrumento[];
  agregarAlCarrito: (instrumento: Instrumento) => void;
  vaciarCarrito: () => void;
  total: () => number;
  sumarCantidad: (index: number) => void;
  restarCantidad: (index: number) => void;
  guardarCarrito: () => void;
  submitSuccess: boolean;
  setSubmitSuccess: (value: boolean) => void;
  eliminarDelCarrito: (index: number) => void;
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
    const productoExistente = carrito.find(item => item.id === instrumento.id);

    if (productoExistente) {
      setSubmitSuccess(false);
      return;
    }

    instrumento.cantidad = 1;
    const nuevoCarrito = [...carrito, instrumento];
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    setSubmitSuccess(true);
  };

  const guardarCarrito = async () => {
    const urlServer = 'http://localhost:8080/api/v1/pedido';
    
    // Suponiendo que `totalCompra` es solo un número (total de la compra)
    const totalCompra = total();
    
    // Construir el objeto pedido
    const pedido = {
      total: totalCompra, // Aquí podrías incluir más detalles si es necesario
    };

    try {
      const response = await fetch(urlServer, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          pedido: pedido,           // Aquí estás enviando el objeto `pedido`
          instrumentos: carrito, // Lista de objetos `InstrumentoDto`
        }),
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

  const eliminarDelCarrito = (index: number) => {
    setCarrito(prevCarrito => prevCarrito.filter((_, i) => i !== index));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };

  const sumarCantidad = (index: number) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad += 1;
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const restarCantidad = (index: number) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[index].cantidad > 1) {
      nuevoCarrito[index].cantidad -= 1;
      setCarrito(nuevoCarrito);
      localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
    }
  };


  const total = () => carrito.reduce((acc, curr) => acc + curr.precio * curr.cantidad, 0);

  return (
    <CartContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito, total, guardarCarrito, submitSuccess, setSubmitSuccess, sumarCantidad, restarCantidad, eliminarDelCarrito }}>
      {children}
    </CartContext.Provider>
  );
};
