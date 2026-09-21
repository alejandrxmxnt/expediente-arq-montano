PRIMERA VERSION
#C4 caso de comercio - "Tienda de inventario y venta"
Sistema de consola en JavaScript (Node.js) para gestionar productos, stock, ventas y descuentos. Fusiona dos patrones de diseño: *Observer* (alertas y registro de stock) y *Strategy* (descuentos de venta). La decisión está documentada en (adr-001.md).

## NIVEL 1

**¿quién usa el sistema y con qué otros sistemas habla?**

```mermaid
flowchart TB
    empleado["👤 Empleado<br>(registra ventas)"]
    admin["👤 Administrador<br>(ajusta stock, establece los precios, cancela ventas)"]

    sistema["🛒 SISTEMA DE TIENDA CON INVENTARIO Y VENTA<br>Registra ventas, cancela operaciones, controla stock, establece precios, hace los calculos, controla movimientos<br> notifica quien hizo la actualizacion de stock, avisa cuando algun producto esta por agotarse, reporte de ventas de usuarios "]
    correo["Servicio de correo<br>En caso de agotarse el stock o se olvido la contraseña(externo)"]

    empleado -->|"registra ventas"| sistema
    admin -->|"gestiona stock, establece precios, cancela operaciones"| sistema
    sistema -->|"genera reporte de venta, generar avisos"| correo
    correo -->|"envia codigo en caso de perder acceso"| empleado
    correo -->|"envia avisos de stock y codigo"| admin
```

## NIVEL 2 
# Tus contenedores ¿DONDE VIVE TU LOGICA?, ¿TU DB?, ¿TUS AVISOS?
Muestra el interior de la aplicación y *dónde viven los dos patrones*: `patrones/observer/` y `patrones/strategy/`.

```mermaid
flowchart TB
    usr["👤 <b>Empleado o Administrador</b>"]

    subgraph app["Aplicación de consola · Node.js"]
        entrada["<b>index.js y datos/</b><br/>[JavaScript]<br/>Arma los servicios, carga datos de ejemplo"]
        menu["<b>menu/</b><br/>[JavaScript]<br/>Menu y Consola: muestran las opciones,<br/>leen la entrada y llaman a los servicios"]
        servicios["<b>servicios/</b><br/>[JavaScript]<br/>ProductoService, VentaService,<br/>MovimientoStockService y demás"]
        modelos["<b>modelos/</b><br/>[JavaScript]<br/>Rol, Categoria, Producto, Venta... etc."]

        subgraph patrones["Patrones de diseño fusionados"]
            observer["<b>patrones/observer/</b><br/>[PATRÓN OBSERVER]<br/>Publicador, Observador, observadores:<br/>alerta en consola"]
            strategy["<b>patrones/strategy/</b><br/>[PATRÓN STRATEGY]<br/>EstrategiaDescuento y 3 estrategias:<br/>sin descuento, volumen y cliente frecuente"]
        end
    end

    bd[("<b>Base de datos</b><br/>[Sistema externo]")]
    pasarela["<b>Pasarela de pago</b><br/>[Sistema externo]"]
    correo["<b>Servicio de correo</b><br/>[Sistema externo]"]

    usr -->|"Elige opciones<br/>[Terminal]"| menu
    entrada -->|"Crea y arranca"| menu
    entrada -.->|"Crea los servicios y<br/>suscribe los observadores"| servicios
    menu -->|"Invoca las operaciones"| servicios
    servicios -->|"Crea y modifica"| modelos
    servicios -->|"ProductoService publica<br/>STOCK_ACTUALIZADO y STOCK_BAJO"| observer
    servicios -->|"VentaService pide<br/>calcular el descuento"| strategy
    servicios -->|"Lee y guarda los datos<br/>"| bd
    servicios -->|"VentaService solicita el cobro<br/>"| pasarela
    observer -->|"Alerta de stock bajo<br/>"| correo
```
