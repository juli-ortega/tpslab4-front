import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import CarritoSidebar from './Views/CarritoSideBar'

export default function Layout() {
  return (
    <div>
      <Navbar />
      <CarritoSidebar />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
