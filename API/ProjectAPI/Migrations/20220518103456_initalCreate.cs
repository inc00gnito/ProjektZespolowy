using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace ProjectAPI.Migrations
{
    public partial class initalCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NewsletterEmailsDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Email = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NewsletterEmailsDbSet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TagsDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Description = table.Column<string>(type: "text", nullable: true),
                    TrackId = table.Column<int>(type: "integer", nullable: true),
                    OrderedTrackId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TagsDbSet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UsersDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: true),
                    Salt = table.Column<byte[]>(type: "bytea", nullable: true),
                    HashedPassword = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersDbSet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "OrdersDbSet",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Price = table.Column<float>(type: "real", nullable: false),
                    DateOfPurchase = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false)
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
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Token = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<int>(type: "integer", nullable: true),
                    Expiration = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
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
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Time = table.Column<float>(type: "real", nullable: false),
                    Cost = table.Column<float>(type: "real", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    DiscountedByUser = table.Column<float>(type: "real", nullable: false),
                    DiscountedByShop = table.Column<float>(type: "real", nullable: false),
                    Genre = table.Column<int>(type: "integer", nullable: false),
                    AudioFile = table.Column<string>(type: "text", nullable: true),
                    DemoFile = table.Column<string>(type: "text", nullable: true),
                    ImgFile = table.Column<string>(type: "text", nullable: true),
                    TimesSold = table.Column<int>(type: "integer", nullable: false),
                    IsDiscounted = table.Column<bool>(type: "boolean", nullable: false)
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
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Time = table.Column<float>(type: "real", nullable: false),
                    Cost = table.Column<float>(type: "real", nullable: false),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    DiscountedByUser = table.Column<float>(type: "real", nullable: false),
                    DiscountedByShop = table.Column<float>(type: "real", nullable: false),
                    Genre = table.Column<int>(type: "integer", nullable: false),
                    AudioFile = table.Column<string>(type: "text", nullable: true),
                    DemoFile = table.Column<string>(type: "text", nullable: true),
                    ImgFile = table.Column<string>(type: "text", nullable: true),
                    TimesSold = table.Column<int>(type: "integer", nullable: false),
                    IsDiscounted = table.Column<bool>(type: "boolean", nullable: false),
                    OrderId = table.Column<int>(type: "integer", nullable: true)
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
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StageName = table.Column<string>(type: "text", nullable: true),
                    TrackId = table.Column<int>(type: "integer", nullable: true),
                    OrderedTrackId = table.Column<int>(type: "integer", nullable: true)
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
