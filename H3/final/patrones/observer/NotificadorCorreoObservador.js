const Observador = require("./Observador");

// Simula el envio de un correo
class NotificadorCorreoObservador extends Observador {
    actualizar(evento) {
        if (evento.tipo === "STOCK_BAJO") {
            console.log(`📧 Correo enviado al encargado de compras sobre "${evento.producto.nombre}".`);
        }
    }
}

module.exports = NotificadorCorreoObservador;
