import { Link } from 'react-router-dom'

export default function Navbar() {
  const nav = [
    { name: 'Inicio', url: '/home' },
    { name: 'Donde estamos', url: '/ubicacion' },
    { name: 'Productos', url: '/productos' },
    { name: 'Pedidos', url: '/pedidos' },
  ]

  return (
    <div className='items-center flex justify-center bg-[#f2f2f2] h-20 px-10 mb-10'>
      <nav>
        <ul className="flex gap-20 max-w-[1000px] mx-auto items-center justify-center">
          {nav.map((item, index) => (
            <li className='hover:text-blue-500' key={index}>
              <Link to={item.url}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
