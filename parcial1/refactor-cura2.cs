//SEGUNDA CURA DIP
//Se define abstraccion
public interface IBaseDeDatos
{
    void GuardarPedido(string cliente, string material, int cantidad, decimal total);
}

public interface IServicioNotificacion
{
    void Enviar(string mensaje);
}

public class BaseDeDatosMySql : IBaseDeDatos
{
    public void GuardarPedido(string cliente, string material, int cantidad, decimal total)
        => Console.WriteLine($"[MYSQL] INSERT INTO pedidos VALUES ('{cliente}', '{material}', {cantidad}, {total})");
}

public class CorreoSmtp : IServicioNotificacion
{
    public void Enviar(string mensaje)
        => Console.WriteLine($"[SMTP] {mensaje}");
}

public class GestorDePedidos
{
    private IBaseDeDatos baseDeDatos;
    private IServicioNotificacion notificacion;

    public GestorDePedidos(IBaseDeDatos baseDeDatosParam, IServicioNotificacion notificacionParam)
    {
        baseDeDatos = baseDeDatosParam;
        notificacion = notificacionParam;
    }

    public void ProcesarPedido(string cliente, string tipoCliente, string material, int cantidad, decimal precioUnitario)
    {
        decimal total = cantidad * precioUnitario;

        decimal descuento = tipoCliente switch
        {
            "contratista" => total * 0.15m,
            "constructora" => total * 0.25m,
            _ => 0m
        };
        decimal totalFinal = total - descuento;

        baseDeDatos.GuardarPedido(cliente, material, cantidad, totalFinal);

        Console.WriteLine("----- COMPROBANTE -----");
        Console.WriteLine($"{cantidad} x {material}");
        Console.WriteLine($"Cliente: {cliente} ({tipoCliente})");
        Console.WriteLine($"TOTAL: {totalFinal:0.00} Bs");

        notificacion.Enviar($"Su pedido de {material} fue registrado, {cliente}");
    }
}