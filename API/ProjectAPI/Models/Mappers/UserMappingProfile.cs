using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ProjectAPI.Models;
using ProjectAPI.Models.DTOs;

namespace ProjectAPI
{
    public class UserMappingProfile : Profile
    {
        public UserMappingProfile()
        {
            CreateMap<User, GetUser>();
        }
            
    }
}
