import { Instrumento } from "../Models/Instrumento"
  ;
const API_BASE_URL = 'http://localhost:8080/api/v1/instrumento';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Error en la solicitud');
  }
  return response.json();
}

export async function getInstrumentos(): Promise<Instrumento[]> {
  try {
    const response = await fetch(API_BASE_URL);
    return handleResponse<Instrumento[]>(response);
  } catch (error) {
    console.error("Error al obtener instrumentos:", error);
    return [];
  }
}

export async function getInstrumento(id: number): Promise<Instrumento> {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  return handleResponse<Instrumento>(response);
}

export async function saveInstrumento(instrumento: Instrumento, file?: File): Promise<Instrumento> {
  const formData = new FormData();
  formData.append('instrumento', JSON.stringify(instrumento));
  if (file) formData.append('file', file);

  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    body: formData
  });

  console.log("Response:", response);

  return handleResponse<Instrumento>(response);
}

export async function updateInstrumento(
  id: number,
  formData: FormData
): Promise<Instrumento> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Error al actualizar el instrumento');
  }

  return response.json();
}


export async function deleteInstrumento(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Error al eliminar el instrumento');
  }
}

export async function getImageUrl(imageName: string): Promise<string> {
  return `${API_BASE_URL}/uploads/${imageName}`;
}

export const generarInstrumentoPdf = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/instrumento/${id}/pdf`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('No se pudo generar el PDF');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Crear link oculto y hacer click para descargar
    const a = document.createElement('a');
    a.href = url;
    a.download = `instrumento_${id}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generando PDF:', error);
  }
};
