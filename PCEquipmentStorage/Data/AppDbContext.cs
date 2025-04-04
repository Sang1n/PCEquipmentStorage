using Microsoft.EntityFrameworkCore;
using PCEquipmentStorage.Models;

public class AppDbContext : DbContext
{
    public DbSet<Equipment> Equipment => Set<Equipment>();
    public DbSet<EquipmentType> EquipmentTypes => Set<EquipmentType>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Equipment>()
            .HasIndex(e => e.InventoryNumber)
            .IsUnique();

        modelBuilder.Entity<EquipmentType>().HasData(
            new EquipmentType { Id = 1, Name = "Ноутбук" },
            new EquipmentType { Id = 2, Name = "Сервер" },
            new EquipmentType { Id = 3, Name = "Монитор" }
        );
    }
}
