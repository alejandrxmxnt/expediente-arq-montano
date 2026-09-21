const EstrategiaDescuento = require("./EstrategiaDescuento");

class SinDescuento extends EstrategiaDescuento {
    calcular(total) {
        return 0;
    }
    get nombre() {
        return "Sin descuento";
    }
}

module.exports = SinDescuento;
