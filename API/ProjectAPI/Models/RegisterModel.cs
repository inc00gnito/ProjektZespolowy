using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjectAPI.Models
{
    public class RegisterModel
    {
        [RegularExpression(@"^[a-zA-Z][a-zA-Z0-9]{2,11}$",
            ErrorMessage = "Username must be between 3 and 12, " +
            "first letter must be a number, " +
            "it can contain only letter and number ")]
        public string Username { get; set; }
        public string Email { get; set; }
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{5,15}$",
            ErrorMessage = "Password must be between 6 and 16 " +
            "characters and contain one uppercase letter, one lowercase letter," +
            " one digit and one special character.")]
        public string Password { get; set; }
    }
}
