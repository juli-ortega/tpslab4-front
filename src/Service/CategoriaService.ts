import React from 'react'

export async function filtrarCategoria(categoria: string): Promise<any> {
    const urlServer = `http://localhost:8080/api/v1/categoria/${categoria}`;
  
    const response = await fetch(urlServer, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  
    if (!response.ok) {
      throw new Error("Error al obtener las categorias");
    }
  
    const data = await response.json();

    console.log(data);
    return data;
}

const getCategorias = async () =>{
  const urlServer = `http://localhost:8080/api/v1/categoria`;
  
  const response = await fetch(urlServer, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  });
}
