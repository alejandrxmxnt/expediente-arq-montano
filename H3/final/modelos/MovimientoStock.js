class MovimientoStock {

    #idMovimientoStock;
    #idProducto;
    #idUsuario;
    #cantidad;
    #stockAnterior;
    #stockNuevo;
    #fechaActualizacion;
    #motivo;

    constructor(idMovimientoStock,idProducto,idUsuario,cantidad,stockAnterior,stockNuevo,motivo){
        this.#idMovimientoStock = idMovimientoStock;
        this.#idProducto = idProducto;
        this.#idUsuario = idUsuario;
        this.#cantidad = cantidad;
        this.#stockAnterior = stockAnterior;
        this.#stockNuevo = stockNuevo;
        this.#motivo = motivo;
        this.#fechaActualizacion = new Date();
    }
    get idMovimientoStock() {
        return this.#idMovimientoStock;
    }
    get idProducto() {
        return this.#idProducto;
    }
    get idUsuario() {
        return this.#idUsuario;
    }
    get cantidad() {
        return this.#cantidad;
    }
    get stockAnterior() {
        return this.#stockAnterior;
    }
    get stockNuevo() {
        return this.#stockNuevo;
    }
    get motivo() {
        return this.#motivo;
    }
    get fechaActualizacion() {
        return this.#fechaActualizacion;
    }
}

module.exports = MovimientoStock;
