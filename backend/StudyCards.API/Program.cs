using DotNetEnv;
using Scalar.AspNetCore;
using StudyCards.Infrastructure; // Para usar AddInfrastructure()
using StudyCards.Application;

var builder = WebApplication.CreateBuilder(args);
//Leer origenes autorizados desde appsettings.json
var corsAllowedOrigins = builder.Configuration["CorsAllowedOrigins"] 
                         ?? throw new InvalidOperationException("Falta CorsAllowedOrigins en appsettings.json");

// Cargar variables de entorno desde .env local
Env.Load();

// Obtener la cadena de conexión de la variable de entorno
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__PostgresConnection") 
                       ?? throw new InvalidOperationException("Falta la cadena de conexión en el archivo .env.");

builder.Services.AddApplication();
// Llamamos al gerente de compras para inyectar todo
builder.Services.AddInfrastructure(connectionString);

//Definición de politicas de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PoliticaCorsStudyCards", policy =>
    {
        var origenes = corsAllowedOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

        policy.WithOrigins(origenes)
            .SetIsOriginAllowedToAllowWildcardSubdomains() // Habilita *.unah.edu.hn
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

// Agregar soporte para Controladores
builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddOpenApi("v1");

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    //Genera el JSON Tecnico
    app.MapOpenApi();
    //Levanta la pagina web interactiva
    app.MapScalarApiReference();
}

app.UseCors("PoliticaCorsStudyCards");
app.MapControllers(); // Habilita las rutas de la API
app.Run();