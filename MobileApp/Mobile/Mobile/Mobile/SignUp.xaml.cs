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
    public partial class SignUp : ContentPage
    {
        public SignUp()
        {
            InitializeComponent();
        }
        private void SignInClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new Login());
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
                await DisplayAlert("You are not login", "Login first, and try again", "Okay", "Cancel");
            }
            else
            {
                Console.WriteLine("TOKEN" + token);
                await Navigation.PushAsync(new MyOrders());
            }
        }
    }
}