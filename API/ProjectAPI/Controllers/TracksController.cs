using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using ProjectAPI.Data;
using ProjectAPI.Models;
using ProjectAPI.Models.Enums;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.TagHelpers.Cache;
using Newtonsoft.Json;
using Org.BouncyCastle.Crypto.Utilities;

namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TracksController : ControllerBase
    {
        public readonly DataBaseContext _db;
        private readonly Cloudinary _cloudinary;
        public TracksController(DataBaseContext db, Cloudinary cloudinary)
        {
            _db = db;
            _cloudinary = cloudinary;
        }

         
            
        //TODO - to postTrack add UserId after authorization is done
        [HttpPost]
        public ActionResult AddTrack([FromForm] Track trackFromForm, [FromHeader] string token)
        {
            Debug.Print(trackFromForm.Title);
            Session session = Authorization(token);
            if (session == null)
                return NotFound();
            int id = session.User.Id;

            var track = new Track
            {
                Title = trackFromForm.Title,
                Time = trackFromForm.Time,
                Cost = trackFromForm.Cost,
                Genre = trackFromForm.Genre,
                Tags = trackFromForm.Tags,
                Authors = trackFromForm.Authors,
                UserId = id,

            };

            if (trackFromForm.audioFormFile == null || trackFromForm.demoFormFile == null || trackFromForm.imageFormFile == null)
                return BadRequest("File cannot be empty");
            track.AudioFile = GetFileStringAndUpload(trackFromForm.audioFormFile).Result;
            track.DemoFile = GetFileStringAndUpload(trackFromForm.demoFormFile).Result;
            track.ImgFile = GetFileStringAndUpload(trackFromForm.imageFormFile, "image").Result;


            _db.TracksDbSet.Add(track);
            _db.SaveChanges();
            CreateTags(track, trackFromForm.Tags);
            //_db.SaveChanges();
            //CreateAuthors(track);

            return Ok();
        }

       

        [HttpGet]
        public ActionResult<List<Track>> GetTracks()
        {
            var Tracks = _db.TracksDbSet.ToList();
            return Ok(Tracks);
        }


        [HttpGet("bestSellers")]
        public ActionResult<List<Track>> GetBestSellers()
        {
            var Tracks = _db.TracksDbSet.ToList();
            Tracks.Sort(delegate(Track x, Track y) { return y.TimesSold.CompareTo(x.TimesSold); });

            var numberOfTrack = Math.Min(6, Tracks.Count());
            var BestSellers = Tracks.GetRange(0, numberOfTrack);

            return Ok(BestSellers);
        }

        [HttpGet("discounted")]
        public ActionResult<List<Track>> GetDiscounted()
        {
            var Discounted = _db.TracksDbSet.ToList().Where(x => x.IsDiscounted);
            
            return Ok(Discounted);
        }

        [HttpGet("filterbygenre")]
        public ActionResult<List<Track>> FilterByGernes([FromQuery] params Genre[] genre)
        {
            Debug.Print(genre.Count().ToString());


            var Tracks = _db.TracksDbSet.ToList().Where(x => genre.Contains(x.Genre));
            return Ok(Tracks);
        }


        [HttpGet("sort")]
        public ActionResult<List<Track>> Sort([FromQuery] SortBy key)
        {
            
            var Tracks = _db.TracksDbSet.ToList();
            
            if (key == SortBy.CostLowToHigh)
                return Ok(Tracks.OrderBy(x => (x.Cost - x.DiscountedByUser)));
            else if (key == SortBy.CostHighToLow)
                return Ok(Tracks.OrderBy(x => (x.DiscountedByUser- x.Cost)));
            else if (key == SortBy.TimesSold)
                return Ok(Tracks.OrderBy(x => (x.TimesSold)).Reverse());
            else if (key == SortBy.DiscountedLowToHigh)
                return Ok(Tracks.OrderBy(x => (x.DiscountedByUser)));
            else if (key == SortBy.DiscountedHighToLow)
                return Ok(Tracks.OrderBy(x => (x.DiscountedByUser)).Reverse());

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
            var emails = _db.NewsletterEmailsDbSet.ToList();
            SendMail(emails);

            return NoContent();
        }
        [HttpDelete("deletetrack/{id}")]
        public ActionResult DeleteTrack([FromRoute] int id)
        {
            var track = _db.TracksDbSet.FirstOrDefault(r => r.Id == id);
            if (track == null)
            {
                return NotFound();
            }
            _db.TracksDbSet.Remove(track);
            _db.SaveChanges();
            return Ok();
        }

        #region Methods

        private void CreateAuthors(Track track)
        {
            foreach (var author in track.Authors)
            {
                if (author.StageName != null)
                {
                    var newAuthor = new Author
                    {
                        StageName = author.StageName,
                        TrackId = track.Id,
                    };
                    _db.AuthorsDbSet.Add(newAuthor);
                    _db.SaveChanges();
                }

            }

        }

        private void CreateTags(Track track, List<string> tags)
        {

            for (int i = 0; i < tags.Count; i++)
            {
                if (tags[i] != string.Empty)
                {
                    var newTag = new Tag()
                    {
                        Description = tags[i],
                        TrackId = track.Id
                    };
                    _db.TagsDbSet.Add(newTag);
                    _db.SaveChanges();
                }
            }
            
        }

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

        private async Task<string> GetFileStringAndUpload(IFormFile file, string type = "")
        {
            if (file == null)
                return string.Empty;
            RawUploadResult uploadResult;

            if (type == "image")
            {
                 uploadResult = await _cloudinary.UploadAsync(new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, file.OpenReadStream())
                }).ConfigureAwait(false);
            }
            else
            {
                 uploadResult = await _cloudinary.UploadAsync("video", null,
                    new FileDescription(file.FileName, file.OpenReadStream())).ConfigureAwait(false);

            }

            
            return uploadResult.Url.ToString();
        }

        private Session Authorization(string token)
        {
            return _db.SessionDbSet
                .Include(r => r.User)
                .FirstOrDefault(s => s.Token == token);
        }

        #endregion
    }
}