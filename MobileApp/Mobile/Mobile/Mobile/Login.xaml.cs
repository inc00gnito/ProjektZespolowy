using CrossPlatformBasicLoginSystem.ServicesHandler;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Mobile
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Login : ContentPage
    {
        public Login()
        {
            InitializeComponent();
        }
        private void MenuClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new Menu());
        }
        public class LogInModel
        {
            public string Login { get; set; }
            public string Password { get; set; }
            public string Token { get; set; }

        }

        private async void SignInClicked(object sender, EventArgs e)
        {
            
            LoginService services = new LoginService();
            var getLoginDetails = await services.CheckLoginIfExists(UserLogin.Text, Password.Text);

            if (getLoginDetails)
            {
                Navigation.PushAsync(new MainPage());
                await DisplayAlert("Login success", "You are login", "Okay", "Cancel");
            }
            else
            {
                await DisplayAlert("Login failed", "Username or Password is incorrect or not exists", "Okay", "Cancel");
            }
        }
        private void SignUpClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new SignUp());
        }
        private void ForgotPasswordClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new ForgotPassword());
        }
        private void ShoppingBagClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new MyOrders());
        }
    }
}