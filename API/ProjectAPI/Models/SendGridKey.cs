namespace ProjectAPI.Models
{
    public class SendGridKey
    {
        public string API { get; set; }
        public SendGridKey(string api)
        {
            API = api;
        }
    }
}
