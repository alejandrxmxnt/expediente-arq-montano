/*
 Antes, notificar el stock vivía DENTRO de ProductoService y decidía directamente qué hacer con la alerta un console.log fijo.
 */
class Observador {
    actualizar(evento) {
        throw new Error("actualizar() debe implementarse en la subclase.");
    }
}

class Publicador {
    #observadores = [];
    suscribir(observador) {
        this.#observadores.push(observador);
    }
    desuscribir(observador) {
        this.#observadores = this.#observadores.filter(o => o !== observador);
    }
    notificar(evento) {
        this.#observadores.forEach(observador => observador.actualizar(evento));
    }
}

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

    buscarProducto(idProducto) {
        return this.productos.find(p => p.idProducto === idProducto);
    }

    actualizarStock(idProducto, cantidad) {
        const producto = this.buscarProducto(idProducto);
        if (!producto) throw new Error("Producto no encontrado.");

        producto.actualizarStock(cantidad);

        // ProductoService solo anuncia. No decide qué se hace con esto.
        this.notificar({ tipo: "STOCK_ACTUALIZADO", producto, cambio: cantidad });

        if (producto.stock <= this.#umbralStockBajo) {
            this.notificar({ tipo: "STOCK_BAJO", producto });
        }
    }
}

class AlertaConsolaObservador extends Observador {
    actualizar(evento) {
        if (evento.tipo === "STOCK_BAJO") {
            console.log(`ALERTA: "${evento.producto.nombre}" tiene stock bajo (${evento.producto.stock} unidades).`);
        }
    }
}

class HistorialMovimientosObservador extends Observador {
    constructor() {
        super();
        this.historial = [];
    }
    actualizar(evento) {
        if (evento.tipo === "STOCK_ACTUALIZADO") {
            this.historial.push(
                `${evento.producto.nombre}: cambio de ${evento.cambio} (stock actual: ${evento.producto.stock})`
            );
        }
    }
}
// Simula un canal de correo
class NotificadorCorreoObservador extends Observador {
    actualizar(evento) {
        if (evento.tipo === "STOCK_BAJO") {
            console.log(`Correo enviado al encargado de compras sobre "${evento.producto.nombre}".`);
        }
    }
}

//PRUEBA DE FUNCIONAMIENTO
const productoService = new ProductoService(5);
const alertaConsola = new AlertaConsolaObservador();
const historial = new HistorialMovimientosObservador();
const notificadorCorreo = new NotificadorCorreoObservador();

productoService.suscribir(alertaConsola);
productoService.suscribir(historial);
productoService.suscribir(notificadorCorreo);

const producto = new Producto(1, "Zapato de cuero", 350, 10);
productoService.registrarProducto(producto);

console.log("\n--- Primera venta ---");
productoService.actualizarStock(producto.idProducto, -2); // stock: 8, no hay alerta

console.log("\n--- Segunda venta ---");
productoService.actualizarStock(producto.idProducto, -4); // stock: 4 <= 5, dispara STOCK_BAJO - queda con 4, dispara alerta

console.log("\n--- Historial capturado por HistorialMovimientosObservador ---");
historial.historial.forEach(linea => console.log(linea));

productoService.desuscribir(notificadorCorreo);
console.log("\n--- Tercera venta ---");
productoService.actualizarStock(producto.idProducto, -1); // stock: 3 sigue bajo pero sin correo