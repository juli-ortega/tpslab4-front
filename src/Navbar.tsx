import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const nav = [ 
    { name: 'Inicio', url: '/home' },
    { name: 'Donde estamos', url: '/ubicacion' },
    { name: 'Productos', url: '/productos' },
  ];

  const navAuthenticated = [
    { name: 'Pedidos', url: '/pedidos' },
    { name: 'Administrador', url: '/admin/instrumentos' },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Función para agregar clases condicionales
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'bg-blue-600 text-white px-4 py-2 rounded'
      : 'hover:text-blue-500 px-4 py-2';

  return (
    <div className='bg-[#f2f2f2] h-20 px-10 mb-10 flex items-center justify-center'>
      <nav className='w-full max-w-[1000px] mx-auto flex items-center justify-between'>
        <ul className="flex gap-6 items-center justify-center flex-grow">
          {nav.map((item, index) => (
            <li key={index}>
              <NavLink to={item.url} className={getNavLinkClass}>
                {item.name}
              </NavLink>
            </li>
          ))}

          {isAuthenticated &&
            navAuthenticated.map((item, index) => (
              <li key={index}>
                <NavLink to={item.url} className={getNavLinkClass}>
                  {item.name}
                </NavLink>
              </li>
            ))
          }

          {!isAuthenticated && (
            <>
              <li>
                <NavLink to="/login" className={getNavLinkClass}>
                  Iniciar Sesión
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className={getNavLinkClass}>
                  Registrate
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ml-6'
          >
            Cerrar Sesión  
          </button>
        )}
      </nav>
    </div>
  );

}
