import { Instrumento } from "../Models/Instrumento";

/* LLama a todos*/
export async function getInstrumentos(): Promise<Instrumento[]> {
    const urlServer = 'http://localhost:8080/api/v1/instrumento';
  
    const response = await fetch(urlServer, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });

    if (!response.ok) {
      throw new Error("Error al obtener los instrumentos");
    }
  
    const data: Instrumento[] = await response.json();
    return data;
  }

/* LLama a uno */  

export async function getInstrumento(id: number): Promise<Instrumento> {
    const urlServer = `http://localhost:8080/api/v1/instrumento/${id}`;
  
    const response = await fetch(urlServer, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });

    if (!response.ok) {
      throw new Error("Error al obtener el instrumento");
    }
  
    const data: Instrumento = await response.json();
    return data;

}
  