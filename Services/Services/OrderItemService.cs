using DataAccess;
using Models;
using Services.Dtos;
using Services.Dtos.OrderItem;
using Services.Interfaces;

namespace Services.Services;

public class OrderItemService : IOrderItemService
{
    private OrdersDbContext _dbContext;
    
    public OrderItemService(OrdersDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<OrderItemDto> GetOrderItems()
    {
        return _dbContext.OrderItems
            .Select(o => new OrderItemDto(o))
            .ToList<OrderItemDto>();
    }

    public OrderItemDto? GetOrderItem(int id)
    {
        var orderItem = _dbContext.OrderItems.FirstOrDefault(o => o.Id == id);
        return orderItem != null ? new OrderItemDto(orderItem) : null;
    }

    public List<string> GetOrderItemNames()
    {
        return _dbContext.OrderItems
            .Select(x => x.Name)
            .Distinct()
            .ToList();
    }

    public List<string> GetOrderItemUnits()
    {
        return _dbContext.OrderItems
            .Select(x => x.Unit)
            .Distinct()
            .ToList();
    }

    public int AddOrderItem(string name, decimal quantity, string unit, int orderId, string orderNumber)
    {
        if (orderNumber == name) return -1;
        
        var orderItem = new OrderItem{Name = name, Quantity = quantity, Unit = unit, OrderId = orderId};
        var newOrderItem = _dbContext.Add(orderItem);
        _dbContext.SaveChanges();

        return newOrderItem.Entity.Id;
    }

    public bool DeleteOrderItem(int id)
    {
        var orderItem = _dbContext.OrderItems.FirstOrDefault(o => o.Id == id);

        if (orderItem == null) return false;

        _dbContext.OrderItems.Remove(orderItem);
        _dbContext.SaveChanges();
        return true;
    }

    public int UpdateOrderItem(int id, string name, decimal quantity, string unit, int orderId, string orderNumber)
    {
        if (orderNumber == name) return -1;
        
        var orderItem = _dbContext.OrderItems.FirstOrDefault(o => o.Id == id);

        if (orderItem == null) return 0;

        orderItem.Name = name;
        orderItem.Quantity = quantity;
        orderItem.Unit = unit;
        /*
        orderItem.OrderId = orderId;
        */
        
        _dbContext.SaveChanges();

        return orderItem.Id;   
    }
    
}