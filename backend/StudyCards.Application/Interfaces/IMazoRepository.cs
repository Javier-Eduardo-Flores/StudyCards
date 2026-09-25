using StudyCards.Domain.Entities;

namespace StudyCards.Application.Interfaces;

public interface IMazoRepository 
{
    // Contrato: Devuelve una lista de todos los mazos de estudio
    Task<IEnumerable<MazoGlobal>> GetAllAsync();
    Task<MazoGlobal> AddAsync(MazoGlobal mazo);
}