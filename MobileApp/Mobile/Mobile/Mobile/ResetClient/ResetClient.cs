using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Essentials;
using Newtonsoft.Json;
using CrossPlatformBasicLoginSystem.Models;


namespace CrossPlatformBasicLoginSystem.RestAPIClient
{
    public class LogInModel
    {
        public string Login { get; set; }
        public string Password { get; set; }

    }
    public class RestClient<T>
    {

        private const string MainWebServiceUrl = "https://trackslance.herokuapp.com/";
        private const string LoginWebServiceUrl = MainWebServiceUrl + "api/User/LogIn";

        public async Task<bool> checkLogin(string username, string password)
        {
            var httpClient = new HttpClient();
            LogInModel login = new LogInModel()
            {
                Login = username,
                Password = password
            };
            var loginSerialized = JsonConvert.SerializeObject(login);
            HttpContent c = new StringContent(loginSerialized, Encoding.UTF8, "application/json");

            var response = await httpClient.PostAsync(LoginWebServiceUrl,c);
            var res = await response.Content.ReadAsStringAsync();
            var model = JsonConvert.DeserializeObject<UserDetailCredentials>(res);
            await SecureStorage.SetAsync("Token", model.Token);
            
            return response.IsSuccessStatusCode;
            
        }
    }
}