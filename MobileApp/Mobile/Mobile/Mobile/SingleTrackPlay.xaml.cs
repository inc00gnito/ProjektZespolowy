using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;



namespace Mobile
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    
    public partial class SingleTrackPlay : ContentPage
    {
        public bool playing;
        public SingleTrackPlay()
        {
            InitializeComponent();
        }
        private void MenuClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new Menu());
        }

        private void PlayButton_Clicked(object sender, EventArgs e)
        {
            
            var button = (ImageButton)sender; 
            if(playing)
            {
                playing = false;
                button.Source = "icon_play_white.png";
            }
            else
            {
                DependencyService.Get<IAudio>().PlayAudioFile("Gentleman.mp3");
                playing = true;
                button.Source = "icon_pause_white.png";
            }

        }
    }
}