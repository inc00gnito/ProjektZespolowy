using System;
using System.Collections.Generic;
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

    }
}