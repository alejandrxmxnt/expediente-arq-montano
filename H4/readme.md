PRIMERA VERSION
#C4 caso de comercio - "Tienda de inventario y venta"

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

```mermaid
    flowchart TB
        empleado["👤 Empleado"]
        admin["👤 Administrador"]

        subgraph sistema["🛒 SISTEMA DE TIENDA — VENTAS E INVENTARIO"]

            Sistema["Sitio Web<br>Interfaz de ventas, inventario y administración"]
            backend ["Backend / Node.js <br> JavaScript <br> logica del negocio"]
            base de datos ("Base de datos <br> MySQL <br> producto, categoria, venta, usuario, rol, detalle venta, movimiento stock")

```

## COMO SE CONECTA TODO LO QUE YA HICIMOS