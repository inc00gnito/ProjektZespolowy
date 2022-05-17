using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjectAPI.Models
{
    public class RegisterModel
    {
        [RegularExpression(@"^[a-zA-Z][a-zA-Z0-9._']{2,29}$",
            ErrorMessage = "Invalid username ")]
        public string Username { get; set; }
        public string Email { get; set; }
        [RegularExpression(@"^.{5,19}$",
            ErrorMessage = "Password must be between 6 and 20 ")]
        public string Password { get; set; }
    }
}
