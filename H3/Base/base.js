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

    cambiarRol(idRol){
        if (!idRol) throw new Error("Debe proporcionar un rol válido.");
        this.#idRol = idRol;
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

class DetalleVenta {
    #idDetalleVenta;
    #idProducto;
    #idVenta;
    #cantidad;
    #precioUnitario;
    #subtotal;
    
    constructor (idDetalleVenta, idProducto, cantidad, precioUnitario){
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

class Venta{
    #idVenta;
    #idUsuario;
    #fechaCreacion;
    #estado;
    #metodoPago;
    #total;
    #detalle;

    constructor (idVenta,idUsuario,metodoPago){
        this.#idVenta = idVenta;
        this.#idUsuario = idUsuario;
        this.#metodoPago = metodoPago;

        this.#estado = "Pendiente";
        this.#fechaCreacion = new Date();
        this.#total = 0;

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

    cambiarEstado(nuevoEstado) {
        this.#estado = nuevoEstado;
    }
}

//Creacion de SERVICIOS

class CategoriaServicio {
    constructor () {
        this.categorias = [];
    }
    crearCategoria (categoria) {
        this.categorias.push(categoria);
        console.log(`Categoría "${categoria.nombre}" creada correctamente.`);
    }
    editarCategoria (idCategoria, nombre, descripcion){
        const categoria = this.categorias.find(c => c.idCategoria === idCategoria);
        if (!categoria) throw new Error("Categoría no encontrada.");
        categoria.editar(nombre, descripcion);
    }
    buscarCategoria(idCategoria) {
        return this.categorias.find(c => c.idCategoria === idCategoria)
    }
}

class ProductoService {
    constructor() { 
        this.productos = []; 
    }

    registrarProducto(producto) {
        this.productos.push(producto);
        console.log(`Producto "${producto.nombre}" registrado correctamente.`);
    }

    editarProducto(idProducto, nombre, descripcion, precio) {
        const producto = this.buscarProducto(idProducto);
        if (!producto) throw new Error("Producto no encontrado.");
        producto.editar(nombre, descripcion, precio);
    }

    buscarProducto(idProducto) {
        return this.productos.find(p => p.idProducto === idProducto);
    }

    actualizarStock(idProducto, cantidad) {
        const producto = this.buscarProducto(idProducto);
        if (!producto) throw new Error("Producto no encontrado.");
        producto.actualizarStock(cantidad);
    }
}


class MovimientoStockService {
    constructor(productoService) {
        this.productoService = productoService;
        this.movimientos = [];
    }

    registrarEntrada(idMovimiento, idProducto, idUsuario, cantidad, motivo) {
        const producto = this.productoService.buscarProducto(idProducto);
        if (!producto) throw new Error("Producto no encontrado.");

        const stockAnterior = producto.stock;
        producto.actualizarStock(cantidad);

        const movimiento = new MovimientoStock(
            idMovimiento, idProducto, idUsuario, cantidad,
            stockAnterior, producto.stock, motivo
        );
        this.movimientos.push(movimiento);
    }

    registrarSalida(idMovimiento, idProducto, idUsuario, cantidad, motivo) {
        const producto = this.productoService.buscarProducto(idProducto);
        if (!producto) throw new Error("Producto no encontrado.");

        const stockAnterior = producto.stock;
        producto.actualizarStock(-cantidad);

        const movimiento = new MovimientoStock(
            idMovimiento, idProducto, idUsuario, cantidad,
            stockAnterior, producto.stock, motivo
        );
        this.movimientos.push(movimiento);
    }
}


class RolService {
    constructor() { this.roles = []; }

    crearRol(rol) {
        this.roles.push(rol);
        console.log(`Rol "${rol.nombre}" creado correctamente.`);
    }
}

class UsuarioService {
    constructor() { 
        this.usuarios = []; 
    }

    crearUsuario(usuario) {
        this.usuarios.push(usuario);
        console.log(`Usuario "${usuario.nombre}" creado correctamente.`);
    }

    buscarUsuario(idUsuario) {
        return this.usuarios.find(u => u.idUsuario === idUsuario);
    }
}

class VentaService {
    constructor(productoService) {
        this.productoService = productoService;
        this.ventas = [];
    }

    crearVenta(venta) {
        this.ventas.push(venta);
        console.log(`Venta ${venta.idVenta} creada.`);
    }

    agregarProducto(idVenta, idProducto, cantidad, idDetalle) {
        const venta = this.ventas.find(v => v.idVenta === idVenta);
        if (!venta) throw new Error("Venta no encontrada.");

        const producto = this.productoService.buscarProducto(idProducto);
        if (!producto) throw new Error("Producto no encontrado.");
        if (producto.stock < cantidad) throw new Error("Stock insuficiente.");

        const detalle = new DetalleVenta(idDetalle, idProducto, cantidad, producto.precio);
        venta.agregarDetalle(detalle);
        producto.actualizarStock(-cantidad);
    }

    finalizarVenta(idVenta) {
        const venta = this.ventas.find(v => v.idVenta === idVenta);
        if (!venta) throw new Error("Venta no encontrada.");
        venta.cambiarEstado("FINALIZADA");
        console.log(`Venta ${idVenta} finalizada. Total: ${venta.total}`);
    }
}