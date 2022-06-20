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
    public partial class Menu : ContentPage
    {
       
        public Menu()
        {
            InitializeComponent();
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
                SecureStorage.RemoveAll();
                await DisplayAlert("You are successful logout", "dsadsadsada", "Okay", "Cancel");
                await Navigation.PushAsync(new MyOrders());
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
                await DisplayAlert("You are not login", "Login first, and try again", "Okay", "Cancel");
            }
            else
            {
                Console.WriteLine("TOKEN" + token);
                await Navigation.PushAsync(new MyOrders());
            }
        }
        private async void LoginButton(object sender, EventArgs e)
        {
            
            var token = await SecureStorage.GetAsync("Token");
            if (token == null)
            {
               LoginOrLogoutButton.Text = "Login";
            }
            else
            {
                
               LoginOrLogoutButton.Text = "Logout";
            }
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