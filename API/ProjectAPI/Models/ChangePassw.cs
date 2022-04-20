using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjectAPI.Models
{
    public class ChangePassw
    {
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{5,15}$",
            ErrorMessage = "Password must be between 6 and 16 " +
            "characters and contain one uppercase letter, one lowercase letter," +
            " one digit and one special character.")]
        public string Password { get; set; }
    }
}
