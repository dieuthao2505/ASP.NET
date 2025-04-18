using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace VoThiDieuThao_2122110335.Model
{
    public class Card
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; } // Mối quan hệ với bảng User
        public int ProductId { get; set; } // Mối quan hệ với bảng Product

        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalPrice { get; set; } // Tổng giá trị các sản phẩm trong thẻ

        public int Quantity { get; set; } // Số lượng sản phẩm trong thẻ

        public User User { get; set; } // Điều này thiết lập mối quan hệ giữa các bảng (User - Card)
        public Product Product { get; set; }
    }
}
