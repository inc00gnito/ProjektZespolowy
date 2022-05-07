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
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using AutoMapper;
using ProjectAPI.Models.DTOs;


namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly DataBaseContext _db;
        private readonly IMapper _mapper;

        public UserController(DataBaseContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
        }
        [HttpGet]
        public ActionResult<User> GetUser([FromHeader] string authorization)
        {
            Session session = Authorization(authorization);
            if (session == null)
                return NotFound();
            int id = session.User.Id;
            var user = _db.UsersDbSet.FirstOrDefault(r => r.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            var getuser = _mapper.Map<GetUser>(user);
            return Ok(getuser);

        }
        [HttpGet("Orders")]
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
        [HttpDelete]
        public ActionResult DeleteUser([FromHeader] string authorization)
        {
            Session session = Authorization(authorization);
            if (session == null)
                return NotFound();
            int id = session.User.Id;
            var user = _db.UsersDbSet
                .Include(r=>r.Tracks)
                .FirstOrDefault(r => r.Id == id);
            if (user == null)
            {
                return NotFound();
            }
            if (user.Tracks.Count() > 0)
            {
                for (int i = 0; i < user.Tracks.Count(); i++)
                {
                    int trackid = user.Tracks[i].Id;
                    var track = _db.TracksDbSet.FirstOrDefault(t => t.Id == trackid);
                    _db.TracksDbSet.Remove(track);
                }
            }
            _db.UsersDbSet.Remove(user);
            _db.SessionDbSet.Remove(session);
            _db.SaveChanges();
            return Ok();
        }

        [HttpPut("ChangeName")]
        public ActionResult ChangeName([FromHeader] string authorization, [FromBody] ChangeName use)
        {
            Session session = Authorization(authorization);
            if (session == null)
                return NotFound();
            int id = session.User.Id;
            var user = _db.UsersDbSet.FirstOrDefault(u => u.Id == id);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (user == null)
            {
                return NotFound();
            }
            if (_db.UsersDbSet.Any(u => u.Username == use.UserName))
                return Conflict("Username already taken");
            user.Username = use.UserName;
            _db.SaveChanges();
            return Ok();
        }

        [HttpPut("ChangeEmail")]
        public ActionResult ChangeEmail([FromHeader] string authorization, [FromBody] ChangeEmail use)
        {
            if (IsValidEmail(use.Email))
            {
                Session session = Authorization(authorization);
                if (session == null)
                    return NotFound();
                int id = session.User.Id;
                var user = _db.UsersDbSet.FirstOrDefault(u => u.Id == id);
                if (user == null)
                {
                    return NotFound();
                }
                if (_db.UsersDbSet.Any(u => u.Email == use.Email))
                    return Conflict("Email already taken");
                user.Email = use.Email;
                _db.SaveChanges();
                return Ok();
            }
            Debug.Print("Email is incorrect");
            return Conflict();
        }
        [HttpPut("ChangePassword")]
        public ActionResult ChangePassword([FromHeader] string authorization, [FromBody] ChangePassw use)
        {
            Session session = Authorization(authorization);
            if (session == null)
                return NotFound();
            int id = session.User.Id;
            var user = _db.UsersDbSet.FirstOrDefault(u => u.Id == id);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (user == null)
            {
                return NotFound();
            }

            user.HashedPassword = Hash(use.Password, user.Salt);
            _db.SaveChanges();
            return Ok();
        }

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
            return _db.SessionDbSet
                .Include(r => r.User)
                .FirstOrDefault(s => s.Token == token);
        }

        [HttpPost("LogIn")]
        public async Task<ActionResult> LogIn([FromBody] LogInModel model)
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

            var getUser = _mapper.Map<GetUser>(session.User);

            var response = new UserDTO
            {
                User = getUser,
                Token = session.Token

            };

            return Ok(response);
        }

        [HttpGet("LogOut")]
        public async Task<ActionResult> LogOut([FromHeader] string authorization)
        {

            Session session = Authorization(authorization);

            if (session == null)
                return new UnauthorizedResult();

            _db.SessionDbSet.Remove(session);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("SignUp")]
        public async Task<ActionResult> SignUp([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
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

            string token = CreateToken(); 

            while(_db.SessionDbSet.Any(s => s.Token == token))
            {
                token = CreateToken();
            }

            var session = new Session{
                Token = token,
                Expiration = DateTime.Now.AddHours(3),
                User = newUser
            };

            _db.SessionDbSet.Add(session);            
            await _db.SaveChangesAsync();

            var getUser = _mapper.Map<GetUser>(session.User);

            var response = new UserDTO
            {
                User = getUser,
                Token = session.Token

            };

            return Ok(response);  
            
        }
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

    }
}
