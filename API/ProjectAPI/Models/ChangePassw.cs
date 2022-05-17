using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjectAPI.Models
{
    public class ChangePassw
    {
        [RegularExpression(@"^.{5,19}$",
            ErrorMessage = "Password must be between 6 and 20 ")]
        public string Password { get; set; }
    }
}
