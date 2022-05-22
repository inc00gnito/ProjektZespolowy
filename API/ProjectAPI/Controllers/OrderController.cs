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

        public OrderController(DataBaseContext db)
        {
            _db = db;
        }
 
        [HttpPost]
        public ActionResult AddOrder([FromHeader] string authorization, [FromBody] List<TrackDTO> tracksDTO)
        {
            
            Session session = Authorization(authorization);
            if (session == null)
                return Unauthorized("Session not found");

            int id = session.User.Id;
            var user = _db.UsersDbSet
                .Include(r=>r.Orders)
                .FirstOrDefault(r => r.Id == id);
            
            if (user == null)
            {
                return NotFound("Order not found");
            }

            
            float price = 0;
            List<OrderedTrack> Tracks = new List<OrderedTrack>();
            
            foreach(TrackDTO track in tracksDTO)
            {
                price += track.Cost;

                var orderedTrack = track.AsOrderedTrack();
                Tracks.Add(orderedTrack);
                
                _db.OrderedTracksDbSet.Add(orderedTrack);
                _db.SaveChanges();
                
                CreateTags(orderedTrack, track.Tags);
            }
            

            var order = new Order{
                Price = price,
                DateOfPurchase = DateTime.Now,
                Tracks = Tracks,
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
                return Unauthorized("Session not found");

            int id = session.User.Id;
            var user = _db.UsersDbSet
                .Include(r=>r.Orders)
                .FirstOrDefault(r => r.Id == id);

            if (user == null)
            {
                return NotFound("Order not found");
            }
            
            List<Order> orders = new List<Order>();
            orders = user.Orders.ToList();
            return Ok(orders);

        }        
        #region Methods
        
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

        private void CreateTags(OrderedTrack track, List<string> tags)
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
