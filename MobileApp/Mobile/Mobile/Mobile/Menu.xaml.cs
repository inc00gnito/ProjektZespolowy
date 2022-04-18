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
    public partial class Menu : ContentPage
    {
        public Menu()
        {
            InitializeComponent();
        }
        private void AboutUsClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            btn.TextColor = Color.FromHex("#FF0DBF");
            Navigation.PushAsync(new AboutUs());
        }
        private void TracksClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            btn.TextColor = Color.FromHex("#FF0DBF");
            Navigation.PushAsync(new Tracks());
        }
        private void OnSaleClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            btn.TextColor = Color.FromHex("#FF0DBF");
            Navigation.PushAsync(new OnSale());
        }
        private void ContactUsClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            btn.TextColor = Color.FromHex("#FF0DBF");
            Navigation.PushAsync(new ContactUs());
        }
    }
}