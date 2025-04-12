import React from 'react'

export default function Ubicacion() {
  return (
    <div className='grid gap-10' style={{ textAlign: 'center', padding: '20px' }}>
      <h2 className='text-3xl'>¿Dónde estamos?</h2>
      <div style={{ width: '100%', maxWidth: '800px', margin: 'auto' }}>
      <iframe
        title="Ubicación"
        src={`https://www.google.com/maps?q=-32.88631057222369,-68.83829731163534&z=15&output=embed`}
        width="100%"
        height="450"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  )
}
