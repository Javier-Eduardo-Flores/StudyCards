using Microsoft.EntityFrameworkCore;
using StudyCards.Domain.Entities;

namespace StudyCards.Infrastructure.Data;

public class StudyCardsDbContext : DbContext
{
    public StudyCardsDbContext(DbContextOptions<StudyCardsDbContext> options) : base(options) { }
    
    public DbSet<MazoGlobal> MazosGlobales { get; set; }
}