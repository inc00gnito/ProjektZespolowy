using System;
using System.Diagnostics;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
                Debug.Print("added to database");
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
        #endregion

    }

}
