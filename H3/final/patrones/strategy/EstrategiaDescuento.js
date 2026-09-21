// Contrato: cada estrategia calcula cuanto se descuenta de un total
class EstrategiaDescuento {
    calcular(total) {
        throw new Error("calcular() debe implementarse en la subclase.");
    }
    get nombre() {
        return "Estrategia sin nombre";
    }
}

module.exports = EstrategiaDescuento;
