# Parte 2 — Detecciones SOLID

## 1. SRP
**Dónde:** `RegistrarSalida` en `GestorDeEstadias`.
*Por qué:* calcula la tarifa, guarda en BD, imprime el ticket y manda WhatsApp — cuatro
razones de cambio en un solo método.

## 2. OCP
**Dónde:** el `switch (tipoVehiculo)` dentro de `RegistrarSalida`.
*Por qué:* agregar un tipo de vehículo nuevo obliga a modificar la clase existente en
vez de solo extenderla.

## 3. DIP
**Dónde:** `new BaseDeDatosParqueo()` y `new WhatsAppDelEdificio()`.
*Por qué:* el negocio depende de clases concretas de infraestructura en vez de
abstracciones; no se puede testear ni cambiar de proveedor sin tocar `GestorDeEstadias`.
