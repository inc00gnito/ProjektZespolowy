using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectAPI.Data;
using ProjectAPI.Models.Enums;

namespace ProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenreController : ControllerBase
    {

        [HttpGet]
        public List<string> GetAll()
        {
            var allGenres = Enum.GetNames(typeof(Genre)).ToList();
            return allGenres;
        }
    }
}
