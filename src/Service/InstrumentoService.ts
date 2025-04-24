import { Instrumento } from "../Models/Instrumento";

/* LLama a todos*/
export async function getInstrumentos(): Promise<Instrumento[]> {
    try {
      const urlServer = 'http://localhost:8080/api/v1/instrumento';
    
      const response = await fetch(urlServer, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    
      const data: Instrumento[] = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los instrumentos:", error);
      return [];
    }
    
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

export async function saveInstrumento(instrumento: FormData): Promise<Instrumento> {
    const urlServer = 'http://localhost:8080/api/v1/instrumento';
  
    const response = await fetch(urlServer, {
      method: 'POST',
      body: instrumento,
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  
    if (!response.ok) {
      throw new Error("Error al guardar el instrumento");
    }
  
    const data: Instrumento = await response.json();
    return data;
}

export async function updateInstrumento(id: number, instrumento: FormData): Promise<Instrumento> {
    const urlServer = `http://localhost:8080/api/v1/instrumento/${id}`;
  
    const response = await fetch(urlServer, {
      method: 'PUT',
      body: instrumento,
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  
    if (!response.ok) {
      throw new Error("Error al actualizar el instrumento");
    }
  
    const data: Instrumento = await response.json();
    return data;
}

export async function deleteInstrumento(id: number): Promise<void> {
    const urlServer = `http://localhost:8080/api/v1/instrumento/${id}`;
  
    const response = await fetch(urlServer, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  
    if (!response.ok) {
      throw new Error("Error al eliminar el instrumento");
    }
}