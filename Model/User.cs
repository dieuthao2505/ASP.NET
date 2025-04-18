using System.ComponentModel.DataAnnotations;

namespace VoThiDieuThao_2122110335.Model
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string Email { get; set; }
        public string Role { get; set; }


    }
}
