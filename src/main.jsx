import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Views/Home'
import Layout from './layout'
import DondeEstamos from './Views/DondeEstamos'
import DetalleInstrumento from './Views/DetalleInstrumento'
import Producto from './Views/Productos'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/productos" element={<Producto />} />
          <Route path="/instrumento/:id" element={<DetalleInstrumento />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ubicacion" element={<DondeEstamos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
