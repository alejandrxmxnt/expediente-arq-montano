// Quien publica eventos (ProductoService hereda esto)
class Publicador {

    #observadores;

    constructor () {
        this.#observadores = [];
    }

    suscribir(observador) {
        this.#observadores.push(observador);
    }
    desuscribir(observador) {
        this.#observadores = this.#observadores.filter(o => o !== observador);
    }
    estaSuscrito(observador) {
        return this.#observadores.includes(observador);
    }
    notificar(evento) {
        this.#observadores.forEach(observador => observador.actualizar(evento));
    }
}

module.exports = Publicador;
