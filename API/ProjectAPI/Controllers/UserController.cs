using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectAPI.Data;
using ProjectAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;


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

       /* [HttpPut("changename/{id}")]
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
        }*/

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
        /*
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
*/
        private string Hash(string password, byte[] salt)
        {
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                            password: password,
                            salt: salt,
                            prf: KeyDerivationPrf.HMACSHA512,
                            iterationCount: 100000,
                            numBytesRequested: 256 / 8));
            return hashed;
        }

        private string CreateToken()
        {
            char[] chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray(); 
            int size = 100;

            byte[] data = new byte[4*size];
            using (var crypto = RandomNumberGenerator.Create())
            {
                crypto.GetBytes(data);
            }

            StringBuilder token = new StringBuilder(size);
            for (int i = 0; i < size; i++)
            {
                var rnd = BitConverter.ToUInt32(data, i * 4);
                var idx = rnd % chars.Length;

                token.Append(chars[idx]);
            }

            return token.ToString();

        }

        private Session Authorization(string token)
        {
            return _db.SessionDbSet.FirstOrDefault(s => s.Token == token);
        }

        [HttpPost("LogIn")]
        public async Task<ActionResult> LogIn([FromForm] LogInModel model)
        {
            
            var user = _db.UsersDbSet.FirstOrDefault(u => u.Username == model.Login || u.Email == model.Login );
            if(user == null)
                return NotFound("user doesnt exist");

            string hashed = Hash(model.Password, user.Salt);

            if(hashed != user.HashedPassword)
                return BadRequest("invalid password");
            
            string token = CreateToken(); 

            while(_db.SessionDbSet.Any(s => s.Token == token))
            {
                token = CreateToken();
            }

            var session = new Session{
                Token = token,
                Expiration = DateTime.Now.AddHours(3),
                User = user
            };

            _db.SessionDbSet.Add(session);            
            await _db.SaveChangesAsync();

            return Ok(session.Token);            
        }

        [HttpPost("LogOut")]
        public async Task<ActionResult> LogOut([FromHeader] string token)
        {
            Session session = Authorization(token);

            if( session == null)
                return new UnauthorizedResult();
            
            _db.SessionDbSet.Remove(session);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("SignUp")]
        public async Task<ActionResult> SignUp([FromForm] RegisterModel model)
        {
            byte[] newSalt = new byte[128 / 8];

            using (var rngCsp = new RNGCryptoServiceProvider())
            {
                rngCsp.GetNonZeroBytes(newSalt);
            }

            string hashed = Hash(model.Password, newSalt); 

            var newUser = new User 
            {
                HashedPassword = hashed,
                Salt = newSalt,
                Username = model.Username,
                Email = model.Email
            };
            

            if(_db.UsersDbSet.Any(u => u.Username == model.Username))
                return Conflict("user already exists");
            
            if(_db.UsersDbSet.Any(u => u.Username == model.Email))
                return Conflict("user already exists");

            if(_db.UsersDbSet.Any(u => u.Email == model.Username))
                return Conflict("user already exists");

            if(_db.UsersDbSet.Any(u => u.Email == model.Email))
                return Conflict("user already exists");

            _db.UsersDbSet.Add(newUser);
            await _db.SaveChangesAsync();

            return Ok();
            
        }

    }
}
