using System.Collections.Generic;

namespace ProjectAPI.Models
{
    public class Newsletter
    {
        public int Id { get; set; }
        public List<NewsletterEmail> Emails { get; set; }
    }
}
