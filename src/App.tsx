import { useEffect, useState } from 'react';
import {Instrumento} from './Models/Instrumento';
import { getInstrumentos as fetchInstrumentos } from './Service/InstrumentoService'; // 👈 renombrado
import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {

  const navigate = useNavigate();

  const handleVerDetalle = (id: number) => {
    navigate(`/instrumento/${id}`);
  };

  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

  const getInstrumentos = async () => {
    try {
      const data = await fetchInstrumentos(); 
      setInstrumentos(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getInstrumentos();
  }, []);


  const instrumentosList = instrumentos.map((instrumento) => (
    <div className="instrumento" key={instrumento.id}>
      <img src={`./img/${instrumento.imagen}`} alt=""/>
      <div className='instrumento-info'>
        <h2>{instrumento.instrumento}</h2>
        <h3>${instrumento.precio}</h3>
        <p className={
            instrumento.costoEnvio === "G"
              ? "envio-gratis"
              : "envio-pago"
          }
        >
          {instrumento.costoEnvio === "G" ? (
            <>
              <img src="./img/camion.png" alt="Camión" style={{ width: "20px", verticalAlign: "middle", marginRight: "8px" }} />
              Envío gratis a todo el país
            </>
          ) : (
            `Costo de envío interior de Argentina: $${instrumento.costoEnvio}`
          )}
        </p>
        <p>{instrumento.cantidadVendida} vendidos</p>
        <button onClick={() => handleVerDetalle(instrumento.id) }>Ver Detalle</button>
      </div>
    </div>
  ))

  return (
      <div className='lista'>
        {instrumentosList}
      </div>
  )
}

export default App
