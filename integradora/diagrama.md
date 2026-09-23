# Parte 1 — El plano

**Autor:** ADRIAN ALEJANDRO MONTAÑO SOLIZ
**Caso:** Sistema de parqueo — Edificio "Torre Central"

## Sustantivo (candidatos a clases)
Vehículo, estadía, parqueo, portero, administrador, tarifa, estado, aviso, dueño y reporte de ingresos.

## Verbos (candidatos a metodos)
Entrar, salir, pagar, registrar entrada, registrar salida, ajustar tarifa, anular estadía, avisar y generar reporte.

## Filtro (como atributo)
- `Vehiculo` (Placa, `TipoVehiculo`: Auto/Moto/Residente)
- `Estadia` (clase central, con `EstadoEstadia`: EnCurso/PorPagar/Pagada/Anulada)
- `Portero` y `Administrador` (roles)
- `Tarifa` (precio por hora según tipo)
- aviso >24h → *patrón Observer*



## Diagrama

```
classDiagram
    direction LR

    class Vehiculo {
        +string Placa
        +TipoVehiculo Tipo
    }
    class TipoVehiculo {
        <<enumeration>>
        Auto
        Moto
        Residente
    }

    class Estadia {
        +Vehiculo Vehiculo
        +DateTime HoraEntrada
        +decimal Total
        +EstadoEstadia Estado
        +RegistrarSalida()
        +Pagar()
        +Anular()
    }
    class EstadoEstadia {
        <<enumeration>>
        EnCurso
        PorPagar
        Pagada
        Anulada
    }

    class Portero {
        +RegistrarEntrada(Vehiculo) Estadia
        +RegistrarSalida(Estadia)
    }
    class Administrador {
        +AjustarTarifa(TipoVehiculo, decimal)
        +AnularEstadia(Estadia)
    }
    class Tarifa {
        +TipoVehiculo Tipo
        +decimal PrecioPorHora
    }

    class IObservadorEstadia {
        <<interface>>
        +EstadiaVencida(Estadia)
    }
    class NotificadorWhatsApp

    Portero --> Estadia : registra
    Administrador --> Tarifa : ajusta
    Administrador --> Estadia : anula
    Estadia --> Vehiculo
    Estadia o-- IObservadorEstadia : notifica (Observer)
    IObservadorEstadia <|.. NotificadorWhatsApp
```