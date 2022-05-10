using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ProjectAPI.Migrations
{
    public partial class initialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NewsletterEmailsDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsletterEmailsDbSet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TagsDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrackId = table.Column<int>(type: "int", nullable: true),
                    OrderedTrackId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagsDbSet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UsersDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salt = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    HashedPassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersDbSet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrdersDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<float>(type: "real", nullable: false),
                    DateOfPurchase = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdersDbSet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrdersDbSet_UsersDbSet_UserId",
                        column: x => x.UserId,
                        principalTable: "UsersDbSet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SessionDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Expiration = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SessionDbSet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SessionDbSet_UsersDbSet_UserId",
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
                    Cost = table.Column<float>(type: "real", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DiscountedByUser = table.Column<float>(type: "real", nullable: false),
                    DiscountedByShop = table.Column<float>(type: "real", nullable: false),
                    Genre = table.Column<int>(type: "int", nullable: false),
                    AudioFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DemoFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImgFile = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TimesSold = table.Column<int>(type: "int", nullable: false),
                    IsDiscounted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TracksDbSet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TracksDbSet_UsersDbSet_UserId",
                        column: x => x.UserId,
                        principalTable: "UsersDbSet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateTable(
                name: "AuthorsDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StageName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrackId = table.Column<int>(type: "int", nullable: true),
                    OrderedTrackId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthorsDbSet", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AuthorsDbSet_OrderedTracksDbSet_OrderedTrackId",
                        column: x => x.OrderedTrackId,
                        principalTable: "OrderedTracksDbSet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AuthorsDbSet_TracksDbSet_TrackId",
                        column: x => x.TrackId,
                        principalTable: "TracksDbSet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AuthorsDbSet_OrderedTrackId",
                table: "AuthorsDbSet",
                column: "OrderedTrackId");

            migrationBuilder.CreateIndex(
                name: "IX_AuthorsDbSet_TrackId",
                table: "AuthorsDbSet",
                column: "TrackId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedTracksDbSet_OrderId",
                table: "OrderedTracksDbSet",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdersDbSet_UserId",
                table: "OrdersDbSet",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SessionDbSet_UserId",
                table: "SessionDbSet",
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
                name: "SessionDbSet");

            migrationBuilder.DropTable(
                name: "TagsDbSet");

            migrationBuilder.DropTable(
                name: "OrderedTracksDbSet");

            migrationBuilder.DropTable(
                name: "TracksDbSet");

            migrationBuilder.DropTable(
                name: "OrdersDbSet");

            migrationBuilder.DropTable(
                name: "UsersDbSet");
        }
    }
}
