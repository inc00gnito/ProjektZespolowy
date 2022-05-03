using System.Linq;
using Org.BouncyCastle.Utilities.IO;
using ProjectAPI.Models.DTOs;

namespace ProjectAPI.Models
{
    public static class Extensions
    {
        public static TrackDTO AsDto(this Track track)
        {
            return new TrackDTO()
            {
                Id = track.Id,
                Title = track.Title,
                Time = track.Time,
                Cost = track.Cost,
                UserId = track.UserId,
                DiscountedByUser = track.DiscountedByUser,
                DiscountedByShop = track.DiscountedByShop,
                Genre = track.Genre.ToString(),
                AudioFile = track.AudioFile,
                DemoFile = track.DemoFile,
                ImgFile = track.ImgFile,
                TimesSold = track.TimesSold,
                IsDiscounted = track.IsDiscounted,
                Authors = track.Authors.ToList(),
                Tags = track.Tags.ToList()
            };
        }
    }
}
