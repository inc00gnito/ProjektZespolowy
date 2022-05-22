using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
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
using ProjectAPI.Models.DTOs;

namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TracksController : ControllerBase
    {
        public readonly DataBaseContext _db;
        private readonly Cloudinary _cloudinary;
        private readonly IMapper _mapper;

        public TracksController(DataBaseContext db, Cloudinary cloudinary, IMapper mapper)
        {
            _db = db;
            _cloudinary = cloudinary;
            _mapper = mapper;
        }
              
        //TODO - to postTrack add UserId after authorization is done
        [HttpPost]
        public ActionResult AddTrack([FromForm] Track trackFromForm, [FromHeader] string authorization)
        {
            Debug.Print(trackFromForm.Title);
            Session session = Authorization(authorization);
            if (session == null)
                return Unauthorized("Session not found");
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
           
            return Ok();
        }

        [HttpGet]
        public ActionResult<List<Track>> GetTracks([FromQuery]SieveModel conditions)
        {

            var tracks = _db.TracksDbSet
                .Include(t => t.Authors).ToList()
                .Select(track =>
                {
                    track.Tags = _db.TagsDbSet.Where(tag => tag.TrackId == track.Id)
                        .Select(tag => tag.Description)
                        .ToList();
                    return track;
                }).Select(t => t.AsDto()).ToList();
            
            if(conditions.filter != null)
                tracks = Filter(conditions.filter.Split(',').ToList(), tracks);
            if(conditions.sort != null )
                tracks = Sort(conditions.sort,tracks);
            if(conditions.search != null )
                tracks = Search(conditions.search,tracks);

            return Ok(tracks);
        }

        [HttpGet("bestSellers")]
        public ActionResult<List<Track>> GetBestSellers()
        {
            var Tracks = _db.TracksDbSet
                .Include(t => t.Authors)
                .ToList()
                .Select(track =>
                {
                    track.Tags = _db.TagsDbSet.Where(tag => tag.TrackId == track.Id)
                        .Select(tag => tag.Description)
                        .ToList();
                    return track;
                }).ToList();
            Tracks.Sort(delegate(Track x, Track y) { return y.TimesSold.CompareTo(x.TimesSold); });

            var numberOfTrack = Math.Min(6, Tracks.Count());
            var bestSellers = Tracks.GetRange(0, numberOfTrack).Select(t => t.AsDto());


            return Ok(bestSellers);
        }

        [HttpGet("discounted")]
        public ActionResult<List<Track>> GetDiscounted()
        {
            var Discounted = _db.TracksDbSet
                .Include(t => t.Authors)
                .ToList()
                .Where(x => x.IsDiscounted)
                .Select(track =>
                {
                    track.Tags = _db.TagsDbSet.Where(tag => tag.TrackId == track.Id)
                        .Select(tag => tag.Description)
                        .ToList();
                    return track;
                }).Select(t => t.AsDto()).ToList();
            
            return Ok(Discounted);
        }
       
        [HttpPut("[action]/{trackId}")]
        public ActionResult DiscountTrackByUser(int trackId, float discountedPrice)
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
                return NotFound("Track not found");
            }
            _db.TracksDbSet.Remove(track);
            _db.SaveChanges();
            return Ok();
        }

        #region Methods

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
            Session session = _db.SessionDbSet
                .Include(r => r.User)
                .FirstOrDefault(s => s.Token == token);
            
            if( session is null)
                return null;

            if(session.Expiration > DateTime.Now)
            {
                _db.SessionDbSet.Remove(session);
                _db.SaveChanges();
                return null;
            }    
            
            return session;
        }

        private List<TrackDTO> Sort(SortBy? key, List<TrackDTO> tracks)
        {
            

            if (key == SortBy.CostLowToHigh)
                return tracks.OrderBy(x => (x.Cost - x.DiscountedByUser)).ToList();
            else if (key == SortBy.CostHighToLow)
                return tracks.OrderBy(x => (x.DiscountedByUser- x.Cost)).ToList();
            else if (key == SortBy.TimesSold)
                return tracks.OrderBy(x => (x.TimesSold)).Reverse().ToList();
            else if (key == SortBy.DiscountedLowToHigh)
                return tracks.OrderBy(x => (x.DiscountedByUser)).ToList();
            else if (key == SortBy.DiscountedHighToLow)
                return tracks.OrderBy(x => (x.DiscountedByUser)).Reverse().ToList();

            return tracks;
        }
        
        private List<TrackDTO> Filter(List<string> genre, List<TrackDTO> tracks)
        {
            return tracks.Where( x => genre.Contains(x.Genre))
                        .Select(track => 
                        {
                            track.Tags = _db.TagsDbSet.Where(tag => tag.TrackId == track.Id)
                                .Select(tag => tag.Description)
                                .ToList();
                            return track;
                        }).ToList();
        }

        private List<TrackDTO> Search(string phrase, List<TrackDTO> tracks)
        {
            return tracks.Where(x => x.Title.ToLower().Contains(phrase.ToLower()) || x.Authors.Any(a => a.StageName.ToLower().Contains(phrase.ToLower()))).ToList();
        }    
      
        #endregion
    }
}