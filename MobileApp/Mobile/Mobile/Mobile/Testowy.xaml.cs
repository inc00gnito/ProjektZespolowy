using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using System.Net.Http;
using Newtonsoft.Json;
using Mobile.Models;
using System.Collections.ObjectModel;

namespace Mobile
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Testowy : ContentPage
    {
        public class Track
        {
            public int Id { get; set; }
            public string Title { get; set; }
            public float Time { get; set; }
            public double Cost { get; set; }
            public int UserId { get; set; }
            public double DiscountedByUser { get; set; } // w PLN
            public double DiscountedByShop { get; set; } // w %
            public string Genre { get; set; }
            public List<string> Tags { get; set; }

            public List<Author> Authors { get; set; }
            public string AudioFile { get; set; }
            public string DemoFile { get; set; }
            public string ImgFile { get; set; }


            public int TimesSold { get; set; }
            public bool IsDiscounted { get; set; }
        }
        public Testowy()
        {
            InitializeComponent();

            LoadData();
        }
       
        public async void LoadData()
        {
            var content = "";
            HttpClient client = new HttpClient();
            var RestURL = "https://trackslance.azurewebsites.net/api/Tracks";  
            client.BaseAddress = new Uri(RestURL);
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = await client.GetAsync(RestURL);
            content = await response.Content.ReadAsStringAsync();
            var Items = JsonConvert.DeserializeObject<List<Track>>(content);
            TracksList.ItemsSource = Items;

        }
    }
}