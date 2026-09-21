class UsuarioService {
    constructor() {
        this.usuarios = [];
    }

    crearUsuario(usuario) {
        this.usuarios.push(usuario);
        console.log(`Usuario "${usuario.nombre}" creado correctamente.`);
    }

    editarUsuario(idUsuario, nombre, apellido, correo) {
        const usuario = this.buscarUsuario(idUsuario);
        if (!usuario) throw new Error("Usuario no encontrado.");
        usuario.editarUsuario(nombre, apellido, correo);
        console.log("Usuario actualizado.");
    }

    eliminarUsuario(idUsuario) {
        const posicion = this.usuarios.findIndex(u => u.idUsuario === idUsuario);
        if (posicion === -1) throw new Error("Usuario no encontrado.");
        this.usuarios.splice(posicion, 1);
        console.log("Usuario eliminado.");
    }

    buscarUsuario(idUsuario) {
        return this.usuarios.find(u => u.idUsuario === idUsuario);
    }

    cambiarRol(idUsuario, idRol) {
        const usuario = this.buscarUsuario(idUsuario);
        if (!usuario) throw new Error("Usuario no encontrado.");
        usuario.cambiarRol(idRol);
        console.log("Rol del usuario actualizado.");
    }
}

module.exports = UsuarioService;
