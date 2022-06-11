using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using ProjectAPI.Data;
using ProjectAPI.Models;
using SendGrid;
using SendGrid.Helpers.Mail;


namespace ProjectAPI.Controllers
{
    [Route("api/")]
    [ApiController]
    public class NewsletterController : ControllerBase
    {
        public readonly DataBaseContext _db;
        private readonly SendGridKey _sgKey;

        public NewsletterController(DataBaseContext db, SendGridKey sgKey)
        {
            _db = db;
            _sgKey = sgKey;
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

        private async  void SendMail(string newsletterEmail)
        {
            var client = new SendGridClient(_sgKey.API);
            var msg = CreateMessage();
            msg.From = new EmailAddress("trackslance@gmail.com", "Trackslance");
            msg.AddTo(new EmailAddress(newsletterEmail));
            await client.SendEmailAsync(msg).ConfigureAwait(false);
        }



        private async void ContactUs(Contact contact)
        {
            var client = new SendGridClient(_sgKey.API);
            string name = contact.FirstName + " " + contact.LastName;
            var msg = CreateMessage(contact.Message);
            
            msg.From = new EmailAddress("trackslance@gmail.com");
            msg.AddTo(new EmailAddress(contact.Email, name));
            await client.SendEmailAsync(msg).ConfigureAwait(false);
        }

        private SendGridMessage CreateMessage(string message = null)
        {
            var msg = new SendGridMessage();
            


            if (message == null)
            {
                msg.Subject = "Newsletter!";
                msg.PlainTextContent = "Thank you for signing up to our newsletter \n" +
                                       "";
            }
            else 
            {
                msg.Subject = "Help!";
                msg.HtmlContent = "You have sent the following message to us <br>";
                msg.HtmlContent += "<strong>" + message + "</strong> <br>";
                msg.HtmlContent += "We will respond as soon as we can! <br>" +
                                  "<br> Trackslance Team";

            }
            return msg;
        }
        #endregion

    }

}
