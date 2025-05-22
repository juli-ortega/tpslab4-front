import { use, useEffect, useState } from "react";
import { Instrumento } from "../Models/Instrumento";
import { getInstrumento as fetchInstrumento, generarInstrumentoPdf } from "../Service/InstrumentoService";
import { useParams } from "react-router-dom";

export default function DetalleInstrumento() {

    const { id } = useParams();

    const [instrumento, setInstrumento] = useState<Instrumento | null>(null);

    const getInstrumento = async () => {
        try {
            const data = await fetchInstrumento(Number(id));
            console.log(data);
            setInstrumento(data);
        } catch (error) {
            console.log(error);
        }
    }   

    const handlerGenerarPdf = () => {
        if (instrumento) {
          generarInstrumentoPdf(instrumento.id);
        }
    }

    useEffect(() => {
        getInstrumento();
    }, [id]);
      


    return (
    <article className="grid grid-cols-[60%_40%] max-w-[1500px] mx-auto px-4 mt-40 pb-10">
        
        <div className="flex flex-col gap-20">
          <div className="flex flex-col items-center">
            <img width={400} height={400} src={`${instrumento?.imagen}`} alt="" />
          </div>
          <div>
            <h6 className="mb-2 ">Descripcion: </h6>
            <p className="">{instrumento?.descripcion}</p>
          </div>
        </div>
        
        <div className="space-y-20 border-r-2 border-l-2 px-10">
          <div>
            <p className="gap-5">{instrumento?.cantidadVendida} vendidos</p>
            <h1 className="text-[40px]">{instrumento?.instrumento}</h1>
            <h4 className="text-[60px]">$ {instrumento?.precio}</h4>
            <div className="space-y-2">
              <p>Marca: {instrumento?.marca}</p>
              <p>Modelo: {instrumento?.modelo}</p>
            </div>
            <div className="mt-10">
              {instrumento?.costoEnvio === "G" ? (
                <div className="flex items-center gap-2">
                  <img src="../img/camion.png" alt="Camión" style={{ width: "20px", verticalAlign: "middle", marginRight: "8px" }} />
                  <p className="text-green-500">Envío gratis a todo el país</p>
                </div>
                ) : (
                <p className="text-orange-500">`Costo de envío interior de Argentina: $${instrumento?.costoEnvio}` </p>
              )}
            </div>  
          </div>

          <div className="p-2 space-x-20">
            <button className="border-2 p-5 border-blue-400 text-blue-500 cursor-pointer hover:border-blue-800 hover:text-white hover:bg-blue-800">Agregar al carrito</button>
            <button onClick={()=> handlerGenerarPdf()} className="border-2 p-5 border-red-400 text-red-500 cursor-pointer hover:border-red-800 hover:text-white hover:bg-red-800">Generar PDF</button>
          </div>
        </div>

      </article>
   
  );
}