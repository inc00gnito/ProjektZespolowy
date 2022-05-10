using System;
using System.Collections.Generic;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using System.Net.Http;
using Newtonsoft.Json;
using Mobile.Models;

namespace Mobile
{
    public partial class Tracks : ContentPage
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
        List<string> Items1 = new List<string>();
        List<string> Items2 = new List<string>();

        public Tracks()
        {
            InitializeComponent();
            LoadData();
            

            Items1.Add("Hip-Hop");
            Items1.Add("Pop");
            Items1.Add("RNB");

            Items2.Add("Price");
            Items2.Add("Genre");
            Items2.Add("Newest");
            Items2.Add("Relevance");



            dropdown.ItemsSource = Items1;
            dropdown.SelectedIndex = 1;
            dropdown.ItemSelected += OnDropdownSelected;

            dropdown2.ItemsSource = Items2;
            dropdown2.SelectedIndex = 1;
            dropdown2.ItemSelected += OnDropdownSelected;
        }

        private void OnDropdownSelected(object sender, ItemSelectedEventArgs e)
        {
            //label.Text = IsItem1 ? Items1[e.SelectedIndex] : Items2[e.SelectedIndex];
        }
        private void ProceedCheckoutClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            Navigation.PushAsync(new CartPage());
        }
        private void btn_Clicked(object sender, EventArgs e)
        {
            //dropdown.ItemsSource = IsItem1 ? Items2 : Items1;
            //dropdown.SelectedIndex = IsItem1 ? 5 : 1;
            //IsItem1 = !IsItem1;
        }
        private void PlayTrack(object sender, EventArgs e)
        {
            Button btn = (Button)sender;


            Navigation.PushAsync(new SingleTrackPlay());
        }
    }
}