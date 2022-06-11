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
    public partial class ContactUs : ContentPage
    {
      
        public class Contact
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Message { get; set; }
        }
        private async void SendMessageClicked(object sender, EventArgs e)
        {
            HttpClient client = new HttpClient();
            var RestURL = "https://trackslance.herokuapp.com/api/contact";
            client.BaseAddress = new Uri(RestURL);
            var contact = new Contact
            {
                FirstName = firstName.Text,
                LastName = lastName.Text,
                Email = email.Text,
                Message = message.Text,
                
            };
            Console.WriteLine("\t\t TO JEST MEJL :" + contact.Email);
            Console.WriteLine("\t\t TO JEST fn:" + contact.FirstName);
            Console.WriteLine("\t\t TO JEST ln :" + contact.LastName);
            Console.WriteLine("\t\t TO JEST msg :" + contact.Message);
            var json = JsonConvert.SerializeObject(contact);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var result = await client.PostAsync(RestURL, content);
            result.EnsureSuccessStatusCode();
            Console.WriteLine(result);
            var resultString = await result.Content.ReadAsStringAsync();
            var post = JsonConvert.DeserializeObject<Contact>(resultString);
        }
        public ContactUs()
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