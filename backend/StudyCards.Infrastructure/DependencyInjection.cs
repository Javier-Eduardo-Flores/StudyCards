using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using StudyCards.Application.Interfaces;
using StudyCards.Infrastructure.Data;
using StudyCards.Infrastructure.Repositories;

namespace StudyCards.Infrastructure;

public static class DependencyInjection 
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString) 
    {
        // 1. Configuramos PostgreSQL
        services.AddDbContext<StudyCardsDbContext>(options =>
            options.UseNpgsql(connectionString));

        // 2. LA INYECCIÓN CLAVE: 
        // "Cuando alguien pida un IMazoRepository, entrégale un MazoRepository"
        services.AddScoped<IMazoRepository, MazoRepository>();

        return services;
    }
}