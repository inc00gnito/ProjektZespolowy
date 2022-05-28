using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Mobile
{
    public partial class MainPage : ContentPage
    {
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
