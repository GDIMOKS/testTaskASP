using Microsoft.EntityFrameworkCore;
using Models;

namespace DataAccess;

public class OrdersDbContext : DbContext
{
    public OrdersDbContext()
    {
        
    }

    public OrdersDbContext(DbContextOptions<OrdersDbContext> options) : base(options)
    {
        
    }

    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<OrderItem> OrderItems { get; set; } = null!;
    public DbSet<Provider> Providers { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer("Server=tcp:localhost,1433;Database=aspTestTask;TrustServerCertificate=True;User Id=mssqlserver;Password=mssqlserver;");
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Provider>().ToTable("Provider");

        modelBuilder.Entity<Order>().ToTable("Order");
        //теперь проверяется на стороне фронта, EF не дает обновлять альтернативные ключи
        /* 
        modelBuilder.Entity<Order>().HasAlternateKey(o => new {o.Number, o.ProviderId});
        */

        modelBuilder.Entity<OrderItem>().ToTable("OrderItem");


    }
    
}