class Rol {

    // # es una forma de definir que va ser de aspecto privado por lo tanto esto es un encapsulamiento

    #idRol;
    #nombre;
    #descripcion;
    #estado;
    #fechaCreacion;

    constructor (idRol, nombre, descripcion){
        this.#idRol = idRol;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#estado = true;
        this.#fechaCreacion = new Date();
    }

    get idRol (){
        return this.#idRol;
    }
    get nombre(){
        return this.#nombre;
    }
    get descripcion() {
        return this.#descripcion;
    }
    get estado () {
        return this.#estado;
    }
    get fechaCreacion(){
        return this.#fechaCreacion;
    }

    cmabiarEstado () {
        this.#estado = !this.#estado;
    }
    editarEstado (nombre, descripcion) {
        if(nombre&&nombre.trim() !== ""){
            this.#nombre = nombre;
        }
        if(descripcion&&descripcion.trim() !== ""){
            this.#descripcion = descripcion;
        }
    }
}

module.exports = Rol;
