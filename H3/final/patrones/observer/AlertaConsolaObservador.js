const Observador = require("./Observador");

class AlertaConsolaObservador extends Observador {
    actualizar(evento) {
        if (evento.tipo === "STOCK_BAJO") {
            console.log(`⚠️ ALERTA: "${evento.producto.nombre}" tiene stock bajo (${evento.producto.stock} unidades).`);
        }
    }
}

module.exports = AlertaConsolaObservador;
