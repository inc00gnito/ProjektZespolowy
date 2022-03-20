using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuthorsDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StageName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthorsDbSet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NewslettersDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewslettersDbSet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UsersDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersDbSet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NewsletterEmailsDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NewsletterId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsletterEmailsDbSet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NewsletterEmailsDbSet_NewslettersDbSet_NewsletterId",
                        column: x => x.NewsletterId,
                        principalTable: "NewslettersDbSet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OrdersDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<float>(type: "real", nullable: false),
                    DateOfPurchase = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdersDbSet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrdersDbSet_UsersDbSet_UserId",
                        column: x => x.UserId,
                        principalTable: "UsersDbSet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TracksDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Time = table.Column<float>(type: "real", nullable: false),
                    Cost = table.Column<double>(type: "float", nullable: false),
                    DiscountedCost = table.Column<double>(type: "float", nullable: false),
                    AudioFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DemoFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImgFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDiscounted = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TracksDbSet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TracksDbSet_UsersDbSet_UserId",
                        column: x => x.UserId,
                        principalTable: "UsersDbSet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_NewsletterEmailsDbSet_NewsletterId",
                table: "NewsletterEmailsDbSet",
                column: "NewsletterId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdersDbSet_UserId",
                table: "OrdersDbSet",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_TracksDbSet_UserId",
                table: "TracksDbSet",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuthorsDbSet");

            migrationBuilder.DropTable(
                name: "NewsletterEmailsDbSet");

            migrationBuilder.DropTable(
                name: "OrdersDbSet");

            migrationBuilder.DropTable(
                name: "TracksDbSet");

            migrationBuilder.DropTable(
                name: "NewslettersDbSet");

            migrationBuilder.DropTable(
                name: "UsersDbSet");
        }
    }
}
