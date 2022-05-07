using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using ProjectAPI.Data;
using ProjectAPI.Models;

namespace ProjectAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class NewsletterController : ControllerBase
    {
        public readonly DataBaseContext _db;

        public NewsletterController(DataBaseContext db)
        {
            _db = db;
        }

        [Route("Newsletter")]
        [HttpPost]
        public IActionResult Subscribe([FromBody] NewsletterEmail email)
        {
            if (IsValidEmail(email.Email))
            {
                var emailNewsletter = new NewsletterEmail { Email = email.Email };
                if (_db.NewsletterEmailsDbSet.Any(e => e.Email == email.Email))
                    return Conflict("You have already subscribed");
                
                _db.NewsletterEmailsDbSet.Add(emailNewsletter);
                _db.SaveChanges();
                SendMail(emailNewsletter.Email);
                return Ok();
            }
            Debug.Print("Email is incorrect");
            return Conflict("Provide correct email address");

        }

        [Route("contact")]
        [HttpPost]
        public IActionResult Contact([FromBody] Contact contact)
        {
            var sendMessage = new Contact
            {
                Email = contact.Email, FirstName = contact.FirstName, LastName = contact.LastName,
                Message = contact.Message
            };

            ContactUs(sendMessage);
            return Ok();
        }

        #region Methods
        bool IsValidEmail(string email)
        {
            var trimmedEmail = email.Trim();

            if (trimmedEmail.EndsWith("."))
            {
                return false; // suggested by @TK-421
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == trimmedEmail;
            }
            catch
            {
                return false;
            }
        }

        private void SendMail(string newsletterEmail)
        {
            var client = new SmtpClient();
            client.Connect("smtp.gmail.com", 587, false);
            client.Authenticate("trackslance@gmail.com", "Trackslance1!"); // later hide password somehow

                var msg = CreateMessage();
                msg.From.Add(new MailboxAddress("Trackslance", "trackslance@gmail.com"));
                msg.To.Add(new MailboxAddress("", newsletterEmail));
                client.Send(msg);
            
            client.Disconnect(true);
        }

        private void ContactUs(Contact contact)
        {
            var client = new SmtpClient();
            client.Connect("smtp.gmail.com", 587, false);
            client.Authenticate("trackslance@gmail.com", "Trackslance1!"); // later hide password somehow
            string name = contact.FirstName + " " + contact.LastName;
            var msg = CreateMessage(contact.Message);
            msg.To.Add(new MailboxAddress("Trackslance", "trackslance@gmail.com"));
            msg.From.Add(new MailboxAddress(name, contact.Email));
            client.Send(msg);
          

            client.Disconnect(true);

        }

        private MimeMessage CreateMessage(string message = null)
        {
            var msg = new MimeMessage();
            
            
            if (message == null)
            {
                msg.Subject = "Newsletter!";
                msg.Body = new TextPart("plain")
                {
                    Text = @"Testing"
                };
            }
            else 
            {
                msg.Subject = "Help";
                msg.Body = new TextPart("plain")
            {
                Text = message
            };

            }


            return msg;
        }
        #endregion

    }

}
