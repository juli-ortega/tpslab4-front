import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Instrumento } from '../Models/Instrumento';
import { getInstrumentos as fetchInstrumentos } from '../Service/InstrumentoService';
import { filtrarCategoria as fetchFiltrarCategoria } from '../Service/CategoriaService';
import '../Productos.css';

export default function Productos() {
    const navigate = useNavigate();

    const handleVerDetalle = (id: number) => {
      navigate(`/instrumento/${id}`);
    };
  
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);
  
    const getInstrumentos = async () => {
      try {
        const data = await fetchInstrumentos(); 
        console.log("las data", data)
        setInstrumentos(data);
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(() => {
      getInstrumentos();
    }, []);
    
    const filtrarCategoria = async (categoria: string) => {
      try {
        const data = await fetchFiltrarCategoria(categoria); 
        setInstrumentos(data);
      } catch (error) {
        console.log(error);
      }
    }
  
    return (
      <div>
          
          <div>
            <h2>Filtrar</h2>
            <select onChange={(e) => filtrarCategoria(e.target.value)}>
              <option value="">-- Seleccioná una categoría --</option>
              <option value="CUERDA">Cuerda</option>
              <option value="VIENTO">Viento</option>
              <option value="PERCUSION">Percusión</option>
              <option value="TECLADO">Teclado</option>
              <option value="ELECTRONICO">Electrónico</option>
            </select>
          </div>

        
        <div className='lista'>
            {instrumentos.map((instrumento) => (
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
          ))}
        </div>
      </div>
    )
}
