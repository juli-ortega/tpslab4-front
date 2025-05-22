import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute";

import Layout from "./layout";
import Home from "./Views/Home";
import DondeEstamos from "./Views/DondeEstamos";
import Producto from "./Views/Productos";
import Pedidos from "./Views/Pedidos";
import DetalleInstrumento from "./Views/DetalleInstrumento";
import AdminProductos from "./Views/AdminProductos";
import AddInstrumentos from "./Views/AddInstrumento";
import EditarInstrumento from "./Views/EditarInstrumento";
import CrearCategoria from "./Views/CrearCategoria";
import PagoResultado from "./Views/PagoResultado";
import Login from "./Views/auth/Login";
import Register from "./Views/auth/Register";
import Estadistica from "./Views/Estadistica";
import { AuthProvider } from "./AuthContext";

import { CartProvider } from "./CartContext";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Rutas públicas */}
              <Route path="home" element={<Home />} />
              <Route path="ubicacion" element={<DondeEstamos />} />
              <Route path="productos" element={<Producto />} />
              <Route path="pedidos" element={<Pedidos />} />
              <Route path="instrumento/:id" element={<DetalleInstrumento />} />
              <Route path="resultadopago" element={<PagoResultado />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              {/* Rutas protegidas: ADMIN y USER pueden ver la lista */}
              <Route element={<PrivateRoute allowedRoles={["ADMIN", "USER"]} />}>
                <Route path="admin/instrumentos" element={<AdminProductos />} />
              </Route>

              {/* Solo ADMIN puede crear, editar, etc. */}
              <Route element={<PrivateRoute allowedRoles={["ADMIN"]} />}>
                <Route path="admin/instrumentos/nuevo" element={<AddInstrumentos />} />
                <Route path="admin/instrumentos/editar/:id" element={<EditarInstrumento />} />
                <Route path="admin/instrumentos/categoria" element={<CrearCategoria />} />
                <Route path="admin/instrumentos/estadisticas" element={<Estadistica />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
