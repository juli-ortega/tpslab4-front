import { useEffect, useState } from "react";
import Chart from "react-google-charts";
import { getPedidoByMonth } from "../Service/ChartService";

type BarChartRow = [string, number];

type BarChartData = BarChartRow[];

export default function BarChart() {
  const [allData, setAllData] = useState<BarChartData>([]);
  const [years, setYears] = useState<string[]>([]);
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
      <h2 className="bg-slate-200 justify-center text-center p-3 mb-2 ">Pedidos vendidos</h2>

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
