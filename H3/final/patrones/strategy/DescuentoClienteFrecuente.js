const EstrategiaDescuento = require("./EstrategiaDescuento");

class DescuentoClienteFrecuente extends EstrategiaDescuento {
    // 5% fijo sin importar el monto
    calcular(total) {
        return total * 0.05;
    }
    get nombre() {
        return "Descuento cliente frecuente (5%)";
    }
}

module.exports = DescuentoClienteFrecuente;
