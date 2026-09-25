using Microsoft.EntityFrameworkCore;
using StudyCards.Application.Interfaces;
using StudyCards.Domain.Entities;
using StudyCards.Infrastructure.Data;

namespace StudyCards.Infrastructure.Repositories;

public class MazoRepository : IMazoRepository 
{
    private readonly StudyCardsDbContext _context;
    
    public MazoRepository(StudyCardsDbContext context) 
    {
        _context = context;
    }

    // 1. Método del GET
    public async Task<IEnumerable<MazoGlobal>> GetAllAsync() 
    {
        return await _context.MazosGlobales.ToListAsync(); 
    }

    // 2. Método del POST (El que está causando el error por faltar)
    public async Task<MazoGlobal> AddAsync(MazoGlobal mazo) 
    {
        await _context.MazosGlobales.AddAsync(mazo); // Prepara el INSERT
        await _context.SaveChangesAsync(); // Ejecuta el COMMIT en la base de datos
        
        return mazo; // Retorna el mazo con su nuevo ID
    }
}