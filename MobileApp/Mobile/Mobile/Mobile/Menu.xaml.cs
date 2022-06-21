using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
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
            
            if (SecureStorage.GetAsync("Token").Result != null)
                LogIn.Text = "Log Out";
            else
                LogIn.Text = "Log In";
        }
        private void MenuClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new Menu());
        }
        private async void LoginClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            var token = await SecureStorage.GetAsync("Token");
            if (token == null)
            {
                await Navigation.PushAsync(new Login());
            }
            else
            {
                LogOut(token);
                await DisplayAlert("You have successfully logged out", "", "Okay", "Cancel");
                await Navigation.PushAsync(new MainPage());
            }


        }
        private void AboutUsClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;


            Navigation.PushAsync(new AboutUs());
        }
        private void TracksClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;

            Navigation.PushAsync(new MainTrackPage());
        }
        private async void MyOrdersClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            var token = await SecureStorage.GetAsync("Token");
            if (token == null)
            {
                Console.WriteLine("TOKEN" + token);
                await Navigation.PushAsync(new Login());
                await DisplayAlert("You are not logged in", "Login first, and try again", "Okay", "Cancel");
            }
            else
            {
                Console.WriteLine("TOKEN" + token);
                await Navigation.PushAsync(new MyOrders());
            }
        }
        public class LogOutModel
        {

            public string authorization { get; set; }
            
        }

        public async void LogOut(string token)
        {

            var RestURL = "https://trackslance.herokuapp.com/api/User/LogOut/";
            var httpClient = new HttpClient();
            httpClient.BaseAddress = new Uri(RestURL);
            Console.WriteLine(token);

            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(token);

            var response = await httpClient.GetAsync(RestURL);
            Console.WriteLine(response);

            var res = await response.Content.ReadAsStringAsync();

            SecureStorage.Remove("Token");
            //SecureStorage.RemoveAll();
        }
       

        private void OnSaleClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;

            Navigation.PushAsync(new OnSale());
        }
        private void ContactUsClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;

            Navigation.PushAsync(new ContactUs());
        }
        private void PaymentClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            Navigation.PushAsync(new Payment());

        }
        private void SettingsClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            Navigation.PushAsync(new Settings());

        }
        private void TestowankoClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;

            Navigation.PushAsync(new Testowy());
        }
        private async void ShoppingBagClicked(object sender, EventArgs e)
        {

            var token = await SecureStorage.GetAsync("Token");
            if (token == null)
            {
                Console.WriteLine("TOKEN" + token);
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