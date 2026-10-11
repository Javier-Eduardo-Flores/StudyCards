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

    // 2. Método del POST 
    public async Task<MazoGlobal> AddAsync(MazoGlobal mazo) 
    {
        await _context.MazosGlobales.AddAsync(mazo); // Prepara el INSERT
        await _context.SaveChangesAsync(); // Ejecuta el COMMIT en la base de datos
        
        return mazo; // Retorna el mazo con su nuevo ID
    }
    //3. Metodo GET Que retorna por id
    public async Task<MazoGlobal?> GetByIdAsync(int id)
    {
        return await _context.MazosGlobales.FindAsync(id);
    }
    
    //4. Metodo PUT para actualizar un mazo
    public async Task UpdateAsync(MazoGlobal mazo)
    {
        _context.MazosGlobales.Update(mazo);
        await _context.SaveChangesAsync(); //Se confirma el UPDATE en SQL.
    }
    
    //5. Metodo DELET para eliminar un mazo
    public async Task DeleteAsync(MazoGlobal mazo)
    {
        _context.MazosGlobales.Remove(mazo);
        await _context.SaveChangesAsync(); //Se confirma el DELETE en SQL.
    }
}