import React from 'react'
import { Categoria } from '../Models/Categoria';
import { Instrumento } from '../Models/Instrumento';

export async function filtrarCategoria(denominacion: string): Promise<Instrumento[]> {
  try {
    const urlServer = `http://localhost:8080/api/v1/categoria/filtrar/${denominacion}`;
  
    const response = await fetch(urlServer, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    const data: Instrumento[] = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error("Error al obtener los instrumentos por categoria:", error);
    return [];
  }
}

export const getCategorias = async (): Promise<Categoria[]> => {
  try {
    const urlServer = `http://localhost:8080/api/v1/categoria`;
  
    const response = await fetch(urlServer, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    const data: Categoria[] = await response.json();
    return data;

  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return [];
  }
}

export const getCategoriaById = async (id: number): Promise<Categoria | null> => {
  try {
    const urlServer = `http://localhost:8080/api/v1/categoria/${id}`;

    const response = await fetch(urlServer, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    const data: Categoria = await response.json();
    return data;

  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    return null;
  }
}
