namespace Services.Dtos.OrderItem;

public class OrderItemInOrderDto : MinimalOrderItemInOrderDto
{
    public decimal Quantity { get; set; }
    public string Unit { get; set; }
    public OrderItemInOrderDto()
    {
        
    }
    public OrderItemInOrderDto(string name, decimal quantity, string unit) : base(name)
    {
        Quantity = quantity;
        Unit = unit;
    }
}