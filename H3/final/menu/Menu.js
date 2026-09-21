//MENU: muestra las opciones y llama a los servicios. No tiene logica de negocio.

const Producto = require("../modelos/Producto");
const Venta = require("../modelos/Venta");

const SinDescuento = require("../patrones/strategy/SinDescuento");
const DescuentoPorVolumen = require("../patrones/strategy/DescuentoPorVolumen");
const DescuentoClienteFrecuente = require("../patrones/strategy/DescuentoClienteFrecuente");

class Menu {

    constructor (consola, sistema, usuario, categoria) {
        this.consola = consola;
        this.usuario = usuario;
        this.categoria = categoria;

        this.productoService = sistema.productoService;
        this.movimientoStockService = sistema.movimientoStockService;
        this.ventaService = sistema.ventaService;
        this.historial = sistema.historial;
        this.notificadorCorreo = sistema.notificadorCorreo;

        this.siguienteIdProducto = this.productoService.productos.length + 1;
        this.siguienteIdVenta = 1;
        this.siguienteIdDetalle = 1;
        this.siguienteIdMovimiento = 1;
    }

    mostrarMenu() {
        const correoActivo = this.productoService.estaSuscrito(this.notificadorCorreo);

        console.log("\n========================================");
        console.log("      SISTEMA DE INVENTARIO Y VENTAS");
        console.log("========================================");
        console.log(" 1. Listar productos");
        console.log(" 2. Registrar producto");
        console.log(" 3. Entrada de stock");
        console.log(" 4. Salida de stock");
        console.log(" 5. Realizar venta");
        console.log(" 6. Ver reporte de una venta");
        console.log(" 7. Cambiar estrategia de descuento");
        console.log(" 8. Activar/desactivar correo de alertas");
        console.log(" 9. Ver historial de stock");
        console.log(" 0. Salir");
        console.log("----------------------------------------");
        console.log(`Descuento activo: ${this.ventaService.estrategiaDescuento.nombre}`);
        console.log(`Correo de alertas: ${correoActivo ? "ACTIVO" : "INACTIVO"}`);
        console.log("----------------------------------------");
    }

    listarProductos() {
        console.log("\n========== PRODUCTOS ==========");
        this.productoService.productos.forEach(p => {
            console.log(`ID: ${p.idProducto} | ${p.nombre} | Precio: ${p.precio} | Stock: ${p.stock}`);
        });
    }

    async opcionRegistrarProducto() {
        const nombre = await this.consola.preguntarTexto("Nombre: ");
        const marca = await this.consola.preguntarTexto("Marca: ");
        const descripcion = await this.consola.preguntarTexto("Descripción: ");
        const precio = await this.consola.preguntarNumero("Precio: ");
        const stock = await this.consola.preguntarNumero("Stock inicial: ");

        const producto = new Producto(
            this.siguienteIdProducto, this.categoria.idCategoria, marca, nombre, descripcion, precio, stock
        );
        this.productoService.registrarProducto(producto);
        this.siguienteIdProducto++;
    }

    async opcionMovimiento(tipo) {
        this.listarProductos();
        const idProducto = await this.consola.preguntarNumero("ID del producto: ");
        const cantidad = await this.consola.preguntarNumero("Cantidad: ");
        const motivo = await this.consola.preguntarTexto("Motivo: ");

        if (tipo === "ENTRADA") {
            this.movimientoStockService.registrarEntrada(
                this.siguienteIdMovimiento, idProducto, this.usuario.idUsuario, cantidad, motivo
            );
        } else {
            this.movimientoStockService.registrarSalida(
                this.siguienteIdMovimiento, idProducto, this.usuario.idUsuario, cantidad, motivo
            );
        }
        this.siguienteIdMovimiento++;

        console.log(`Stock actual: ${this.productoService.buscarProducto(idProducto).stock}`);
    }

    async opcionVenta() {
        console.log("Métodos de pago: 1. EFECTIVO  2. TARJETA  3. QR");
        const opcionPago = await this.consola.preguntar("Elija el método de pago: ");
        const metodos = { "1": "EFECTIVO", "2": "TARJETA", "3": "QR" };
        const metodoPago = metodos[opcionPago];
        if (!metodoPago) throw new Error("Método de pago no válido.");

        const venta = new Venta(this.siguienteIdVenta, this.usuario.idUsuario, metodoPago);
        this.ventaService.crearVenta(venta);
        this.siguienteIdVenta++;

        let seguir = true;
        while (seguir) {
            this.listarProductos();
            try {
                const idProducto = await this.consola.preguntarNumero("ID del producto: ");
                const cantidad = await this.consola.preguntarNumero("Cantidad: ");
                this.ventaService.agregarProducto(venta.idVenta, idProducto, cantidad, this.siguienteIdDetalle);
                this.siguienteIdDetalle++;
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
            const respuesta = await this.consola.preguntar("¿Agregar otro producto? (s/n): ");
            seguir = respuesta !== null && respuesta.toLowerCase() === "s";
        }

        if (venta.detalles.length === 0) {
            venta.cambiarEstado("CANCELADA");
            console.log("Venta cancelada: no se agregaron productos.");
            return;
        }

        this.ventaService.finalizarVenta(venta.idVenta);
        this.ventaService.reporteVenta(venta.idVenta);
    }

    async opcionReporte() {
        const ids = this.ventaService.ventas.map(v => v.idVenta).join(", ");
        console.log(`Ventas registradas: ${ids === "" ? "ninguna" : ids}`);
        const idVenta = await this.consola.preguntarNumero("ID de la venta: ");
        this.ventaService.reporteVenta(idVenta);
    }

    async opcionEstrategia() {
        console.log("1. Sin descuento");
        console.log("2. Descuento por volumen (10% desde 500)");
        console.log("3. Descuento cliente frecuente (5%)");
        const opcion = await this.consola.preguntar("Elija la estrategia: ");

        const estrategias = {
            "1": new SinDescuento(),
            "2": new DescuentoPorVolumen(),
            "3": new DescuentoClienteFrecuente()
        };
        const estrategia = estrategias[opcion];
        if (!estrategia) throw new Error("Estrategia no válida.");

        this.ventaService.establecerEstrategiaDescuento(estrategia);
    }

    opcionCorreo() {
        if (this.productoService.estaSuscrito(this.notificadorCorreo)) {
            this.productoService.desuscribir(this.notificadorCorreo);
            console.log("Correo de alertas DESACTIVADO (el observador se desuscribió).");
        } else {
            this.productoService.suscribir(this.notificadorCorreo);
            console.log("Correo de alertas ACTIVADO (el observador se suscribió).");
        }
    }

    opcionHistorial() {
        console.log("\n========== HISTORIAL DE STOCK ==========");
        if (this.historial.historial.length === 0) {
            console.log("Todavía no hay movimientos registrados.");
            return;
        }
        this.historial.historial.forEach(linea => console.log(linea));
    }

    async iniciar() {
        let salir = false;

        while (!salir) {
            this.mostrarMenu();
            const opcion = await this.consola.preguntar("Seleccione una opción: ");
            if (opcion === null) break;

            try {
                switch (opcion) {
                    case "1": this.listarProductos(); break;
                    case "2": await this.opcionRegistrarProducto(); break;
                    case "3": await this.opcionMovimiento("ENTRADA"); break;
                    case "4": await this.opcionMovimiento("SALIDA"); break;
                    case "5": await this.opcionVenta(); break;
                    case "6": await this.opcionReporte(); break;
                    case "7": await this.opcionEstrategia(); break;
                    case "8": this.opcionCorreo(); break;
                    case "9": this.opcionHistorial(); break;
                    case "0":
                        salir = true;
                        console.log("Hasta luego.");
                        break;
                    default:
                        console.log("Opción no válida.");
                }
            } catch (error) {
                console.log(`Error: ${error.message}`);
            }
        }

        this.consola.cerrar();
    }
}

module.exports = Menu;
