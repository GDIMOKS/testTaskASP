using Services.Dtos.OrderItem;

namespace Services.Dtos.Order;

public class OrderDto : CreateOrderDto
{
    public int Id { get; set; }

    public new List<OrderItemDto> OrderItems { get; set; }

    
    public OrderDto() : base()
    {
        OrderItems = new List<OrderItemDto>();
    }
    public OrderDto(int id, string number, DateTime date, int providerId, List<OrderItemDto> orderItems) : base(number, date, providerId)
    {
        Id = id;
        OrderItems = orderItems;
    }

    public OrderDto(Models.Order order) 
        : this(order.Id, order.Number, order.Date, order.ProviderId, 
            order.OrderItems.Select(x => new OrderItemDto(x)).ToList<OrderItemDto>())
    {
        
    }
}