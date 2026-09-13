class Producto {
    #idProducto;
    #nombre;
    #precio;
    #stock;

    constructor (idProducto, nombre, precio, stock){
        this.#idProducto = idProducto;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#stock = stock;
    }
    get idProducto () {
        return this.#idProducto;
    }
    get nombre () {
        return this.#nombre;
    }
    get precio () {
        return this.#precio;
    }
    get stock() {
        return this.#stock;
    }

    actualizarStock(cantidad){
        const nuevoStock = this.#stock + cantidad;
        if (nuevoStock > 0) {
            throw new Error("Stock insuficiente");
            this.#stock = nuevoStock;
        }
    }
}

class ProductoService {
    constructor(){
        this.productos = [];
    }
    registrarProducto(producto) {
        this.productos.push(producto)
    }
    buscarProducto (idProducto){
        return this.productos.find(prod = prod.idProducto === idProducto);
    }
}

class DetalleVenta {
    #idDetalleVenta; 
    #idProducto; 
    #cantidad; 
    #precioUnitario; 
    #subtotal;

    constructor(idDetalleVenta, idProducto, cantidad, precioUnitario) {
        this.#idDetalleVenta = idDetalleVenta;
        this.#idProducto = idProducto;
        this.#cantidad = cantidad;
        this.#precioUnitario = precioUnitario;
        this.#subtotal = cantidad * precioUnitario;
    }
    get subtotal() { return this.#subtotal; }
    get idProducto() { return this.#idProducto; }
    get cantidad() { return this.#cantidad; }
}

class Venta {
    #idVenta; #idUsuario; #estado; #metodoPago; #total; #detalles;

    constructor(idVenta, idUsuario, metodoPago) {
        this.#idVenta = idVenta;
        this.#idUsuario = idUsuario;
        this.#metodoPago = metodoPago;
        this.#estado = "PENDIENTE";
        this.#total = 0;
        this.#detalles = [];
    }
    get idVenta() { 
        return this.#idVenta; 
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
        return [...this.#detalles]; 
    }

    agregarDetalle(detalle) {
        this.#detalles.push(detalle);
        this.#total = this.#detalles.reduce((t, d) => t + d.subtotal, 0);
    }
    cambiarEstado(nuevoEstado) {
        this.#estado = nuevoEstado;
    }
}

//ADAPTER

// Interfaz (contrato).
class IPasarelaPago {
    procesarPago(monto) {
        throw new Error("procesarPago() debe implementarse.");
    }
}

class PasarelaPagoExternaQR {
    ejecutarTransaccion(montoEnCentavos, moneda) {
        console.log(`[SDK externo QR] Cobrando ${montoEnCentavos} centavos (${moneda})`);
        return { exito: true, referencia: "QR-" + Date.now() };
    }
}

// Adapter: traduce PasarelaPagoExternaQR a la interfaz IPasarelaPago
class AdaptadorPasarelaQR extends IPasarelaPago {
    constructor(pasarelaExterna) {
        super();
        this.pasarelaExterna = pasarelaExterna;
    }
    procesarPago(monto) {
        const montoEnCentavos = Math.round(monto * 100);
        const resultado = this.pasarelaExterna.ejecutarTransaccion(montoEnCentavos, "BOB");
        return resultado.exito;
    }
}

class PasarelaPagoEfectivo extends IPasarelaPago {
    procesarPago(monto) {
        console.log(`Pago en efectivo recibido: ${monto}`);
        return true;
    }
}

class VentaService {
    constructor(productoService) {
        this.productoService = productoService;
        this.ventas = [];
        this.pasarelas = {
            EFECTIVO: new PasarelaPagoEfectivo(),
            QR: new AdaptadorPasarelaQR(new PasarelaPagoExternaQR())
        };
    }

    crearVenta(venta) {
        this.ventas.push(venta);
        console.log(`Venta ${venta.idVenta} creada (método de pago: ${venta.metodoPago}).`);
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

        const pasarela = this.pasarelas[venta.metodoPago];
        if (!pasarela) throw new Error(`Método de pago no soportado: ${venta.metodoPago}`);

        const pagoExitoso = pasarela.procesarPago(venta.total);
        if (!pagoExitoso) throw new Error("El pago no pudo procesarse.");

        venta.cambiarEstado("FINALIZADA");
        console.log(`Venta ${idVenta} finalizada. Total cobrado: ${venta.total}`);
    }
}


