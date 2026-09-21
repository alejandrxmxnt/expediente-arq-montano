const EstrategiaDescuento = require("./EstrategiaDescuento");

class DescuentoPorVolumen extends EstrategiaDescuento {
    // 10% si la compra llega a 500 o mas
    calcular(total) {
        return total >= 500 ? total * 0.10 : 0;
    }
    get nombre() {
        return "Descuento por volumen (10% desde 500)";
    }
}

module.exports = DescuentoPorVolumen;
