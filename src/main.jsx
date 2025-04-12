import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './Home.tsx'
import Layout from './layout.tsx'
import DondeEstamos from './DondeEstamos.tsx'
import DetalleInstrumento from './DetalleInstrumento.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/productos" element={<App />} />
          <Route path="/instrumento/:id" element={<DetalleInstrumento />} />
          <Route path="/home" element={<Home />} />
          <Route path="/ubicacion" element={<DondeEstamos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
