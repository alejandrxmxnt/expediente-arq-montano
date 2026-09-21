const Publicador = require("../patrones/observer/Publicador");

//OBSERVER: ProductoService es un Publicador.
//Solo ANUNCIA lo que pasa con el stock, no decide que se hace con eso.
class ProductoService extends Publicador {

    #umbralStockBajo;

    constructor(umbralStockBajo = 5) {
        super();
        this.productos = [];
        this.#umbralStockBajo = umbralStockBajo;
    }

    registrarProducto(producto) {
        this.productos.push(producto);
        console.log(`Producto "${producto.nombre}" registrado correctamente.`);
    }

    editarProducto(idProducto, nombre, descripcion, precio) {
        const producto = this.buscarProducto(idProducto);
        if (!producto) throw new Error("Producto no encontrado.");
        producto.editarProducto(nombre, descripcion, precio);
        console.log("Producto actualizado.");
    }

    eliminarProducto(idProducto) {
        const posicion = this.productos.findIndex(p => p.idProducto === idProducto);
        if (posicion === -1) throw new Error("Producto no encontrado.");
        this.productos.splice(posicion, 1);
        console.log("Producto eliminado.");
    }

    buscarProducto(idProducto) {
        return this.productos.find(p => p.idProducto === idProducto);
    }

    // Unico punto por donde cambia el stock: asi ningun cambio se escapa de los observadores
    actualizarStock(idProducto, cantidad) {
        const producto = this.buscarProducto(idProducto);
        if (!producto) throw new Error("Producto no encontrado.");

        producto.actualizarStock(cantidad);

        this.notificar({ tipo: "STOCK_ACTUALIZADO", producto, cambio: cantidad });

        if (producto.stock <= this.#umbralStockBajo) {
            this.notificar({ tipo: "STOCK_BAJO", producto });
        }
    }
}

module.exports = ProductoService;
