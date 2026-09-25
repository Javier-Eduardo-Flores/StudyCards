using DotNetEnv;
using StudyCards.Infrastructure; // Para usar AddInfrastructure()

var builder = WebApplication.CreateBuilder(args);

// Cargar variables de entorno desde .env local
Env.Load();

// Obtener la cadena de conexión de la variable de entorno
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__PostgresConnection") 
                       ?? throw new InvalidOperationException("Falta la cadena de conexión en el archivo .env.");

// Llamamos al gerente de compras para inyectar todo
builder.Services.AddInfrastructure(connectionString);

// Agregar soporte para Controladores
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers(); // Habilita las rutas de la API
app.Run();