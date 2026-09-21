const MovimientoStock = require("../modelos/MovimientoStock");

class MovimientoStockService {
    constructor(productoService) {
        this.productoService = productoService;
        this.movimientos = [];
    }

    registrarEntrada(idMovimiento, idProducto, idUsuario, cantidad, motivo) {
        if (cantidad <= 0) throw new Error("La cantidad debe ser mayor que cero.");
        const producto = this.productoService.buscarProducto(idProducto);
        if (!producto) throw new Error("Producto no encontrado.");

        const stockAnterior = producto.stock;
        this.productoService.actualizarStock(idProducto, cantidad);

        const movimiento = new MovimientoStock(
            idMovimiento, idProducto, idUsuario, cantidad,
            stockAnterior, producto.stock, motivo
        );
        this.movimientos.push(movimiento);
        console.log("Entrada de stock registrada.");
    }

    registrarSalida(idMovimiento, idProducto, idUsuario, cantidad, motivo) {
        if (cantidad <= 0) throw new Error("La cantidad debe ser mayor que cero.");
        const producto = this.productoService.buscarProducto(idProducto);
        if (!producto) throw new Error("Producto no encontrado.");

        const stockAnterior = producto.stock;
        this.productoService.actualizarStock(idProducto, -cantidad);

        const movimiento = new MovimientoStock(
            idMovimiento, idProducto, idUsuario, cantidad,
            stockAnterior, producto.stock, motivo
        );
        this.movimientos.push(movimiento);
        console.log("Salida de stock registrada.");
    }
}

module.exports = MovimientoStockService;
