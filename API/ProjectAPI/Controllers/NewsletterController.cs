using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using ProjectAPI.Data;
using ProjectAPI.Models;

namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewsletterController : ControllerBase
    {
        public readonly DataBaseContext _db;

        public NewsletterController(DataBaseContext db)
        {
            _db = db;
        }
        

        [HttpPost]
        public IActionResult Subscribe([FromBody] NewsletterEmail email)
        {
            if (IsValidEmail(email.Email))
            {
                var emailNewsletter = new NewsletterEmail { Email = email.Email };
                if (_db.NewsletterEmailsDbSet.Any(e => e.Email == email.Email))
                    return Conflict();
                
                _db.NewsletterEmailsDbSet.Add(emailNewsletter);
                _db.SaveChanges();
                List<NewsletterEmail> list = new List<NewsletterEmail> {emailNewsletter};
                SendMail(list);
                return Ok();
            }
            Debug.Print("Email is incorrect");
            return Conflict();

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
