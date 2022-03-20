using Microsoft.EntityFrameworkCore;
using ProjectAPI.Models;

namespace ProjectAPI.Data
{
    public class DataBaseContext :DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
            
        }

        public DbSet<Track> TracksDbSet { get; set; }
        public DbSet<Author> AuthorsDbSet { get; set; }
        public DbSet<Order> OrdersDbSet { get; set; }
        public DbSet<User> UsersDbSet{ get; set; }
        public DbSet<NewsletterEmail> NewsletterEmailsDbSet { get; set; }
        public DbSet<Newsletter> NewslettersDbSet { get; set; }
    }
}
