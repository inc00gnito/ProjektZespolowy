using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProjectAPI.Models.Enums;

namespace ProjectAPI.Models
{
    public class SieveModel
    {
        public string? filter{ get; set; }
        public SortBy? sort{ get; set; }
        public string? search{ get; set; }

    }
}