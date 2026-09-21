const Observador = require("./Observador");

class HistorialMovimientosObservador extends Observador {
    constructor () {
        super();
        this.historial = [];
    }
    actualizar(evento) {
        if (evento.tipo === "STOCK_ACTUALIZADO") {
            const signo = evento.cambio > 0 ? "+" : "";
            this.historial.push(
                `${evento.producto.nombre}: ${signo}${evento.cambio} (stock actual: ${evento.producto.stock})`
            );
        }
    }
}

module.exports = HistorialMovimientosObservador;
