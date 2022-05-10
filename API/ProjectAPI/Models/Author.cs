using System;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ProjectAPI.Models
{
    public class Author
    {
        public int Id { get; set; }        
        public string StageName { get; set; }
        public int? TrackId { get; set; }
        public int? OrderedTrackId { get; set; }

    }

    
}
