//PUNTO DE ENTRADA:  node .\H3\final\index.js
//Sistema de ventas con inventario - fusion de patrones OBSERVER + STRATEGY

const crearSistema = require("./sistema");
const cargarDatosIniciales = require("./datos/datosIniciales");
const Consola = require("./menu/Consola");
const Menu = require("./menu/Menu");

console.log("Cargando datos iniciales...");

const sistema = crearSistema();
const { usuario, categoria } = cargarDatosIniciales(sistema);

const consola = new Consola();
const menu = new Menu(consola, sistema, usuario, categoria);

menu.iniciar();
