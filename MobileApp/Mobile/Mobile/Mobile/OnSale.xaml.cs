using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace Mobile
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class OnSale : ContentPage
    {
        public OnSale()
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