using Microsoft.EntityFrameworkCore;
using ProjectAPI.Models;
using ProjectAPI.Models.Enums;

namespace ProjectAPI.Data
{
    public class DataBaseContext :DbContext
    {
        public DbContextOptions<DataBaseContext> Options { get; }

        public DataBaseContext()
        {
            
        }

        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
            Options = options;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Track>().Ignore(t => t.Tags);
        }

        public DbSet<Track> TracksDbSet { get; set; }
        public DbSet<Author> AuthorsDbSet { get; set; }
        public DbSet<Order> OrdersDbSet { get; set; }
        public DbSet<User> UsersDbSet{ get; set; }
        public DbSet<NewsletterEmail> NewsletterEmailsDbSet { get; set; }
        public DbSet<Session> SessionDbSet { get; set; }

        public DbSet<Tag> TagsDbSet { get; set; }
        public DbSet<OrderedTrack> OrderedTracksDbSet { get; set; }

    }
}
