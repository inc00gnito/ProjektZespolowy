using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAPI.Models
{
    public class Session
    {
        public int Id { get; set; }
        public string Token {get; set; }
        public User User {get; set;}
        public DateTime Expiration {get; set;}

    }
}
