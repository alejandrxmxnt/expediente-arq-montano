//ARMADO DEL SISTEMA (composicion de dependencias)
//Aqui se crean los servicios y se conectan los patrones. No hay menu ni datos de ejemplo.

const CategoriaServicio = require("./servicios/CategoriaServicio");
const ProductoService = require("./servicios/ProductoService");
const MovimientoStockService = require("./servicios/MovimientoStockService");
const RolService = require("./servicios/RolService");
const UsuarioService = require("./servicios/UsuarioService");
const VentaService = require("./servicios/VentaService");

const AlertaConsolaObservador = require("./patrones/observer/AlertaConsolaObservador");
const HistorialMovimientosObservador = require("./patrones/observer/HistorialMovimientosObservador");
const NotificadorCorreoObservador = require("./patrones/observer/NotificadorCorreoObservador");

function crearSistema() {
    const categoriaServicio = new CategoriaServicio();
    const productoService = new ProductoService(5);
    const movimientoStockService = new MovimientoStockService(productoService);
    const rolService = new RolService();
    const usuarioService = new UsuarioService();
    const ventaService = new VentaService(productoService);

    //OBSERVER: se suscriben los observadores al ProductoService
    const alertaConsola = new AlertaConsolaObservador();
    const historial = new HistorialMovimientosObservador();
    const notificadorCorreo = new NotificadorCorreoObservador();

    productoService.suscribir(alertaConsola);
    productoService.suscribir(historial);
    productoService.suscribir(notificadorCorreo);

    return {
        categoriaServicio,
        productoService,
        movimientoStockService,
        rolService,
        usuarioService,
        ventaService,
        alertaConsola,
        historial,
        notificadorCorreo
    };
}

module.exports = crearSistema;
