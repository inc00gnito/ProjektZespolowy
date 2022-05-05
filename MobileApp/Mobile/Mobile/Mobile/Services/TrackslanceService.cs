using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
namespace Mobile.Services
{
    public static class TrackslanceService
    {
        static string BaseUrl = "https://trackslance.azurewebsites.net/";
        static HttpClient client;

        static TrackslanceService()
        {
            client = new HttpClient
            {
                BaseAddress = new Uri(BaseUrl)
            };
          
        }
        public static async Task<IEnumerable<string>> GetTrack()
        {
            var json = await client.GetStringAsync("api/Tracks");
            var track = JsonConvert.DeserializeObject<IEnumerable<string>>(json);
            return track;
        }
    }
}
