using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectAPI.Migrations
{
    public partial class zmianaModelu : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DiscountedCost",
                table: "TracksDbSet",
                newName: "DiscountedByUser");

            migrationBuilder.AddColumn<double>(
                name: "DiscountedByShop",
                table: "TracksDbSet",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "TimesSold",
                table: "TracksDbSet",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DiscountedByShop",
                table: "TracksDbSet");

            migrationBuilder.DropColumn(
                name: "TimesSold",
                table: "TracksDbSet");

            migrationBuilder.RenameColumn(
                name: "DiscountedByUser",
                table: "TracksDbSet",
                newName: "DiscountedCost");
        }
    }
}
