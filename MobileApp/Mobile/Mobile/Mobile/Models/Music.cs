using System;
using System.Collections.Generic;
using System.Text;

namespace Mobile.Models
{
    public class Music
    {
        public string Title { get; set; }
        public string Artist { get; set; }
        public string Url { get; set; }
        public string CoverImage { get; set; } 
        public bool IsRecent { get; set; }
    }
}
