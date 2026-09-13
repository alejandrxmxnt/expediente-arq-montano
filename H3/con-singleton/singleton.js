//Intentando APLICAR SINGLETON
class ConfiguracionSistema {
    static #instancia = null;

    #nombreEmpresa;
    #moneda;
    #porcentajeImpuesto;

    constructor(nombreEmpresa, moneda, porcentajeImpuesto) {
        this.#nombreEmpresa = nombreEmpresa;
        this.#moneda = moneda;
        this.#porcentajeImpuesto = porcentajeImpuesto;
        ConfiguracionSistema.#instancia = this;
    }

    static obtenerInstancia() {
        if (!ConfiguracionSistema.#instancia) {
            ConfiguracionSistema.#instancia = new ConfiguracionSistema(
                "Zapatería El Artesano",
                "BOB",
                0.13
            );
        }
        return ConfiguracionSistema.#instancia;
    }

    get nombreEmpresa() { 
        return this.#nombreEmpresa; 
    }
    get moneda() { 
        return this.#moneda; 
    }
    get porcentajeImpuesto() { 
        return this.#porcentajeImpuesto; 
    }

    calcularImpuesto(monto) {
        return monto * this.#porcentajeImpuesto;
    }
}

class ProductoConService {
    mostrarEncabezadoTienda() {
        const config = ConfiguracionSistema.obtenerInstancia();
        console.log(`Catálogo de: ${config.nombreEmpresa} (${config.moneda})`);
    }
}

class VentaService {
    calcularTotalConImpuesto(subtotal) {
        const config = ConfiguracionSistema.obtenerInstancia();
        const impuesto = config.calcularImpuesto(subtotal);
        return {
            subtotal,
            impuesto,
            total: subtotal + impuesto,
            moneda: config.moneda
        };
    }
}
