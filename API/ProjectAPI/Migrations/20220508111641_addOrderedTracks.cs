using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectAPI.Migrations
{
    public partial class addOrderedTracks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TracksDbSet_OrdersDbSet_OrderId",
                table: "TracksDbSet");

            migrationBuilder.DropIndex(
                name: "IX_TracksDbSet_OrderId",
                table: "TracksDbSet");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "TracksDbSet");

            migrationBuilder.AlterColumn<int>(
                name: "TrackId",
                table: "TagsDbSet",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "OrderedTrackId",
                table: "TagsDbSet",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "OrderedTracksId",
                table: "AuthorsDbSet",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "OrderedTracksDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Time = table.Column<float>(type: "real", nullable: false),
                    Cost = table.Column<float>(type: "real", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DiscountedByUser = table.Column<float>(type: "real", nullable: false),
                    DiscountedByShop = table.Column<float>(type: "real", nullable: false),
                    Genre = table.Column<int>(type: "int", nullable: false),
                    AudioFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DemoFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImgFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimesSold = table.Column<int>(type: "int", nullable: false),
                    IsDiscounted = table.Column<bool>(type: "bit", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderedTracksDbSet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderedTracksDbSet_OrdersDbSet_OrderId",
                        column: x => x.OrderId,
                        principalTable: "OrdersDbSet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuthorsDbSet_OrderedTracksId",
                table: "AuthorsDbSet",
                column: "OrderedTracksId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedTracksDbSet_OrderId",
                table: "OrderedTracksDbSet",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_AuthorsDbSet_OrderedTracksDbSet_OrderedTracksId",
                table: "AuthorsDbSet",
                column: "OrderedTracksId",
                principalTable: "OrderedTracksDbSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuthorsDbSet_OrderedTracksDbSet_OrderedTracksId",
                table: "AuthorsDbSet");

            migrationBuilder.DropTable(
                name: "OrderedTracksDbSet");

            migrationBuilder.DropIndex(
                name: "IX_AuthorsDbSet_OrderedTracksId",
                table: "AuthorsDbSet");

            migrationBuilder.DropColumn(
                name: "OrderedTrackId",
                table: "TagsDbSet");

            migrationBuilder.DropColumn(
                name: "OrderedTracksId",
                table: "AuthorsDbSet");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "TracksDbSet",
                type: "int",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TrackId",
                table: "TagsDbSet",
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
                name: "FK_TracksDbSet_OrdersDbSet_OrderId",
                table: "TracksDbSet",
                column: "OrderId",
                principalTable: "OrdersDbSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
