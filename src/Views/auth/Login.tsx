import React, { useState } from 'react'
import { Usuario } from '../../Models/Usuario'
import LoginUser from '../../Service/auth/login'

export default function Login() {
    const [usuario, setUsuario] = useState<Usuario>({
        nombreUsuario: '',
        clave: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Datos del login:', usuario)
        LoginUser(usuario);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUsuario({
      ...usuario,
      [name]: value,
    })
  }

  return (
    <div className='max-w-3xl mx-auto '>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-6 bg-slate-100 py-8 rounded-lg shadow-lg'>
        <h1 className='font-bold text-2xl'>Iniciar Sesion</h1>
        <div className='flex flex-col justify-center items-center gap-6'>
          <label htmlFor="nombreUsuario">Usuario</label>
          <input
            type="text"
            placeholder="usuario"
            name="nombreUsuario"
            value={usuario.nombreUsuario}
            onChange={handleChange}
          />
        </div>

        <div className='flex flex-col justify-center items-center gap-5'>
          <label htmlFor="clave">Contraseña</label>
          <input
            type="password"
            placeholder="contraseña"
            name="clave"
            value={usuario.clave}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className='bg-slate-400 p-2 rounded-lg text-white cursor-pointer hover:bg-slate-600'>Iniciar sesión</button>
      </form>
    </div>
  )
}