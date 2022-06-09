using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Mobile
{
    public partial class MainPage : ContentPage
    {
        public class Newsletter
        {
            public string Email { get; set; }
        }
        private async void SubmitClicked(object sender, EventArgs e)
        {
            HttpClient client = new HttpClient();
            var RestURL = "https://trackslance.herokuapp.com/api/Newsletter";
            client.BaseAddress = new Uri(RestURL);
            var email = new Newsletter
            {
                Email = Email.Text
            };
            Console.WriteLine("\t\t TO JEST MEJL :" + email.Email);
            var json = JsonConvert.SerializeObject(email);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var result = await client.PostAsync(RestURL, content);
            result.EnsureSuccessStatusCode();
            Console.WriteLine(result);
            var resultString = await result.Content.ReadAsStringAsync();
            var post = JsonConvert.DeserializeObject<Newsletter>(resultString);
        }
        public MainPage()
        {
            InitializeComponent();
        }
        private void MenuClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new Menu());
        }
        private void ShoppingBagClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new MyOrders());
        }
    }
}
