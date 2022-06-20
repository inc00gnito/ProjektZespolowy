using CrossPlatformBasicLoginSystem.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using Xamarin.Essentials;
using Xamarin.Forms;


namespace Mobile
{
    public partial class MyOrders : ContentPage
    {
      

        public MyOrders()
        {
            InitializeComponent();
            
        }
        private void MenuClicked(object sender, EventArgs e)
        {
            Navigation.PushAsync(new Menu());
        }
        private async void ShoppingBagClicked(object sender, EventArgs e)
        {
            
            var token = await SecureStorage.GetAsync("Token");
            if(token == null)
            {
                await DisplayAlert("You are not login", "Login first, and try again", "Okay", "Cancel");
            }
            else
            { 
                Navigation.PushAsync(new MyOrders());
            }
        }

    }
}