//DATOS INICIALES de ejemplo para poder probar el sistema

const Rol = require("../modelos/Rol");
const Categoria = require("../modelos/Categoria");
const Usuario = require("../modelos/Usuario");
const Producto = require("../modelos/Producto");

function cargarDatosIniciales(sistema) {
    const { rolService, categoriaServicio, usuarioService, productoService } = sistema;

    const administrador = new Rol(
        1, "Administrador", "Tiene permisos de administración."
    );
    const empleado = new Rol(
        2, "Empleado", "Registra ventas y administra stock."
    );
    rolService.crearRol(administrador);
    rolService.crearRol(empleado);

    const categoria = new Categoria(
        1, "Calzado", "Zapatos artesanales"
    );
    categoriaServicio.crearCategoria(categoria);

    const usuario = new Usuario(
        1, empleado.idRol, "Adrian", "Montaño", "adralemont@gmail.com", "123456"
    );
    usuarioService.crearUsuario(usuario);

    productoService.registrarProducto(
        new Producto(1, categoria.idCategoria, "Artesanal", "Zapato de cuero", "Zapato artesanal de cuero", 350, 10)
    );
    productoService.registrarProducto(
        new Producto(2, categoria.idCategoria, "Artesanal", "Sandalia de cuero", "Sandalia artesanal", 120, 6)
    );
    productoService.registrarProducto(
        new Producto(3, categoria.idCategoria, "Artesanal", "Cinturón de cuero", "Cinturón artesanal", 80, 30)
    );

    return { usuario, categoria };
}

module.exports = cargarDatosIniciales;
