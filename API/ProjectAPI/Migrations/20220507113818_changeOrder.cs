using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectAPI.Migrations
{
    public partial class changeOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdersDbSet_UsersDbSet_UserId",
                table: "OrdersDbSet");

            migrationBuilder.AlterColumn<float>(
                name: "DiscountedByUser",
                table: "TracksDbSet",
                type: "real",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<float>(
                name: "DiscountedByShop",
                table: "TracksDbSet",
                type: "real",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<float>(
                name: "Cost",
                table: "TracksDbSet",
                type: "real",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "TracksDbSet",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "OrdersDbSet",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TracksDbSet_OrderId",
                table: "TracksDbSet",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_OrdersDbSet_UsersDbSet_UserId",
                table: "OrdersDbSet",
                column: "UserId",
                principalTable: "UsersDbSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TracksDbSet_OrdersDbSet_OrderId",
                table: "TracksDbSet",
                column: "OrderId",
                principalTable: "OrdersDbSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrdersDbSet_UsersDbSet_UserId",
                table: "OrdersDbSet");

            migrationBuilder.DropForeignKey(
                name: "FK_TracksDbSet_OrdersDbSet_OrderId",
                table: "TracksDbSet");

            migrationBuilder.DropIndex(
                name: "IX_TracksDbSet_OrderId",
                table: "TracksDbSet");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "TracksDbSet");

            migrationBuilder.AlterColumn<double>(
                name: "DiscountedByUser",
                table: "TracksDbSet",
                type: "float",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<double>(
                name: "DiscountedByShop",
                table: "TracksDbSet",
                type: "float",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<double>(
                name: "Cost",
                table: "TracksDbSet",
                type: "float",
                nullable: false,
                oldClrType: typeof(float),
                oldType: "real");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "OrdersDbSet",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_OrdersDbSet_UsersDbSet_UserId",
                table: "OrdersDbSet",
                column: "UserId",
                principalTable: "UsersDbSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
