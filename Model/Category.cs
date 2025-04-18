using System.ComponentModel.DataAnnotations;

namespace VoThiDieuThao_2122110335.Model
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();


    }

}
