import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext';

export default function Navbar() {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const nav = [ 
    { name: 'Inicio', url: '/home' },
    { name: 'Donde estamos', url: '/ubicacion' },
    { name: 'Productos', url: '/productos' },
    { name: 'Pedidos', url: '/pedidos' },
    { name: 'Iniciar Sesion', url: '/login' },
    { name: 'Registrate', url: '/register' },
    { name: 'Administrador', url: '/admin/instrumentos' },
  ]

   const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className='items-center flex justify-center bg-[#f2f2f2] h-20 px-10 mb-10'>
      <nav className='flex gap-6'>
        <ul className="flex gap-20 max-w-[1000px] mx-auto items-center justify-center">
          {nav.map((item, index) => (
            <li className='hover:text-blue-500' key={index}>
              <Link to={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <button onClick={handleLogout} className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
          Cerrar Sesion  
        </button>
      </nav>
    </div>
  )
}
