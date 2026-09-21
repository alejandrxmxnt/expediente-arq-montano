class Categoria {

    #idCategoria;
    #nombre;
    #descripcion;
    #estado;
    #fechaCreacion;
    #fechaActualizacion;

    constructor (idCategoria, nombre, descripcion){
        this.#idCategoria = idCategoria;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#estado = true;
        this.#fechaCreacion = new Date();
        this.#fechaActualizacion = new Date();
    }

    get idCategoria () {
        return this.#idCategoria;
    }
    get nombre(){
        return this.#nombre;
    }
    get descripcion() {
        return this.#descripcion;
    }
    get estado() {
        return this.#estado;
    }
    get fechaCreacion() {
        return this.#fechaCreacion;
    }
    get fechaActualizacion() {
        return this.#fechaActualizacion;
    }

    cambiarEstado () {
        this.#estado = !this.#estado;
        this.#fechaActualizacion = new Date();
    }
    editarCategoria (nombre, descripcion){
        if(nombre&&nombre.trim() !== ""){
            this.#nombre = nombre;
        }
        if(descripcion&&descripcion.trim() !== ""){
            this.#descripcion = descripcion;
        }
        this.#fechaActualizacion = new Date();
    }
}

module.exports = Categoria;
