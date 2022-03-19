using System;
using System.Collections.Generic;

namespace ProjectAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        private List<Track> Tracks { get; set; }
        public float Price { get; set; }
        public DateTime DateOfPurchase { get; set; }
    }
}
