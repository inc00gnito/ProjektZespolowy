using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;


namespace CrossPlatformBasicLoginSystem.RestAPIClient
{
    public class RestClient<T>
    {

        private const string MainWebServiceUrl = "https://trackslance.herokuapp.com/";
        private const string LoginWebServiceUrl = MainWebServiceUrl + "api/User/LogIn";

        public async Task<bool> checkLogin(string username, string password)
        {
            var httpClient = new HttpClient();

            var response = await httpClient.GetAsync(LoginWebServiceUrl + "username=" + username + "/" + "password=" + password);

            await SecureStorage.SetAsync("Token", "someValue");

            var idToken = await SecureStorage.GetAsync("Token");
            return response.IsSuccessStatusCode;
        }
    }
}