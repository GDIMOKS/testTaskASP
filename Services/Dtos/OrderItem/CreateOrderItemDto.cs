namespace Services.Dtos.OrderItem;

public class CreateOrderItemDto : OrderItemInOrderDto
{
    public int OrderId { get; set; }
    
    public CreateOrderItemDto() : base()
    {
        
    }
    public CreateOrderItemDto(string name, decimal quantity, string unit, int orderId) : base(name, quantity, unit)
    {
        OrderId = orderId;
    }
}