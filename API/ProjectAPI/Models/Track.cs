using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;
using ProjectAPI.Models.Enums;

namespace ProjectAPI.Models
{
    public class Track
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public float Time { get; set; }
        public float Cost { get; set; }
        public int UserId { get; set; }
        
        public float DiscountedByUser {get; set; } // w PLN
        public float DiscountedByShop {get; set; } // w %
        public Genre Genre { get; set; }
        public List<string> Tags { get; set; }

        public List<Author> Authors { get; set; }
        public string AudioFile { get; set; }
        public string DemoFile { get; set; }
        public string ImgFile { get; set; }
        [NotMapped]
        public IFormFile audioFormFile { get; set; }
        [NotMapped]
        public IFormFile demoFormFile { get; set; }
        [NotMapped]
        public IFormFile imageFormFile { get; set; }


        public int TimesSold { get; set; }
        public bool IsDiscounted { get; set; }
    }

}
