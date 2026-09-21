//ENTRADA POR CONSOLA: solo se encarga de leer lo que escribe el usuario

const readline = require("readline");

class Consola {

    #rl;
    #lineas;

    constructor () {
        this.#rl = readline.createInterface({ input: process.stdin });
        this.#lineas = this.#rl[Symbol.asyncIterator]();
    }

    // Devuelve el texto escrito, o null si ya no hay mas entrada
    async preguntar(texto) {
        process.stdout.write(texto);
        const { value, done } = await this.#lineas.next();
        if (done) return null;
        return value.trim();
    }

    async preguntarTexto(texto) {
        const respuesta = await this.preguntar(texto);
        if (respuesta === null) throw new Error("Entrada finalizada.");
        if (respuesta === "") throw new Error("El valor no puede estar vacío.");
        return respuesta;
    }

    async preguntarNumero(texto) {
        const respuesta = await this.preguntar(texto);
        if (respuesta === null) throw new Error("Entrada finalizada.");
        const numero = Number(respuesta);
        if (respuesta === "" || Number.isNaN(numero)) throw new Error("Debe ingresar un número válido.");
        return numero;
    }

    cerrar() {
        this.#rl.close();
    }
}

module.exports = Consola;
