namespace ProjectAPI.Models
{
    public class Author
    {
        public int Id { get; set; }
        
        #nullable enable
        public string? FirstName { get; set; }
        public string? LastName{ get; set; }
        public string? StageName { get; set; }
    }
}
