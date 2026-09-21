class RolService {

    constructor() { this.roles = []; }

    crearRol(rol) {
        this.roles.push(rol);
        console.log(`Rol "${rol.nombre}" creado correctamente.`);
    }

    editarRol(idRol, nombre, descripcion) {
        const rol = this.roles.find(r => r.idRol === idRol);
        if (!rol) throw new Error("Rol no encontrado.");
        rol.editarEstado(nombre, descripcion);
        console.log("Rol actualizado.");
    }

    eliminarRol(idRol) {
        const posicion = this.roles.findIndex(r => r.idRol === idRol);
        if (posicion === -1) throw new Error("Rol no encontrado.");
        this.roles.splice(posicion, 1);
        console.log("Rol eliminado.");
    }
}

module.exports = RolService;
