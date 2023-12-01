using Services.Dtos.OrderItem;

namespace Services.Dtos.Order;

public class FitOrderDto : CreateOrderDto
{
    public int Id { get; set; }

    public new List<MinimalOrderItemInOrderDto> OrderItems { get; set; }

    
    public FitOrderDto() : base()
    {
        OrderItems = new List<MinimalOrderItemInOrderDto>();
    }
    public FitOrderDto(int id, string number, DateTime date, int providerId, List<Models.OrderItem>? orderItems) : base(number, date, providerId)
    {
        Id = id;
        if (orderItems != null)
            OrderItems = orderItems.Select(x => new MinimalOrderItemInOrderDto(x.Name))
                .ToList<MinimalOrderItemInOrderDto>();
    }

    public FitOrderDto(Models.Order order) 
        : this(order.Id, order.Number, order.Date, order.ProviderId, 
            order.OrderItems!)
    {
        
    }
}