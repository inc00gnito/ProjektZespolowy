using System;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectAPI.Data;
using ProjectAPI.Models;
using ProjectAPI.Models.Enums;
using System.Collections.Generic;
using System.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

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
            var Discounted = _db.TracksDbSet.ToList().Where(x => x.IsDiscounted == true);;
            return Ok(Discounted);
        }

        [HttpGet("filterbygenerer")] 

        public ActionResult< List<Track> >FilterByGernes( [FromQuery] params Genre[] genre )
        {
            Debug.Print(genre.Count().ToString());


            var Tracks = _db.TracksDbSet.ToList().Where(x => genre.Contains(x.Genre));            
            return Ok(Tracks);
        }

       
        
        // cost = cost - miscountedbyuser
        [HttpGet("sortbycostlowtohigh")] // nie testowane 
        public ActionResult< List<Track> >SortByCostLowToHigh()
        {
            var Tracks = _db.TracksDbSet.ToList();
            Tracks.Sort(delegate(Track x, Track y) {
                return (x.Cost - x.DiscountedByUser).CompareTo(y.Cost - y.DiscountedByUser);
            });

            return Ok(Tracks);
        } 

        [HttpGet("sortbycosthightolow")] 
        public ActionResult< List<Track> >SortByCostHighToLow()
        {
            var Tracks = _db.TracksDbSet.ToList();
            Tracks.Sort(delegate(Track x, Track y) {
                return (y.Cost - y.DiscountedByUser).CompareTo(x.Cost - x.DiscountedByUser);
            });

            return Ok(Tracks);
        }

        [HttpGet("sortbytimessold")] 
        public ActionResult< List<Track> >SortByTimesSold()
        {
            var Tracks = _db.TracksDbSet.ToList();
            Tracks.Sort(delegate(Track x, Track y) {
                return y.TimesSold.CompareTo(x.TimesSold);
            });

            return Ok(Tracks);
        }      

    
        [HttpGet("sortbydiscountedlowtohigh")] 
        public ActionResult<List<Track>> SortByDiscountedLowToHigh()
        {
            var Tracks = _db.TracksDbSet.ToList();
            Tracks.Sort(delegate(Track x, Track y) {
                return (x.DiscountedByUser )
                .CompareTo(y.DiscountedByUser);
            });

            return Ok(Tracks);
        }
        
         [HttpGet("sortbydiscountedhightolow")] 
        public ActionResult<List<Track>> SortByDiscountedHighToLow()
        {
            var Tracks = _db.TracksDbSet.ToList();
            Tracks.Sort(delegate(Track x, Track y) {
                return (y.DiscountedByUser )
                .CompareTo(x.DiscountedByUser);
            });

            return Ok(Tracks);
        }

        [HttpPut("[action]/{trackId}")]
        public ActionResult DiscountTrackByUser(int trackId, double discountedPrice)
        {
            var track = _db.TracksDbSet.FirstOrDefault(x => x.Id == trackId);
            if (track == null)
                return NotFound();
            track.DiscountedByUser = discountedPrice;

            _db.Entry(track).State = EntityState.Modified;
            _db.SaveChanges();

            //Newsletter is being sent everytime a discount price is changed
            List<NewsletterEmail> emails = _db.NewsletterEmailsDbSet.ToList();
            SendMail(emails);

            return NoContent();

        }

        #region Methods

        private void SendMail(List<NewsletterEmail> newsletterEmails)
        {
            var client = new SmtpClient();
            client.Connect("smtp.gmail.com", 587, false);
            client.Authenticate("trackslance@gmail.com", "Trackslance1!"); // later hide password somehow

            foreach (var newsletterEmail in newsletterEmails)
            {
                var msg = CreateMessage(newsletterEmail.Email);
                client.Send(msg);
            }
            client.Disconnect(true);

        }

        private MimeMessage CreateMessage(string email)
        {
            var msg = new MimeMessage();
            msg.From.Add(new MailboxAddress("Trackslance", "trackslance@gmail.com"));
            msg.To.Add(new MailboxAddress("", email));
            msg.Subject = "Newsletter!";

            msg.Body = new TextPart("plain")
            {
                Text = @"Testing put changes  in fucking api"
            };

            return msg;
        }


        #endregion

    }

}
