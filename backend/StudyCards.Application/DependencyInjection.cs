using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace StudyCards.Application;

public static class DependencyInjection 
{
    public static IServiceCollection AddApplication(this IServiceCollection services) 
    {
        // Escanea automáticamente la capa buscando validadores
        services.AddValidatorsFromAssembly(typeof(DependencyInjection).Assembly);
        return services;
    }
}