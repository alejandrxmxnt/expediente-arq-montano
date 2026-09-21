const DetalleVenta = require("../modelos/DetalleVenta");
const SinDescuento = require("../patrones/strategy/SinDescuento");

//STRATEGY: VentaService recibe la estrategia de descuento y solo la invoca
class VentaService {
    constructor(productoService, estrategiaDescuento = new SinDescuento()) {
        this.productoService = productoService;
        this.estrategiaDescuento = estrategiaDescuento;
        this.ventas = [];
    }

    establecerEstrategiaDescuento(estrategia) {
        this.estrategiaDescuento = estrategia;
        console.log(`Estrategia de descuento activa: ${estrategia.nombre}`);
    }

    crearVenta(venta) {
        this.ventas.push(venta);
        console.log(`Venta ${venta.idVenta} creada.`);
    }

    buscarVenta(idVenta) {
        return this.ventas.find(v => v.idVenta === idVenta);
    }

    agregarProducto(idVenta, idProducto, cantidad, idDetalle) {
        const venta = this.buscarVenta(idVenta);
        if (!venta) throw new Error("Venta no encontrada.");

        const producto = this.productoService.buscarProducto(idProducto);
        if (!producto) throw new Error("Producto no encontrado.");
        if (producto.stock < cantidad) throw new Error("Stock insuficiente.");

        const detalle = new DetalleVenta(idDetalle, idProducto, cantidad, producto.precio);
        venta.agregarDetalle(detalle);

        //OBSERVER: el stock se descuenta por ProductoService para que se disparen las alertas
        this.productoService.actualizarStock(idProducto, -cantidad);

        console.log(`Producto "${producto.nombre}" agregado a la venta.`);
    }

    finalizarVenta(idVenta, estrategiaParaEstaVenta = null) {
        const venta = this.buscarVenta(idVenta);
        if (!venta) throw new Error("Venta no encontrada.");

        //STRATEGY: se usa la estrategia puntual si llega, si no la global del servicio
        const estrategia = estrategiaParaEstaVenta ?? this.estrategiaDescuento;
        const descuento = estrategia.calcular(venta.total);

        venta.aplicarDescuento(descuento, estrategia.nombre);
        venta.cambiarEstado("FINALIZADA");
        console.log(`Venta ${idVenta} finalizada. Total: ${venta.totalFinal.toFixed(2)}`);
    }

    reporteVenta(idVenta) {
        const venta = this.buscarVenta(idVenta);
        if (!venta) throw new Error("Venta no encontrada.");

        console.log("\n========== REPORTE DE VENTA ==========");
        console.log(`ID Venta: ${venta.idVenta}`);
        console.log(`Usuario: ${venta.idUsuario}`);
        console.log(`Estado: ${venta.estado}`);
        console.log(`Método de pago: ${venta.metodoPago}`);
        console.log("\nDETALLES:");

        venta.detalles.forEach(detalle => {
            console.log(
                `Producto: ${detalle.idProducto} | ` +
                `Cantidad: ${detalle.cantidad} | ` +
                `Precio: ${detalle.precioUnitario} | ` +
                `Subtotal: ${detalle.subtotal}`
            );
        });

        console.log(`\nSubtotal: ${venta.total}`);
        console.log(`Descuento [${venta.nombreDescuento}]: ${venta.descuento.toFixed(2)}`);
        console.log(`TOTAL: ${venta.totalFinal.toFixed(2)}`);
        console.log("======================================");
    }
}

module.exports = VentaService;
