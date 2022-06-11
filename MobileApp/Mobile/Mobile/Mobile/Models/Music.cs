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
        public string CoverImage { get; set; } = "https://images.complex.com/complex/image/upload/c_fill,dpr_auto,f_auto,fl_lossy,g_face,q_auto,w_1280/bpi6fyo9ky60ranoscof.jpg";
        public bool IsRecent { get; set; }
    }
}
