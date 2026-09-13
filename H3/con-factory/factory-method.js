//factory method
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

    constructor(idProducto, idCategoria, marca, nombre, descripcion, precio, stock) {
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
    get nombre() { 
        return this.#nombre; 
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

    actualizarStock(cantidad) {
        const nuevoStock = this.#stock + cantidad;
        if (nuevoStock < 0) {
            throw new Error("No existe suficiente stock.");
        }
        this.#stock = nuevoStock;
        this.#fechaActualizacion = new Date();
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
    buscarProducto(idProducto) {
        return this.productos.find(p => p.idProducto === idProducto);
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
    #tipo;

    constructor(idMovimientoStock, idProducto, idUsuario, cantidad, stockAnterior, stockNuevo, motivo, tipo) {
        this.#idMovimientoStock = idMovimientoStock;
        this.#idProducto = idProducto;
        this.#idUsuario = idUsuario;
        this.#cantidad = cantidad;
        this.#stockAnterior = stockAnterior;
        this.#stockNuevo = stockNuevo;
        this.#motivo = motivo;
        this.#tipo = tipo;
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
    get tipo() { 
        return this.#tipo; 
    }
    get fechaActualizacion() { 
        return this.#fechaActualizacion; 
    }
}

// abstracto: define el contrato
class MovimientoStockFactory {
    crearMovimiento(idMovimiento, idProducto, idUsuario, cantidad, stockAnterior, stockNuevo, motivo) {
        throw new Error("crearMovimiento() debe implementarse en la subclase.");
    }
    calcularDelta(cantidad) {
        throw new Error("calcularDelta() debe implementarse en la subclase.");
    }
}

class EntradaStockFactory extends MovimientoStockFactory {
    calcularDelta(cantidad) {
        return cantidad;
    }
    crearMovimiento(idMovimiento, idProducto, idUsuario, cantidad, stockAnterior, stockNuevo, motivo) {
        return new MovimientoStock(idMovimiento, idProducto, idUsuario, cantidad,stockAnterior, stockNuevo, motivo, "ENTRADA");
    }
}

class SalidaStockFactory extends MovimientoStockFactory {
    calcularDelta(cantidad) {
        return -cantidad;
    }
    crearMovimiento(idMovimiento, idProducto, idUsuario, cantidad, stockAnterior, stockNuevo, motivo) {
        return new MovimientoStock(
            idMovimiento, idProducto, idUsuario, cantidad,
            stockAnterior, stockNuevo, motivo, "SALIDA"
        );
    }
}

class MovimientoStockService {
    constructor(productoService) {
        this.productoService = productoService;
        this.movimientos = [];
        this.factories = {
            ENTRADA: new EntradaStockFactory(),
            SALIDA: new SalidaStockFactory()
        };
    }

    registrarMovimiento(tipo, idMovimiento, idProducto, idUsuario, cantidad, motivo) {
        const factory = this.factories[tipo];
        if (!factory) {
            throw new Error(`Tipo de movimiento no soportado: ${tipo}`);
        }

        const producto = this.productoService.buscarProducto(idProducto);
        if (!producto) {
            throw new Error("Producto no encontrado.");
        }

        const stockAnterior = producto.stock;
        producto.actualizarStock(factory.calcularDelta(cantidad));

        const movimiento = factory.crearMovimiento(idMovimiento, idProducto, idUsuario, cantidad,stockAnterior, producto.stock, motivo);

        this.movimientos.push(movimiento);
        console.log(`Movimiento de tipo ${tipo} registrado. Stock actual: ${producto.stock}`);
        return movimiento;
    }
}
//prueba - funciono
//const productoService = new ProductoService();
//const movimientoStockService = new MovimientoStockService(productoService);
//const producto = new Producto(1, 1, "Artesanal", "Zapato de cuero", "Zapato artesanal de cuero", 350, 10);
//productoService.registrarProducto(producto);
//movimientoStockService.registrarMovimiento("ENTRADA", 1, producto.idProducto, 1, 5, "Compra de mercadería");
//movimientoStockService.registrarMovimiento("SALIDA", 2, producto.idProducto, 1, 3, "Venta al público");
//console.log(`Stock final: ${producto.stock}`);