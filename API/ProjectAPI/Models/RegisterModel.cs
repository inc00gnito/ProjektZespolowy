using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjectAPI.Models
{
    public class RegisterModel
    {
        [RegularExpression(@"^[a-zA-Z][a-zA-Z0-9]{3,29}$",
            ErrorMessage = "Username must be between 3 and 30, " +
            "first sign must be a letter, " +
            "it can contain only letter and number ")]
        public string Username { get; set; }
        public string Email { get; set; }
        [RegularExpression(@"^.{6,19}$",
            ErrorMessage = "Password must be between 6 and 20 ")]
        public string Password { get; set; }
    }
}
