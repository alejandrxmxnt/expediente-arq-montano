class Usuario {

    #idUsuario;
    #idRol;
    #nombre;
    #apellido;
    #correo;
    #contrasenia;
    #fechaCreacion;
    #estado;

    constructor(idUsuario,idRol,nombre,apellido,correo,contrasenia) {

        this.#idUsuario = idUsuario;
        this.#idRol = idRol;
        this.#nombre = nombre;
        this.#apellido = apellido;
        this.#correo = correo;
        this.#contrasenia = contrasenia;//esto no es etico pero para este caso lo guardaremos asi
        this.#fechaCreacion = new Date();
        this.#estado = true;
    }

    get idUsuario() {
        return this.#idUsuario;
    }
    get idRol() {
        return this.#idRol;
    }
    get nombre() {
        return this.#nombre;
    }
    get apellido() {
        return this.#apellido;
    }
    get correo() {
        return this.#correo;
    }
    get fechaCreacion() {
        return this.#fechaCreacion;
    }
    get estado() {
        return this.#estado;
    }

    cambiarEstadoUsuario() {
        this.#estado = !this.#estado;
    }

    cambiarRol(idRol){
        if (!idRol) throw new Error("Debe proporcionar un rol válido.");
        this.#idRol = idRol;
    }

    editarUsuario(nombre, apellido, correo) {

        if (nombre) {
            this.#nombre = nombre;
        }
        if (apellido) {
            this.#apellido = apellido;
        }
        if (correo) {
            this.#correo = correo;
        }
    }
}

module.exports = Usuario;
