//Primera Cura: ISP 
//Se dividen los roles para no depender de una sola como estaba al comienzo
namespace Parcial1.Ferreteria
{
    public interface IRegistradorPedidos
    {
        void RegistrarPedido(string material, int cantidad);
    }

    public interface IAutorizadorVentas
    {
        void AutorizarVentaAlPorMayor(string material);
    }

    public interface IGestorPrecios
    {
        void AjustarPrecio(string material, decimal nuevoPrecio);
    }

    public interface IReportes
    {
        void VerReporteDeCompras();
    }


    public class Vendedor : IRegistradorPedidos
    {
        public void RegistrarPedido(string material, int cantidad)
            => Console.WriteLine($"[VEND] Pedido: {cantidad} x {material}");
    }

    public class Encargado : IRegistradorPedidos, IAutorizadorVentas, IGestorPrecios, IReportes
    {
        public void RegistrarPedido(string material, int cantidad)
            => Console.WriteLine($"[ENC] Pedido: {cantidad} x {material}");

        public void AutorizarVentaAlPorMayor(string material)
            => Console.WriteLine($"[ENC] Venta al por mayor de {material} autorizada");

        public void AjustarPrecio(string material, decimal nuevoPrecio)
            => Console.WriteLine($"[ENC] {material} ahora cuesta {nuevoPrecio:0.00} Bs");

        public void VerReporteDeCompras()
            => Console.WriteLine("[ENC] Reporte de compras del mes");
    }
}