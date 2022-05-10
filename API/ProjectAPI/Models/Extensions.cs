using System.Linq;
using Org.BouncyCastle.Utilities.IO;
using ProjectAPI.Models.DTOs;
using System;
using System.Collections.Generic;

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

        public static OrderedTrack AsOrderedTrack(this TrackDTO track)
        {

            List<Author> Authors = new List<Author>();
            foreach(Author author in track.Authors)
            {
                var newAutor = new Author{
                     StageName = author.StageName
                };

                Authors.Add(newAutor);
            }

            return new OrderedTrack()
            {
                Title = track.Title,
                Time = track.Time,
                Cost = track.Cost,
                UserId = track.UserId,
                DiscountedByUser = track.DiscountedByUser,
                DiscountedByShop = track.DiscountedByShop,
                Genre = (Enums.Genre)Enum.Parse(typeof(Enums.Genre), track.Genre),
                AudioFile = track.AudioFile,
                DemoFile = track.DemoFile,
                ImgFile = track.ImgFile,
                TimesSold = track.TimesSold,
                IsDiscounted = track.IsDiscounted,
                Authors = Authors,
                Tags = track.Tags.ToList()
            };
        }
    }
}
