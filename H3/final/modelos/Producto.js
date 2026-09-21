class Producto {

    #idProducto;
    #idCategoria;
    #marca;
    #nombre;
    #descripcion;
    #precio;
    #stock;
    #estado;
    #fechaCreacion;
    #fechaActualizacion;

    constructor (idProducto, idCategoria, marca, nombre, descripcion, precio, stock){
        if (precio < 0) throw new Error("El precio no puede ser negativo.");
        if (stock < 0) throw new Error("El stock no puede ser negativo.");

        this.#idProducto = idProducto;
        this.#idCategoria = idCategoria;
        this.#marca = marca;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#precio = precio;
        this.#stock = stock;

        this.#estado = true;
        this.#fechaCreacion = new Date();
        this.#fechaActualizacion = new Date();
    }

    get idProducto() {
        return this.#idProducto;
    }
    get idCategoria() {
        return this.#idCategoria;
    }
    get marca() {
        return this.#marca;
    }
    get nombre() {
        return this.#nombre;
    }
    get descripcion() {
        return this.#descripcion;
    }
    get precio() {
        return this.#precio;
    }
    get stock() {
        return this.#stock;
    }
    get estado() {
        return this.#estado;
    }
    get fechaCreacion() {
        return this.#fechaCreacion;
    }
    get fechaActualizacion (){
        return this.#fechaActualizacion;
    }

    actualizarStock (cantidad) {
        const nuevoStock = this.#stock + cantidad;
        if (nuevoStock < 0) {
            throw new Error ("No Existe Suficiente stock");
        }
        this.#stock = nuevoStock;
        this.#fechaActualizacion = new Date();
    }

    cambiarEstadoProducto () {
        this.#estado = !this.#estado;
        this.#fechaActualizacion = new Date();
    }

    editarProducto(nombre, descripcion, precio){
        if(nombre&&nombre.trim() !== ""){
            this.#nombre = nombre;
        }
        if(descripcion&&descripcion.trim() !== ""){
            this.#descripcion = descripcion;
        }
        if (precio >= 0) {
            this.#precio = precio;
        }
        this.#fechaActualizacion = new Date();
    }
}

module.exports = Producto;
