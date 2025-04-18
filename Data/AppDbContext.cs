using Microsoft.EntityFrameworkCore;
using VoThiDieuThao_2122110335.Model;

namespace VoThiDieuThao_2122110335.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .Property(p => p.Price)
                .HasPrecision(18, 2); // 👈 Fix lỗi kiểu dữ liệu
        }
    }
}
