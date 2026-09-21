// Contrato que deben cumplir todos los observadores
class Observador {
    actualizar(evento) {
        throw new Error("actualizar() debe implementarse en la subclase.");
    }
}

module.exports = Observador;
