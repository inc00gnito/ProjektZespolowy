using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Mobile
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Payment : ContentPage
    {
        public Payment()
        {
            InitializeComponent();
        }
        private void MenuClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new Menu());
        }
        private async void ShoppingBagClicked(object sender, EventArgs e)
        {
           // SecureStorage.RemoveAll();
            var token = await SecureStorage.GetAsync("Token");
            if (token == null)
            {
                Console.WriteLine("TOKEN" +token);
                await Navigation.PushAsync(new Login());
                await DisplayAlert("You are not logged in", "Login first, and try again", "Okay", "Cancel");

            }
            else
            {
                Console.WriteLine("TOKEN" + token);
                await Navigation.PushAsync(new MyOrders());
            }
        }
    }
}