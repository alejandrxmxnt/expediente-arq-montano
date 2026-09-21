class Venta{

    #idVenta;
    #idUsuario;
    #fechaCreacion;
    #estado;
    #metodoPago;
    #total;
    #descuento;
    #nombreDescuento;
    #detalle;

    constructor (idVenta,idUsuario,metodoPago){
        this.#idVenta = idVenta;
        this.#idUsuario = idUsuario;
        this.#metodoPago = metodoPago;

        this.#estado = "Pendiente";
        this.#fechaCreacion = new Date();
        this.#total = 0;

        //Strategy: la venta guarda el descuento que le calculo la estrategia
        this.#descuento = 0;
        this.#nombreDescuento = "Sin descuento";

        this.#detalle = [];
    }

    get idVenta() {
        return this.#idVenta;
    }
    get idUsuario() {
        return this.#idUsuario;
    }
    get fechaCreacion() {
        return this.#fechaCreacion;
    }
    get estado() {
        return this.#estado;
    }
    get metodoPago() {
        return this.#metodoPago;
    }
    get total() {
        return this.#total;
    }
    get descuento() {
        return this.#descuento;
    }
    get nombreDescuento() {
        return this.#nombreDescuento;
    }
    get totalFinal() {
        return this.#total - this.#descuento;
    }
    get detalles() {
        return [...this.#detalle];
    }

    agregarDetalle(detalle) {
        this.#detalle.push(detalle);
        this.#calcularTotal();
    }

    #calcularTotal() {
        this.#total = this.#detalle.reduce((total, detalle) => total + detalle.subtotal,0);
    }

    aplicarDescuento(descuento, nombreDescuento) {
        if (descuento < 0) throw new Error("El descuento no puede ser negativo.");
        this.#descuento = descuento;
        this.#nombreDescuento = nombreDescuento;
    }

    cambiarEstado(nuevoEstado) {
        this.#estado = nuevoEstado;
    }
}

module.exports = Venta;
