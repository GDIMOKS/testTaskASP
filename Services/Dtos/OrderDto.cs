namespace Services.Dtos;

public class OrderDto : CreateOrderDto
{
    public int Id { get; set; }
    
    public OrderDto(int id, string number, DateTime date) : base(number, date)
    {
        Id = id;
    }
    
}