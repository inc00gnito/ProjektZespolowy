using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAPI.Models
{
    public class GetUser
    {
        public int Id { get; set; }
        public string Username { get; set; }
        //public byte[] Salt { get; set; }
        //public string HashedPassword { get; set; }
        public string Email { get; set; }


        //public List<Track> Tracks { get; set; }
        //public List<Order> Orders { get; set; }
    }
}
