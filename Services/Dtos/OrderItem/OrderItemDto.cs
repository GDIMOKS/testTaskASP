namespace Services.Dtos.OrderItem;

public class OrderItemDto : CreateOrderItemDto
{
    public int Id { get; set; }
    
    public OrderItemDto() : base()
    {
        
    }
    
    public OrderItemDto(int id, string name, decimal quantity, string unit, int orderId) : base(name, quantity, unit, orderId)
    {
        Id = id;
    }

    public OrderItemDto(Models.OrderItem orderItem) : this(orderItem.Id, orderItem.Name, orderItem.Quantity, orderItem.Unit, orderItem.OrderId)
    {
        
    }
}