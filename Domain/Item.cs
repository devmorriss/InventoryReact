namespace Domain
{
    public class Item
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
        public double Price { get; set; }
        public DateTime DateCreated { get; set; }
    }
}