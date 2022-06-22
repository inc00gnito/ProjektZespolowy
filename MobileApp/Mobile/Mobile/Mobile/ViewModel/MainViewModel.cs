using Mobile.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;
using System.Net.Http;
using Newtonsoft.Json;


namespace Mobile.ViewModel
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
   
    public class MainViewModel : BaseViewModel
    {
        public MainViewModel()
        {
            musicList = GetMusics();
          recentMusic = musicList.Where(x => x.Id != 1).FirstOrDefault();
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

        private Music recentMusic;
        public Music RecentMusic
        {
            get { return recentMusic; }
            set
            {
                recentMusic = value;
                OnPropertyChanged();
            }
        }

        private Music selectedMusic;
        public Music SelectedMusic
        {
            get { return selectedMusic; }
            set
            {
                selectedMusic = value;
                OnPropertyChanged();
            }
        }

        public ICommand SelectionCommand => new Command(PlayMusic);

        private void PlayMusic()
        {
            if (selectedMusic != null)
            {
                var viewModel = new PlayerViewModel(selectedMusic, musicList) ;
                var playerPage = new TrackPlayer { BindingContext = viewModel };        //Tu przekazywane są informacje do Track Playera
                var navigation = Application.Current.MainPage as NavigationPage;
                navigation.PushAsync(playerPage, true);
            }
        }

        public async void LoadData()
        {
            var content = "";
            HttpClient client = new HttpClient();
            var RestURL = "https://trackslance.herokuapp.com/api/Tracks";
            client.BaseAddress = new Uri(RestURL);
            client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = await client.GetAsync(RestURL);
            content = await response.Content.ReadAsStringAsync();
            var Items = JsonConvert.DeserializeObject<List<Track>>(content);
            //TracksList.ItemsSource = Items;

        }

        private ObservableCollection<Music> GetMusics()
        {


            return new ObservableCollection<Music> 
            {

                //    new Music { Title = "Beach Walk", Artist = "Unicorn Heads", Url = "https://ia600605.us.archive.org/32/items/Mp3Playlist_555/AaronNeville-CrazyLove.mp3", CoverImage = "cover_1.jpg", IsRecent = true},
                //    new Music { Title = "I'll Follow You", Artist = "Density & Time", Url = "http://techslides.com/demos/samples/sample.mp3", CoverImage = "https://images.complex.com/complex/image/upload/c_fill,dpr_auto,f_auto,fl_lossy,g_face,q_auto,w_1280/bpi6fyo9ky60ranoscof.jpg"},
                //    new Music { Title = "Ancient", Artist = "Density & Time", Url = "http://techslides.com/demos/samples/sample.mp3"},
                //    new Music { Title = "News Room News", Artist = "Spence", Url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"},
                //    new Music { Title = "Bro Time", Artist = "Nat Keefe & BeatMowe", Url = "https://ia600605.us.archive.org/32/items/Mp3Playlist_555/AaronNeville-CrazyLove.mp3"},
                //    new Music { Title = "Cats Searching for the Truth and the title is really long", Artist = "Nat Keefe & Hot Buttered Rum", Url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"}
                //
            };
        }
    }
}
