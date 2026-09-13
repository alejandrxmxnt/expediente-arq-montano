class Categoria {
    #idCategoria; #nombre; #descripcion; #estado;

    constructor(idCategoria, nombre, descripcion) {
        this.#idCategoria = idCategoria;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#estado = true;
    }
    get idCategoria() { return this.#idCategoria; }
    get nombre() { return this.#nombre; }
}

class Producto {
    #idProducto; #idCategoria; #marca; #nombre; #descripcion;
    #precio; #stock; #estado; #fechaCreacion;

    constructor(idProducto, idCategoria, marca, nombre, descripcion, precio, stock) {
        this.#idProducto = idProducto;
        this.#idCategoria = idCategoria;
        this.#marca = marca;
        this.#nombre = nombre;
        this.#descripcion = descripcion;
        this.#precio = precio;
        this.#stock = stock;
        this.#estado = true;
        this.#fechaCreacion = new Date();
    }

    get idProducto() { 
        return this.#idProducto; 
    }
    get idCategoria() { 
        return this.#idCategoria; 
    }
    get marca() { 
        return this.#marca; 
    }
    get nombre() { 
        return this.#nombre; 
    }
    get descripcion() { 
        return this.#descripcion; 
    }
    get precio() { 
        return this.#precio; 
    }
    get stock() { 
        return this.#stock; 
    }
}

class ProductoService {
    constructor() {
        this.productos = [];
    }
    registrarProducto(producto) {
        this.productos.push(producto);
        console.log(`Producto "${producto.nombre}" registrado correctamente.`);
    }
}

class ProductoConBuilder {
    constructor(idProducto, idCategoria) {
        this._idProducto = idProducto;
        this._idCategoria = idCategoria;

        this._marca = "";
        this._nombre = "";
        this._descripcion = "";
        this._precio = 0;
        this._stock = 0;
    }
    conMarca(marca) {
        this._marca = marca;
        return this;
    }
    conNombre(nombre) {
        this._nombre = nombre;
        return this;
    }
    conDescripcion(descripcion) {
        this._descripcion = descripcion;
        return this;
    }
    conPrecio(precio) {
        this._precio = precio;
        return this;
    }
    conStock(stock) {
        this._stock = stock;
        return this;
    }
    build() {
        if (!this._nombre || this._nombre.trim() === "") {
            throw new Error("El producto debe tener un nombre antes de construirse.");
        }
        return new Producto(
            this._idProducto,
            this._idCategoria,
            this._marca,
            this._nombre,
            this._descripcion,
            this._precio,
            this._stock
        );
    }
}

