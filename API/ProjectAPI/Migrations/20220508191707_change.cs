using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectAPI.Migrations
{
    public partial class change : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuthorsDbSet_TracksDbSet_TrackId",
                table: "AuthorsDbSet");

            migrationBuilder.AlterColumn<int>(
                name: "TrackId",
                table: "AuthorsDbSet",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "OrderedTrackId",
                table: "AuthorsDbSet",
                type: "int",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AuthorsDbSet_TracksDbSet_TrackId",
                table: "AuthorsDbSet",
                column: "TrackId",
                principalTable: "TracksDbSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuthorsDbSet_TracksDbSet_TrackId",
                table: "AuthorsDbSet");

            migrationBuilder.DropColumn(
                name: "OrderedTrackId",
                table: "AuthorsDbSet");

            migrationBuilder.AlterColumn<int>(
                name: "TrackId",
                table: "AuthorsDbSet",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AuthorsDbSet_TracksDbSet_TrackId",
                table: "AuthorsDbSet",
                column: "TrackId",
                principalTable: "TracksDbSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
