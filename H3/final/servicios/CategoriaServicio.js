class CategoriaServicio {
    constructor () {
        this.categorias = [];
    }
    crearCategoria (categoria) {
        this.categorias.push(categoria);
        console.log(`Categoría "${categoria.nombre}" creada correctamente.`);
    }
    editarCategoria (idCategoria, nombre, descripcion){
        const categoria = this.buscarCategoria(idCategoria);
        if (!categoria) throw new Error("Categoría no encontrada.");
        categoria.editarCategoria(nombre, descripcion);
        console.log("Categoría actualizada.");
    }
    eliminarCategoria (idCategoria) {
        const posicion = this.categorias.findIndex(c => c.idCategoria === idCategoria);
        if (posicion === -1) throw new Error("Categoría no encontrada.");
        this.categorias.splice(posicion, 1);
        console.log("Categoría eliminada.");
    }
    buscarCategoria(idCategoria) {
        return this.categorias.find(c => c.idCategoria === idCategoria)
    }
}

module.exports = CategoriaServicio;
