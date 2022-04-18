using System;
using System.Collections.Generic;
using Xamarin.Forms;

namespace Mobile
{
    public partial class Tracks : ContentPage
    {
        List<string> Items1 = new List<string>();
        List<string> Items2 = new List<string>();
        bool IsItem1 = true;

        public Tracks()
        {
            InitializeComponent();

            

            Items1.Add("Hip-Hop");
            Items1.Add("Pop");
            Items1.Add("RNB");

            Items2.Add("Price");
            Items2.Add("Genre");
            Items2.Add("Newest");
            Items2.Add("Relevance");



            dropdown.ItemsSource = Items1;
            dropdown.SelectedIndex = 1;
            dropdown.ItemSelected += OnDropdownSelected;

            dropdown2.ItemsSource = Items2;
            dropdown2.SelectedIndex = 1;
            dropdown2.ItemSelected += OnDropdownSelected;
        }

        private void OnDropdownSelected(object sender, ItemSelectedEventArgs e)
        {
            //label.Text = IsItem1 ? Items1[e.SelectedIndex] : Items2[e.SelectedIndex];
        }
        private void ProceedCheckoutClicked(object sender, EventArgs e)
        {
            Button btn = (Button)sender;
            Navigation.PushAsync(new CartPage());
        }
        private void btn_Clicked(object sender, EventArgs e)
        {
            //dropdown.ItemsSource = IsItem1 ? Items2 : Items1;
            //dropdown.SelectedIndex = IsItem1 ? 5 : 1;
            //IsItem1 = !IsItem1;
        }
    }
}