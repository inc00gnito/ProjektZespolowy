using System.Collections.Generic;

namespace ProjectAPI.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] Salt {get; set;}
        public string HashedPassword { get; set; }
        public string Email { get; set; }
        

        public List<Track> Tracks { get; set; }
        public List<Order> Orders { get; set; }

    }
}
