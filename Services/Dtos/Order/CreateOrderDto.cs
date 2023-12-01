using Services.Dtos.OrderItem;

namespace Services.Dtos.Order;

public class CreateOrderDto
{
    public string Number { get; set; }
    public DateTime Date { get; set; }
    public int ProviderId { get; set; }
    public List<OrderItemInOrderDto> OrderItems { get; set; } = new();
    public CreateOrderDto()
    {
        
    }
    public CreateOrderDto(string number, DateTime date, int providerId) : this()
    {
        Number = number;
        Date = date;
        ProviderId = providerId;
    }
    public CreateOrderDto(string number, DateTime date, int providerId, List<OrderItemInOrderDto> orderItems) 
        : this(number, date, providerId)
    {
        OrderItems = orderItems;
    }
}