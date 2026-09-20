class Producto {
 
    #idProducto;
    #nombre;
    #precio;
 
    constructor (idProducto, nombre, precio){
        this.#idProducto = idProducto;
        this.#nombre = nombre;
        this.#precio = precio;
    }
 
    get idProducto (){
        return this.#idProducto;
    }
    get nombre(){
        return this.#nombre;
    }
    get precio() {
        return this.#precio;
    }
}
 
// Contrato: todo lo que se pueda "cobrar" tiene precio y descripcion
class ICalculadorPrecio {
    obtenerPrecio() {
        throw new Error("obtenerPrecio() debe implementarse.");
    }
    obtenerDescripcion() {
        throw new Error("obtenerDescripcion() debe implementarse.");
    }
}
 
// Componente base: el producto tal cual, sin extras
class PrecioBase extends ICalculadorPrecio {
    #producto;
 
    constructor (producto){
        super();
        this.#producto = producto;
    }
    obtenerPrecio() {
        return this.#producto.precio;
    }
    obtenerDescripcion() {
        return this.#producto.nombre;
    }
}
 
// Decorador base: envuelve a otro ICalculadorPrecio y por defecto le delega todo
class DecoradorPrecio extends ICalculadorPrecio {
    constructor (calculador){
        super();
        this.calculador = calculador;
    }
    obtenerPrecio() {
        return this.calculador.obtenerPrecio();
    }
    obtenerDescripcion() {
        return this.calculador.obtenerDescripcion();
    }
}
 
// Decoradores concretos: cada uno agrega UNA cosa
class ConEmpaqueRegalo extends DecoradorPrecio {
    obtenerPrecio() {
        return super.obtenerPrecio() + 15;
    }
    obtenerDescripcion() {
        return `${super.obtenerDescripcion()} + Empaque de regalo`;
    }
}
 
class ConEnvioDomicilio extends DecoradorPrecio {
    obtenerPrecio() {
        return super.obtenerPrecio() + 25;
    }
    obtenerDescripcion() {
        return `${super.obtenerDescripcion()} + Envío a domicilio`;
    }
}
 
class ConGarantiaExtendida extends DecoradorPrecio {
    // 10% del precio acumulado hasta ese momento
    obtenerPrecio() {
        const precioActual = super.obtenerPrecio();
        return precioActual + precioActual * 0.10;
    }
    obtenerDescripcion() {
        return `${super.obtenerDescripcion()} + Garantía extendida`;
    }
}
//prueba
const zapato = new Producto(1, "Zapato de cuero", 350);
 
console.log("\n--- Solo el producto ---");
const simple = new PrecioBase(zapato);
console.log(`${simple.obtenerDescripcion()} -> ${simple.obtenerPrecio()}`);
 
console.log("\n--- Con empaque de regalo ---");
const conRegalo = new ConEmpaqueRegalo(new PrecioBase(zapato));
console.log(`${conRegalo.obtenerDescripcion()} -> ${conRegalo.obtenerPrecio()}`);
 
console.log("\n--- Con regalo + envío (se pueden apilar) ---");
const conRegaloYEnvio = new ConEnvioDomicilio(new ConEmpaqueRegalo(new PrecioBase(zapato)));
console.log(`${conRegaloYEnvio.obtenerDescripcion()} -> ${conRegaloYEnvio.obtenerPrecio()}`);
 
console.log("\n--- Con los tres extras ---");
const completo = new ConGarantiaExtendida(
    new ConEnvioDomicilio(
        new ConEmpaqueRegalo(
            new PrecioBase(zapato)
        )
    )
);
console.log(`${completo.obtenerDescripcion()} -> ${completo.obtenerPrecio().toFixed(2)}`);
