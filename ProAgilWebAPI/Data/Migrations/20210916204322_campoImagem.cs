using Microsoft.EntityFrameworkCore.Migrations;

namespace ProAgilWebAPI.Data.Migrations
{
    public partial class campoImagem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "imageUrl",
                table: "Eventos",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imageUrl",
                table: "Eventos");
        }
    }
}
