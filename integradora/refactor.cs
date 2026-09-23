/* 
* refactor.cs — Cura la violación de OCP con el patrón Strategy
*/
namespace Integradora.Parqueo;
//una interfaz para la regla de tarifa, una clase por tipo de vehículo.
public enum TipoVehiculo { Auto, Moto, Residente }

public interface ICalculadoraTarifa
{
    TipoVehiculo Tipo { get; }
    decimal CalcularTotal(int horas);
}

public class CalculadoraTarifaAuto : ICalculadoraTarifa
{
    public TipoVehiculo Tipo => TipoVehiculo.Auto;
    public decimal CalcularTotal(int horas) => 5m * horas;
}

public class CalculadoraTarifaMoto : ICalculadoraTarifa
{
    public TipoVehiculo Tipo => TipoVehiculo.Moto;
    public decimal CalcularTotal(int horas) => 3m * horas;
}

public class CalculadoraTarifaResidente : ICalculadoraTarifa
{
    public TipoVehiculo Tipo => TipoVehiculo.Residente;
    public decimal CalcularTotal(int horas) => 1m * horas;
}

public class GestorDeTarifas
{
    private readonly Dictionary<TipoVehiculo, ICalculadoraTarifa> _calculadoras;

    public GestorDeTarifas(IEnumerable<ICalculadoraTarifa> calculadoras)
        => _calculadoras = calculadoras.ToDictionary(c => c.Tipo);

    public decimal CalcularTotal(TipoVehiculo tipo, int horas)
        => _calculadoras[tipo].CalcularTotal(horas);
}

public class GestorDeEstadias
{
    private readonly GestorDeTarifas _gestorDeTarifas;

    public GestorDeEstadias(GestorDeTarifas gestorDeTarifas) => _gestorDeTarifas = gestorDeTarifas;

    public decimal RegistrarSalida(string placa, TipoVehiculo tipoVehiculo, int horas)
    {
        decimal total = _gestorDeTarifas.CalcularTotal(tipoVehiculo, horas);
        Console.WriteLine($"Placa {placa}: {horas} h como {tipoVehiculo} → TOTAL {total:0.00} Bs");
        return total;
    }
}
 
//Agregar un tipo nuevo = agregar una clase, sin tocar GestorDeEstadias.
