P1.1 Detectar
DE los principios solid tenemos 
S -> SRP -> Principio de responsabilidad unica
O -> OCP -> abierto/cerrado (open/closed)
L -> LSP -> Principio de Sustitución de Liskov
I -> ISP -> Principio de segregacion de Interfaz
D -> DIP -> Principio de inversión de dependencias

PRINCIPIO: SRP 
DONDE VIVE (CLASE Y METODO): Clase: GestorDePedidos Metodo: ProcesarPedido
¿POR QUE ES VIOLACION?: Esta clase calcula el tocal / descuento, guarda los datos en la base de datos tambien imprime el comprobante - tiene multiples responsabilidades

PRINCIPIO: OCP
DONDE VIVE (CLASE Y METODO): Clase: GestorDePedido Metodo: ProcesarPedido 
¿POR QUE ES VIOLACION?:calcula el descuento usando switch para agregar un nuevo cliente

PRINCIPIO: ISP
DONDE VIVE (CLASE Y METODO): clase: IEmpleadoDeFerreteria Metodo: Vendedor
¿POR QUE ES VIOLACION?: Obliga al metodo Vendedor hacer tareas qeu no son de su propiedad por ejemplo : ajustarPrecio, VerReporteDeCompras

PRINCIPIO: DIP
DONDE VIVE (CLASE Y METODO): clase: GestorDePedidos Metodo: ProcesarPedido
¿POR QUE ES VIOLACION?: insercion directa a la base de datos