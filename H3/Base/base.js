//Sistema de ventas con inventario
class Rol {
    // # es una forma de definir que va ser de aspecto privado por lo tanto esto es un encapsulamiento
    #idRol;
    #nombre;
    #descripcion;
    #estado;
    #fechaCreacion;

    constructor (idRol, nombre, descripcion){
        this.#idRol = idRol;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#estado = true;
        this.#fechaCreacion = new Date();
    }

    get idRol (){
        return this.#idRol;
    }
    get nombre(){
        return this.#nombre;
    }
    get descripcion() {
        return this.#descripcion;
    }
    get estado () {
        return this.#estado;
    }
    get fechaCreacion(){
        return this.#fechaCreacion;
    }

    cmabiarEstado () {
        this.#estado = !this.#estado;
    }
    editarEstado (nombre, descripcion) {
        if(nombre&&nombre.trim() !== ""){
            this.#nombre = nombre;
        }
        if(descripcion&&descripcion.trim() !== ""){
            this.#descripcion = descripcion;
        }
    }
}

class Categoria {
    #idCategoria;
    #nombre;
    #descripcion;
    #estado;
    #fechaCreacion;
    #fechaActualizacion;

    constructor (idCategoria, nombre, descripcion){
        this.#idCategoria = idCategoria;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#estado = true;
        this.#fechaCreacion = new Date();
        this.#fechaActualizacion = new Date();
    }

    get idCategoria () {
        return this.#idCategoria;
    }
    get nombre(){
        return this.#nombre;
    }
    get descripcion() {
        return this.#descripcion;
    }
    get estado() {
        return this.#estado;
    }
    get fechaCreacion() {
        return this.#fechaCreacion;
    }
    get fechaActualizacion() {
        return this.#fechaActualizacion;
    }
    cambiarEstado () {
        this.#estado = !this.#estado;
        this.fechaActualizacion = new Date();
    }
    editarCategoria (nombre, descripcion){
        if(nombre&&nombre.trim() !== ""){
            this.#nombre = nombre;
        }
        if(descripcion&&descripcion.trim() !== ""){
            this.#descripcion = descripcion;
        }
    }
}

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

    editarProducto(nombre, descripcion, precio){
        if(nombre&&nombre.trim() !== ""){
            this.#nombre = nombre;
        }
        if(descripcion&&descripcion.trim() !== ""){
            this.#descripcion = descripcion;
        }
        if (precio > 0) {
            this.#precio = precio;
        }
    }
}

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

class Usuario {

    #idUsuario;
    #idRol;
    #nombre;
    #apellido;
    #correo;
    #contrasenia;
    #fechaCreacion;
    #estado;

    constructor(idUsuario,idRol,nombre,apellido,correo,contrasenia) {

        this.#idUsuario = idUsuario;
        this.#idRol = idRol;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#correo = correo;
        this.#contrasenia = contrasenia;//esto no es etico pero para este caso lo guardaremos asi
        this.#fechaCreacion = new Date();
        this.#estado = true;
    }

    get idUsuario() {
        return this.#idUsuario;
    }
    get idRol() {
        return this.#idRol;
    }
    get nombre() {
        return this.#nombre;
    }
    get apellido() {
        return this.#apellido;
    }
    get correo() {
        return this.#correo;
    }
    get fechaCreacion() {
        return this.#fechaCreacion;
    }
    get estado() {
        return this.#estado;
    }

    cambiarEstadoUsuario() {
        this.#estado = !this.#estado;
    }

    editarUsuario(nombre, apellido, correo) {

        if (nombre) {
            this.#nombre = nombre;
        }
        if (apellido) {
            this.#apellido = apellido;
        }
        if (correo) {
            this.#correo = correo;
        }
    }
}