import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Instrumento } from '../Models/Instrumento';
import { getInstrumentos as fetchInstrumentos } from '../Service/InstrumentoService';
import { filtrarCategoria as fetchFiltrarCategoria } from '../Service/CategoriaService';
import { getCategorias as fetchCategorias } from '../Service/CategoriaService';
import '../Productos.css';
import { Categoria } from '../Models/Categoria';

export default function Productos() {
    const navigate = useNavigate();

    const handleVerDetalle = (id: number) => {
      navigate(`/instrumento/${id}`);
    };

    const handleAnadirInstrumento = () => {
      navigate('/anadir/instrumento');
    };
  
    const [instrumentos, setInstrumentos] = useState<Instrumento[]>([]);

    const [categorias, setCategorias] = useState<Categoria[]>([]);

    //Obtiene los instrumentos
    const getInstrumentos = async () => {
      try {
        const data = await fetchInstrumentos(); 
        setInstrumentos(data);
      } catch (error) {
        console.log(error);
      }
    }

    //Obtiene las categorias
    const getCategorias = async () => {
      try {
        const data = await fetchCategorias();
        setCategorias(data);
      } catch (error) {
        console.log(error);
      }
    }

    //Filtra los intrumentos por categoria
    const filtrarInstrumentosByCategoria = async (denominacion: string) => {
      try {
        const data = await fetchFiltrarCategoria(denominacion); 
        setInstrumentos(data);
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(() => {
      getInstrumentos();
      getCategorias();
    }, []);
    
    return (
      <div>
        <div className='grid items-center justify-center'> 
          <h1 className='grid items-center justify-center text-2xl pb-2'>Instrumentos</h1>
          <p>Encontrá el instrumento que buscás</p>
        </div>
        <div className='flex align-items-center justify-between '>
          <div className='grid p-5 justify-start'>
            <h2 className='grid py-5 text-xl'>Filtrar</h2>
            <select className='p-2' onChange={(e) => filtrarInstrumentosByCategoria(e.target.value)}>
              <option value="">-- Seleccioná una categoría --</option>
              {categorias?.map((categoria) => (
                <option key={categoria.id} value={categoria.denominacion}>
                  {categoria.denominacion}
                </option>
              ))}
            </select>
          </div>
          
          <div className='grid p-12 justify-end'>
            <button onClick={() => handleAnadirInstrumento()} className='bg-slate-800 text-white p-2 '>Añadir instrumento +</button>
          </div>

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
