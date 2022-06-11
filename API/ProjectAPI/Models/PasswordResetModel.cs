using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAPI.Models
{
    public class PasswordResetModel
    {
        public string ResetCode { get; set; }
        public string NewPassword { get; set; }
    }
}
