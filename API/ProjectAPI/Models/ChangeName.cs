using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjectAPI.Models
{
    public class ChangeName
    {
        [RegularExpression(@"^[a-zA-Z][a-zA-Z0-9]{3,29}$",
            ErrorMessage = "Username must be between 3 and 30, " +
            "first sign must be a letter, " +
            "it can contain only letter and number ")]
        public string UserName { get; set; }
    }
}
