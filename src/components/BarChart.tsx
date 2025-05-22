import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { getPedidoByMonth } from "../Service/ChartService";
import { useNavigate } from "react-router-dom";

type BarChartRow = [string, number];

type BarChartData = BarChartRow[];

export default function BarChart() {
  const [allData, setAllData] = useState<BarChartData>([]);
  const [years, setYears] = useState<string[]>([]);
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [filteredData, setFilteredData] = useState<BarChartData>([]);

  const getPedidosByMonthBarChart = async () => {
    const data: BarChartData = await getPedidoByMonth();
    setAllData(data);

    const yearsFound = [...new Set(data.slice(1).map(item => item[0].split("-")[1]))];
    setYears(yearsFound);

    if (yearsFound.length > 0) {
      setSelectedYear(yearsFound[0]);
    }
  };

  useEffect(() => {
    getPedidosByMonthBarChart();
  }, []);

  useEffect(() => {
    if (allData.length > 0 && selectedYear) {
      // Filtrar datos por año
      const header = allData[0];
      const filtered = allData.filter((item, index) => {
        if (index === 0) return true;
        return item[0].split("-")[1] === selectedYear;
      });
      setFilteredData(filtered);
    }
  }, [allData, selectedYear]);

  return (
    <div>
     <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Pedidos vendidos</h1>
          <button
              onClick={() => navigate('/admin/instrumentos')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
              Volver
          </button>
      </div>

      {/* Botones de año */}
      <div style={{ marginBottom: "20px" }}>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            style={{
              marginRight: "10px",
              padding: "8px 16px",
              backgroundColor: year === selectedYear ? "#4CAF50" : "#ddd",
              color: year === selectedYear ? "white" : "black",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Gráfico */}
      {filteredData.length > 1 ? (
        <Chart
          chartType="ColumnChart"
          data={filteredData}
          options={{
            title: `Pedidos vendidos en ${selectedYear}`,
            legend: { position: "none" },
            hAxis: {
              title: "Mes",
            },
            vAxis: {
              title: "Cantidad de Pedidos",
            },
          }}
          width="100%"
          height="400px"
        />
      ) : (
        <p>No hay datos para el año seleccionado.</p>
      )}
    </div>
  );
}
