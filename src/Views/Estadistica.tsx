import React from 'react'
import BarChart from '../components/BarChart'
import PieChartPedidos from '../components/PieChart'
import GenerarExcel from '../components/GenerarExcel'

export default function Estadistica() {
  return (
    <div className="max-w-4xl mx-auto">
      <BarChart />
      <PieChartPedidos />
      <GenerarExcel />
    </div>
  )
}
