using System;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectAPI.Data;
using ProjectAPI.Models;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TracksController : ControllerBase
    {
        public readonly DataBaseContext _db;


        public TracksController(DataBaseContext db)
        {
            _db = db;
        }

        [HttpGet]
        public ActionResult< List<Track> > GetTracks()
        {
           var Tracks =  _db.TracksDbSet.ToList();
           return Ok(Tracks);

        }


        [HttpGet("bestSellers")]
        public ActionResult< List<Track> > GetBestSellers()
        {
            var Tracks = _db.TracksDbSet.ToList();
            Tracks.Sort(delegate(Track x, Track y) {
                return y.TimesSold.CompareTo(x.TimesSold);
            });
            
            int numberOfTrack = Math.Min(6,Tracks.Count());
            var BestSellers = Tracks.GetRange(0, numberOfTrack);

            return Ok(BestSellers);
        }
        
        [HttpGet("discounted")]
        public ActionResult< List<Track> > GetDiscounted()
        {
            var Tracks = _db.TracksDbSet.ToList();
            var Discounted = Tracks.Where(x => x.IsDiscounted == true);

            return Ok(Discounted);
        }
        
        

    }

}
