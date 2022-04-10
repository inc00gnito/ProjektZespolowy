using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectAPI.Data;
using ProjectAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly DataBaseContext _db;

        public UserController(DataBaseContext db)
        {
            _db = db;
        }
        [HttpDelete("deleteuser/{id}")]
        public ActionResult DeleteUser([FromRoute] int id)
        {
            var user = _db.UsersDbSet.FirstOrDefault(r => r.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            _db.UsersDbSet.Remove(user);
            _db.SaveChanges();
            return NoContent();
        }
        [HttpPut("changename/{id}")]
        public ActionResult ChangeName([FromRoute] int id, [FromBody] ChangeName use)
        {
            var user = _db.UsersDbSet.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            user.FirstName = use.FirstName;
            user.LastName = use.LastName;
            _db.SaveChanges();
            return Ok();
        }
        [HttpPut("changeemail/{id}")]
        public ActionResult ChangeEmail([FromBody] ChangeEmail use, [FromRoute] int id)
        {
            var user = _db.UsersDbSet.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            user.Email = use.Email;
            _db.SaveChanges();
            return Ok();
        }
        [HttpPut("changepassword/{id}")]
        public ActionResult ChangePassword([FromBody] ChangePassw use, [FromRoute] int id)
        {
            var user = _db.UsersDbSet.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            user.Password = use.Password;
            _db.SaveChanges();
            return Ok();
        }

    }
}
