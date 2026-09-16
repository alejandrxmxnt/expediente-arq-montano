/*
* Solucion: ADRIAN ALEJANDRO MONTAÑO SOLIZ
* Segunda Situacion - Strategy - Biblioteca Municipal
*/
using System;
namespace BibliotecaMunicipal
{
    public class Socio
    {
        public string Nombre 
        { 
            get; 
        }
        public Socio(string nombre)
        {
            Nombre = nombre;
        }
    }
    //EL CONTRATO: cada regla calcula la multa según los días de atraso
    public interface IReglaDeMulta
    {
        decimal Calcular(int diasDeAtraso);
    }

    //socio niño
    public class ReglaMultaInfantil : IReglaDeMulta
    {
        public decimal Calcular(int diasDeAtraso)
        {
            // No genera multa en Bs, pero el bloqueo de nuevos
            // prestamos se resuelve en otra capa (no en el calculo).
            return 0m;
        }
    }
    //socio adulto
    public class ReglaMultaAdulto : IReglaDeMulta
    {
        private const decimal TarifaPorDia = 2m;

        public decimal Calcular(int diasDeAtraso)
        {
            return diasDeAtraso * TarifaPorDia;
        }
    }
//tercera edad
    public class ReglaMultaTerceraEdad : IReglaDeMulta
    {
        private const decimal TarifaPorDia = 1m;
        private const decimal Tope = 20m;

        public decimal Calcular(int diasDeAtraso)
        {
            decimal monto = diasDeAtraso * TarifaPorDia;
            return Math.Min(monto, Tope);
        }
    }

    public class CalculadoraDeMulta
    {
        private readonly IReglaDeMulta _regla;

        public CalculadoraDeMulta(IReglaDeMulta regla)
        {
            _regla = regla;
        }

        public decimal Calcular(int diasDeAtraso)
        {
            return _regla.Calcular(diasDeAtraso);
        }
    }

    public class ProgramaBiblioteca
    {
        public static void Main()
        {
            var socioAdulto = new Socio("Carlos Rojas");
            var calculadoraAdulto = new CalculadoraDeMulta(new ReglaMultaAdulto());
            decimal multaCarlos = calculadoraAdulto.Calcular(5); // 5 dias de atraso
            Console.WriteLine($"Multa de {socioAdulto.Nombre}: {multaCarlos} Bs");

            var socioTerceraEdad = new Socio("Elena Vargas");
            var calculadoraTerceraEdad = new CalculadoraDeMulta(new ReglaMultaTerceraEdad());
            decimal multaElena = calculadoraTerceraEdad.Calcular(30); // supera el tope
            Console.WriteLine($"Multa de {socioTerceraEdad.Nombre}: {multaElena} Bs");

            var socioInfantil = new Socio("Diego Perez");
            var calculadoraInfantil = new CalculadoraDeMulta(new ReglaMultaInfantil());
            decimal multaDiego = calculadoraInfantil.Calcular(10);
            Console.WriteLine($"Multa de {socioInfantil.Nombre}: {multaDiego} Bs (bloqueo aparte)");

            // Si aparece un nuevo tipo de socio, se puede crear otra regla
            // sin modificar CalculadoraDeMulta.
        }
    }
}