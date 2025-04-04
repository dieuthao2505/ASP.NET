using System.ComponentModel.DataAnnotations.Schema;

namespace VoThiDieuThao_2122110335.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [Column(TypeName = "decimal(18,2)")] // Định nghĩa kiểu dữ liệu trong SQL Server
        public decimal Price { get; set; }
        public string Image { get; set; }  // URL hình ảnh sản phẩm
        public string Description { get; set; }


    }

}
 