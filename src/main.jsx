import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Views/Home'
import Layout from './layout'
import DondeEstamos from './Views/DondeEstamos'
import DetalleInstrumento from './Views/DetalleInstrumento'
import AddInstrumentos from './Views/AddInstrumento'
import AdminProductos from './Views/AdminProductos'
import Producto from './Views/Productos'
import Pedidos from './Views/Pedidos'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EditarInstrumento from './Views/EditarInstrumento'
import { CartProvider } from './CartContext'
import PagoResultado from './Views/PagoResultado';
import CrearCategoria from './Views/CrearCategoria';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/ubicacion" element={<DondeEstamos />} />
            <Route path="/productos" element={<Producto />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/instrumento/:id" element={<DetalleInstrumento />} />
            <Route path="/admin/instrumentos" element={<AdminProductos />} />
            <Route path="/admin/instrumentos/nuevo" element={<AddInstrumentos />} />
            <Route path="/admin/instrumentos/editar/:id" element={<EditarInstrumento />} />
            <Route path="/admin/categoria" element={<CrearCategoria />} />
            <Route path="/resultadopago" element={<PagoResultado />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  </React.StrictMode>,
)
