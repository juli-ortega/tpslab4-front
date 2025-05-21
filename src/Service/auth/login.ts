import { Usuario } from "../../Models/Usuario";

export default async function LoginUser(usuario: Usuario ) {
    try {
        const urlServer = "http://localhost:8080/api/v1/usuario/login"
    
        const response = await fetch(urlServer, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(usuario),
        });
    
        const data: Usuario = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al obtener la categoría:", error);
        return null;
    }
}
