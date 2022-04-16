using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectAPI.Migrations
{
    public partial class UpdateAuthorsDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TrackId",
                table: "AuthorsDbSet",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AuthorsDbSet_TrackId",
                table: "AuthorsDbSet",
                column: "TrackId");

            migrationBuilder.AddForeignKey(
                name: "FK_AuthorsDbSet_TracksDbSet_TrackId",
                table: "AuthorsDbSet",
                column: "TrackId",
                principalTable: "TracksDbSet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AuthorsDbSet_TracksDbSet_TrackId",
                table: "AuthorsDbSet");

            migrationBuilder.DropIndex(
                name: "IX_AuthorsDbSet_TrackId",
                table: "AuthorsDbSet");

            migrationBuilder.DropColumn(
                name: "TrackId",
                table: "AuthorsDbSet");
        }
    }
}
