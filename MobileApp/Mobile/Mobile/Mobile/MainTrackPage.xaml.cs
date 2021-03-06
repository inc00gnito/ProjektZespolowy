using Mobile.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;


namespace Mobile
{
    public class Music
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

    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class MainTrackPage : ContentPage
    {
        public async void LoadData()
        {
            var content = "";
            HttpClient client = new HttpClient();
            var RestURL = "https://trackslance.herokuapp.com/api/Tracks";
            client.BaseAddress = new Uri(RestURL);
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = await client.GetAsync(RestURL);
            content = await response.Content.ReadAsStringAsync();
            var Items = JsonConvert.DeserializeObject<List<Music>>(content);
            TrackList.ItemsSource = Items;
           
        }

        ObservableCollection<Music> musicList;
        public ObservableCollection<Music> MusicList
        {
            get { return musicList; }
            set
            {
                musicList = value;
                OnPropertyChanged();
            }
        }
        private ObservableCollection<Music> GetMusics()
        {


            return new ObservableCollection<Music>
                {

                    //new Music { Title = "Beach Walk", Artist = "Unicorn Heads", Url = "https://ia600605.us.archive.org/32/items/Mp3Playlist_555/AaronNeville-CrazyLove.mp3", CoverImage = "cover_1.jpg", IsRecent = true},
                    //new Music { Title = "I'll Follow You", Artist = "Density & Time", Url = "http://techslides.com/demos/samples/sample.mp3", CoverImage = "https://images.complex.com/complex/image/upload/c_fill,dpr_auto,f_auto,fl_lossy,g_face,q_auto,w_1280/bpi6fyo9ky60ranoscof.jpg"},
                    //new Music { Title = "Ancient", Artist = "Density & Time", Url = "http://techslides.com/demos/samples/sample.mp3"},
                    //new Music { Title = "News Room News", Artist = "Spence", Url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"},
                    //new Music { Title = "Bro Time", Artist = "Nat Keefe & BeatMowe", Url = "https://ia600605.us.archive.org/32/items/Mp3Playlist_555/AaronNeville-CrazyLove.mp3"},
                    //new Music { Title = "Cats Searching for the Truth and the title is really long", Artist = "Nat Keefe & Hot Buttered Rum", Url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"}
                };
        }

        List<string> Items1 = new List<string>();
        List<string> Items2 = new List<string>();

        private void OnDropdownSelected(object sender, ItemSelectedEventArgs e)
        {
            //label.Text = IsItem1 ? Items1[e.SelectedIndex] : Items2[e.SelectedIndex];
        }
        private void ProceedCheckoutClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            Navigation.PushAsync(new CartPage());
        }
        private void MenuClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new Menu());
        }
        private async void ShoppingBagClicked(object sender, EventArgs e)
        {

            var token = await SecureStorage.GetAsync("Token");
            if (token == null)
            {
                Console.WriteLine("TOKEN" + token);
                await Navigation.PushAsync(new Login());
                await DisplayAlert("You are not login", "Login first, and try again", "Okay", "Cancel");
            }
            else
            {
                Console.WriteLine("TOKEN" + token);
                await Navigation.PushAsync(new MyOrders());
            }
        }
        public MainTrackPage()
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
    }
}
