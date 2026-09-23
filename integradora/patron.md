# Parte 3 — El patrón

**Requerimiento:** Cuando un vehículo lleva más de 24 horas, el dueño debe recibir un aviso.

**Patrón aplicado: Observer.** `Estadia` es el sujeto; no sabe a quién ni cómo se avisa, solo notifica a su lista de observadores cuando se pasa de 24 h.

```csharp
public interface IObservadorEstadia
{
    void EstadiaVencida(Estadia estadia);
}

public class NotificadorWhatsApp : IObservadorEstadia
{
    public void EstadiaVencida(Estadia estadia)
        => Console.WriteLine($"[WHATSAPP] Aviso: placa {estadia.Placa} superó 24 h.");
}

public class Estadia
{
    public string Placa { get; }
    public DateTime HoraEntrada { get; }
    private readonly List<IObservadorEstadia> _observadores = new();

    public Estadia(string placa, DateTime horaEntrada)
    {
        Placa = placa;
        HoraEntrada = horaEntrada;
    }

    public void Suscribir(IObservadorEstadia observador) => _observadores.Add(observador);

    public void VerificarVencimiento(DateTime ahora)
    {
        if ((ahora - HoraEntrada).TotalHours > 24)
            foreach (var o in _observadores) o.EstadiaVencida(this);
    }
}
```

**¿ Por qué Observer ?** el requerimiento describe un evento (cruzar 24 h) que debe
disparar una reacción externa; Observer separa quién detecta el evento (`Estadia`) de
quién reacciona (los observadores).

**Sin él ?** `Estadia` llamaría directo a `new NotificadorWhatsApp()`, quedaría
acoplada a un canal concreto y habría que modificar la clase cada vez que se agregue
otro canal de aviso (correo, log del administrador, etc.)