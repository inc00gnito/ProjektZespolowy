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
    public class OrderController : ControllerBase
    {
        public readonly DataBaseContext _db;
        private readonly IMapper _mapper;

        public OrderController(DataBaseContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
 
        [HttpPost]
        public ActionResult PostOrderHistory([FromHeader] string authorization, [FromBody] List<TrackDTO> tracksDTO)
        {
            
            Session session = Authorization(authorization);
            if (session == null)
                return NotFound();

            int id = session.User.Id;
            var user = _db.UsersDbSet
                .Include(r=>r.Orders)
                .FirstOrDefault(r => r.Id == id);
            if (user == null)
            {
                return NotFound("User not found");
            }

            
            float price = 0;

            List<OrderedTracks> tracks = new List<OrderedTracks>();
            
            foreach(TrackDTO track in tracksDTO)
            {
                price += track.Cost;
                var orderedTrack = track.AsNormal();
                tracks.Add(orderedTrack);
                _db.OrderedTracksDbSet.Add(orderedTrack);
                _db.SaveChanges();
                CreateTags(orderedTrack, track.Tags);
            }
            

            var order = new Order{
                Price = price,
                DateOfPurchase = DateTime.Now,
                Tracks = tracks,
                UserId = id
            };

            
            _db.OrdersDbSet.Add(order);
            _db.SaveChanges();

            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<Order>> GetOrderHistory([FromHeader] string authorization)
        {
            Session session = Authorization(authorization);
            if (session == null)
                return NotFound();
            int id = session.User.Id;
            var user = _db.UsersDbSet
                .Include(r=>r.Orders)
                .FirstOrDefault(r => r.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            List<Order> orders = new List<Order>();
            orders = user.Orders.ToList();
            return Ok(orders);

        }        
        #region Methods
        private Session Authorization(string token)
        {
            return _db.SessionDbSet
                .Include(r => r.User)
                .FirstOrDefault(s => s.Token == token);
        }

        private void CreateTags(OrderedTracks track, List<string> tags)
        {

            for (int i = 0; i < tags.Count; i++)
            {
                if (tags[i] != string.Empty)
                {
                    var newTag = new Tag()
                    {
                        Description = tags[i],
                        OrderedTrackId = track.Id
                    };
                    _db.TagsDbSet.Add(newTag);
                    _db.SaveChanges();
                }
            }
            
        }

        #endregion

    }
}
