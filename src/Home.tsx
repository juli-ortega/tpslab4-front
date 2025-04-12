import React, { useState } from 'react'

export default function Home() {
  const imagenes = ['../img/nro9.jpg', '../img/nro8.jpg', '../img/nro7.jpg']
  const [indice, setIndice] = useState(0)

  const siguiente = () => {
    setIndice((indice + 1) % imagenes.length)
  }

  const anterior = () => {
    setIndice((indice - 1 + imagenes.length) % imagenes.length)
  }

  return (
    <div style={{ textAlign: 'center' }}>
        <h1 className='text-4xl font-bold mb-10'>
        Musical Hendrix
        </h1>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        <img
          src={imagenes[indice]}
          alt={`Imagen ${indice}`}
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        />
        <div className='flex items-center justify-center mb-10 gap-16 mt-5'>
          <button className='bg-red-300 p-2 rounded-xl hover:bg-red-600 hover:text-white' onClick={anterior}> Anterior</button>
          <button  className='bg-red-300 p-2 rounded-xl hover:bg-red-600 hover:text-white' onClick={siguiente} style={{ marginLeft: '10px' }}>Siguiente </button>
        </div>

        <p>
        Musical Hendrix es una tienda de instrumentos musicales con ya más de 15 años de
        experiencia. Tenemos el conocimiento y la capacidad como para informarte acerca de las
        mejores elecciones para tu compra musical.
        </p>
      </div>
    </div>
  )
}
