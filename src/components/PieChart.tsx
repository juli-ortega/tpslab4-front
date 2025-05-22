import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { getPedidoByCantidaDeInstru } from "../Service/ChartService";

const PieChartPedidos = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPedidoByCantidaDeInstru();
      if (result) setData(result);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="bg-slate-200 justify-center text-center p-3 mb-2 ">Pedidos por Instrumento</h2>
      {data.length > 0 ? (
        <Chart
          chartType="PieChart"
          data={data}
          options={{
            title: "Cantidad de pedidos por instrumento",
            is3D: true,
          }}
          width={"100%"}
          height={"400px"}
        />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default PieChartPedidos;
