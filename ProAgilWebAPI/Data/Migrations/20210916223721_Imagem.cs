using Microsoft.EntityFrameworkCore.Migrations;

namespace ProAgilWebAPI.Data.Migrations
{
    public partial class Imagem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "imageUrl",
                table: "Eventos",
                newName: "Imagem");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Imagem",
                table: "Eventos",
                newName: "imageUrl");
        }
    }
}
