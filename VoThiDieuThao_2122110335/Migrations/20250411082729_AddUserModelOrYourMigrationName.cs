using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VoThiDieuThao_2122110335.Migrations
{
    public partial class AddUserModelOrYourMigrationName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Tạo bảng Users với cột Id, Username, Password, Email và Role
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true) // Thêm cột Role
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Xóa bảng Users nếu migration bị rollback
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
