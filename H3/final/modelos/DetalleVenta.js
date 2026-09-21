class DetalleVenta {

    #idDetalleVenta;
    #idProducto;
    #idVenta;
    #cantidad;
    #precioUnitario;
    #subtotal;

    constructor (idDetalleVenta, idProducto, cantidad, precioUnitario){
        if (cantidad <= 0) throw new Error("La cantidad debe ser mayor que cero.");
        if (precioUnitario < 0) throw new Error("El precio no puede ser negativo.");

        this.#idDetalleVenta = idDetalleVenta;
        this.#idProducto = idProducto;
        this.#cantidad = cantidad;
        this.#precioUnitario = precioUnitario;
        this.#subtotal = this.#calcularSubtotal();
    }
    get idDetalleVenta (){
        return this.#idDetalleVenta;
    }
    get idProducto(){
        return this.#idProducto;
    }
    get cantidad(){
        return this.#cantidad;
    }
    get precioUnitario () {
        return this.#precioUnitario;
    }
    get subtotal(){
        return this.#subtotal;
    }

    //metodo privado solo se puede usar en esta clase
    #calcularSubtotal(){
        return this.#cantidad * this.#precioUnitario;
    }
}

module.exports = DetalleVenta;
