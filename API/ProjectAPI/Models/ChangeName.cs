using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjectAPI.Models
{
    public class ChangeName
    {
        [RegularExpression(@"^[a-zA-Z][a-zA-Z0-9._']{2,29}$",
            ErrorMessage = "Invalid username ")]
        public string UserName { get; set; }
    }
}
