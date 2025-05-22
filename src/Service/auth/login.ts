import { Usuario } from "../../Models/Usuario";

export default async function LoginUser(usuario: Usuario): Promise<{ token: string; role: string } | null> {
  try {
    const urlServer = "http://localhost:8080/api/v1/usuario/login";

    const response = await fetch(urlServer, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(usuario),
    });

    const token = await response.text();
    console.log("Token recibido:", token);

    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));

    const role = payload.rol;

    // Guardar en localStorage si querés, aunque lo ideal es hacerlo desde el AuthContext
    localStorage.setItem("token", token);
    localStorage.setItem("userRole", role);

    return { token, role };
  } catch (error) {
    console.error("Error al hacer login:", error);
    return null;
  }
}
