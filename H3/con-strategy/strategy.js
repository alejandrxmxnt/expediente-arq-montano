/*
Con Strategy cada forma de calcular el descuento es una clase con el MISMO contrato calcular(total)
VentaService - no sabe cuál está usando ni cómo calcula: solo la invoca.
*/

class Producto {
    #idProducto; 
    #nombre; 
    #precio; 
    #stock;

    constructor(idProducto, nombre, precio, stock) {
        this.#idProducto = idProducto;
        this.#nombre = nombre;
        this.#precio = precio;
        this.#stock = stock;
    }
    get idProducto() { 
        return this.#idProducto; 
    }
    get nombre() { 
        return this.#nombre; 
    }
    get precio() { 
        return this.#precio; 
    }
    get stock() { 
        return this.#stock; 
    }

    actualizarStock(cantidad) {
        const nuevoStock = this.#stock + cantidad;
        if (nuevoStock < 0) throw new Error("No existe suficiente stock.");
        this.#stock = nuevoStock;
    }
}

class ProductoService {
    constructor() { this.productos = []; }
    registrarProducto(producto) { this.productos.push(producto); }
    buscarProducto(idProducto) {
        return this.productos.find(p => p.idProducto === idProducto);
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
}

class Venta {
    #idVenta; #idUsuario; #estado; #total; #detalles;

    constructor(idVenta, idUsuario) {
        this.#idVenta = idVenta;
        this.#idUsuario = idUsuario;
        this.#estado = "PENDIENTE";
        this.#total = 0;
        this.#detalles = [];
    }
    get idVenta() { return this.#idVenta; }
    get estado() { return this.#estado; }
    get total() { return this.#total; }
    get detalles() { return [...this.#detalles]; }

    agregarDetalle(detalle) {
        this.#detalles.push(detalle);
        this.#total = this.#detalles.reduce((t, d) => t + d.subtotal, 0);
    }
    cambiarEstado(nuevoEstado) {
        this.#estado = nuevoEstado;
    }
}
// STRATEGY
class EstrategiaDescuento {
    calcular(total) {
        throw new Error("calcular() debe implementarse en la subclase.");
    }
    // Cada estrategia también describe cómo se llama, útil para el reporte.
    get nombre() {
        return "Estrategia sin nombre";
    }
}
class SinDescuento extends EstrategiaDescuento {
    calcular(total) { 
        return 0; 
    }
    get nombre() { 
        return "Sin descuento"; 
    }
}
class DescuentoPorVolumen extends EstrategiaDescuento {
    // 10% si la compra supera 500
    calcular(total) {
        return total >= 500 ? total * 0.10 : 0;
    }
    get nombre() { 
        return "Descuento por volumen (10% desde 500)"; 
    }
}

class DescuentoClienteFrecuente extends EstrategiaDescuento {
    // 5% fijo sin importar el monto
    calcular(total) {
        return total * 0.05;
    }
    get nombre() { 
        return "Descuento cliente frecuente (5%)"; 
    }
}

class VentaService {
    constructor(productoService, estrategiaDescuento = new SinDescuento()) {
        this.productoService = productoService;
        this.ventas = [];
        this.estrategiaDescuento = estrategiaDescuento;
    }

    establecerEstrategiaDescuento(estrategia) {
        this.estrategiaDescuento = estrategia;
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

    finalizarVenta(idVenta, estrategiaParaEstaVenta = null) {
        const venta = this.ventas.find(v => v.idVenta === idVenta);
        if (!venta) throw new Error("Venta no encontrada.");

        const estrategia = estrategiaParaEstaVenta ?? this.estrategiaDescuento;
        const descuento = estrategia.calcular(venta.total);
        const totalFinal = venta.total - descuento;

        venta.cambiarEstado("FINALIZADA");

        console.log(
            `Venta ${idVenta} finalizada [${estrategia.nombre}] -> ` +
            `Subtotal: ${venta.total} | Descuento: ${descuento.toFixed(2)} | Total: ${totalFinal.toFixed(2)}`
        );

        return totalFinal;
    }
}
//PRUEBA DE FUNCIONALIDAD
const productoService = new ProductoService();
productoService.registrarProducto(new Producto(1, "Zapato de cuero", 350, 20));

// VentaService sin descuento
const ventaService = new VentaService(productoService);
console.log("\n--- Venta 1: sin cambiar nada ---");
const venta1 = new Venta(1, 1);
ventaService.crearVenta(venta1);
ventaService.agregarProducto(venta1.idVenta, 1, 1, 1);
ventaService.finalizarVenta(venta1.idVenta);
//cambio la estrategia global a Descuento por volumen
console.log("\n--- Venta 2 ---");
ventaService.establecerEstrategiaDescuento(new DescuentoPorVolumen());
const venta2 = new Venta(2, 1);
ventaService.crearVenta(venta2);
ventaService.agregarProducto(venta2.idVenta, 1, 2, 2);
ventaService.finalizarVenta(venta2.idVenta);
//mismo servicio, pero paso una estrategia puntual (cliente frecuente)
console.log("\n--- Venta 3 ---");
const venta3 = new Venta(3, 2);
ventaService.crearVenta(venta3);
ventaService.agregarProducto(venta3.idVenta, 1, 1, 3); // 350
ventaService.finalizarVenta(venta3.idVenta, new DescuentoClienteFrecuente());
//confirmo que la estrategia global sigue siendo DescuentoPorVolumen
console.log("\n--- Venta 4 ---");
const venta4 = new Venta(4, 1);
ventaService.crearVenta(venta4);
ventaService.agregarProducto(venta4.idVenta, 1, 1, 4);
ventaService.finalizarVenta(venta4.idVenta);