export const getPedidoByMonth = async () =>{
    try {
        const urlServer = "http://localhost:8080/api/v1/pedido/admin/barchart";

        const response = await fetch(urlServer, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            }
        });

        const data = await response.json();  // leer una sola vez

        console.log(data);  // mostrarlo en consola

        return data;
    } catch (error) {
        console.error("Error al hacer login:", error);
        return null;
    }

}

export const getPedidoByCantidaDeInstru= async () =>{
    try {
        const urlServer = "http://localhost:8080/api/v1/pedido/admin/piechart";

        const response = await fetch(urlServer, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            }
        });

        const data = await response.json();  // leer una sola vez

        console.log(data);  // mostrarlo en consola

        return data;
    } catch (error) {
        console.error("Error al hacer login:", error);
        return null;
    }

}