import React, { useState } from 'react';

const ReportePedidos: React.FC = () => {
  const [fechaDesde, setFechaDesde] = useState<string>('');
  const [fechaHasta, setFechaHasta] = useState<string>('');

  const generarExcel = async () => {
    try {
      const params = new URLSearchParams();

      if (fechaDesde) params.append('fechaDesde', `${fechaDesde}T00:00:00`);
      if (fechaHasta) params.append('fechaHasta', `${fechaHasta}T23:59:59`);

      const response = await fetch(
        `http://localhost:8080/api/v1/pedido/admin/pedidos-detallado?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        }
      );

      console.log(response)

      if (!response.ok) {
        throw new Error('Error al generar el Excel');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'pedidos_detallado.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error generando el Excel:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Reporte de Pedidos Detallado</h2>

      <div style={{ marginBottom: '10px' }}>
        <label>Fecha Desde: </label>
        <input
          type="date"
          value={fechaDesde}
          onChange={(e) => setFechaDesde(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label>Fecha Hasta: </label>
        <input
          type="date"
          value={fechaHasta}
          onChange={(e) => setFechaHasta(e.target.value)}
        />
      </div>

      <button onClick={generarExcel}>Generar Excel</button>
    </div>
  );
};

export default ReportePedidos;
