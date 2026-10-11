using StudyCards.Domain.Entities;

namespace StudyCards.Application.Interfaces;

public interface IMazoRepository 
{
    // Contrato: Devuelve una lista de todos los mazos de estudio
    Task<IEnumerable<MazoGlobal>> GetAllAsync();
    Task<MazoGlobal> AddAsync(MazoGlobal mazo);
    
    //Contrato: Devuelve un mazo por su id
    Task<MazoGlobal?> GetByIdAsync(int id);
    //Contrato: Actualiza un Mazo
    Task UpdateAsync(MazoGlobal mazo);
    //Contrato: Elimina un Mazo
    Task DeleteAsync(MazoGlobal mazo);
}