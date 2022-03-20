using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using ProjectAPI.Models.Enums;

namespace ProjectAPI.Models
{
    public class Track
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public float Time { get; set; }
        public double Cost { get; set; }
        public double DiscountedCost { get; set; }
        
        public Genre Genre { get; set; }
        public List<string> Tags { get; set; }
        public string AudioFile { get; set; }
        public string DemoFile { get; set; }
        public string ImgFile { get; set; }

        

        private bool IsBestSeller { get; set; }
        public bool IsDiscounted { get; set; }
    }
}
