namespace ProjectAPI.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public int? TrackId { get; set; }
        public int? OrderedTrackId { get; set; }
    }
}
