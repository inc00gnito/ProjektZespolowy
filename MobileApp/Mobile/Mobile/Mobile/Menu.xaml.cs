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
    public partial class Menu : ContentPage
    {
        public Menu()
        {
            InitializeComponent();
        }
        private void AboutUsClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
           
           
            Navigation.PushAsync(new AboutUs());
        }
        private void TracksClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
           
            Navigation.PushAsync(new Tracks());
        }
        private void MyOrdersClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
           
            Navigation.PushAsync(new MyOrders());
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
        private void TestowankoClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;

            Navigation.PushAsync(new Testowy());
        }
    }
}