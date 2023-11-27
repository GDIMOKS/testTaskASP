namespace Services.Dtos;

public class OrderItemDto : CreateOrderItemDto
{
    public int Id { get; set; }
    
    public OrderItemDto(int id, string name, decimal quantity, string unit) : base(name, quantity, unit)
    {
        Id = id;
    }
}