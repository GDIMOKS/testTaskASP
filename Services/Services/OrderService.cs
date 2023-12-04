using DataAccess;
using Microsoft.EntityFrameworkCore;
using Models;
using Services.Dtos.Filter;
using Services.Dtos.Order;
using Services.Dtos.OrderItem;
using Services.Dtos.Provider;
using Services.Interfaces;

namespace Services.Services;

public class OrderService : IOrderService
{
    private OrdersDbContext _dbContext;
    
    public OrderService(OrdersDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<string> GetOrderNumbers()
    {
        return _dbContext.Orders
            .Select(x => x.Number)
            .Distinct()
            .ToList();
    }

    /*public List<FitOrderDto> GetOrders()
    {
        var orders = _dbContext.Orders
            .Include(order => order.OrderItems)
            .Select(order => new FitOrderDto(order))
            .ToList<FitOrderDto>();

        return orders;
    }*/

    public OrderDto? GetOrder(int id)
    {
        var order = _dbContext.Orders
            .Include(order => order.OrderItems)
            .FirstOrDefault(o => o.Id == id);
        
        return (order != null) ? new OrderDto(order) : null;
    }

    public List<FitOrderDto> GetOrders(FilterDto? filter)
    {
        var orders = _dbContext.Orders
            .Include(x => x.OrderItems)
            .Where(order => filter == null || (!filter.OrderBeginDate.HasValue || order.Date >= filter.OrderBeginDate) && (!filter.OrderEndDate.HasValue || order.Date <= filter.OrderEndDate))
            .Where(order => filter == null || filter.OrderNumbers == null || filter.OrderNumbers.Count == 0 || filter.OrderNumbers.Contains(order.Number))
            .Where(order => filter == null || filter.ProvidersId == null || filter.ProvidersId.Count == 0 || filter.ProvidersId.Contains(order.ProviderId))
            .Where(order => filter == null || filter.OrderItemNames == null || filter.OrderItemNames.Count == 0 || order.OrderItems.Any(orderItem => filter.OrderItemNames.Contains(orderItem.Name)))
            .Where(order => filter == null || filter.OrderItemUnits == null || filter.OrderItemUnits.Count == 0 || order.OrderItems.Any(orderItem => filter.OrderItemUnits.Contains(orderItem.Unit)))
            .Select(order => new FitOrderDto(order))
            .ToList();
        
        return orders;
    }

    public int AddOrder(string number, DateTime date, int providerId)
    {
        var order = _dbContext.Orders.FirstOrDefault(o => o.Number == number && o.ProviderId == providerId);
        if (order != null)
            return -1;
        
        order = new Order {Number = number, Date = date, ProviderId = providerId};
        var newOrder = _dbContext.Add(order);
        _dbContext.SaveChanges();
        
        return newOrder.Entity.Id;
    }

    public int AddOrder(string number, DateTime date, int providerId, List<OrderItemInOrderDto> orderItems)
    {
        if (orderItems.Any(o => o.Name == number)) return -2;

        int orderId = AddOrder(number, date, providerId);

        if (orderId == -1) return -1;
        
        _dbContext.OrderItems.AddRange(orderItems.Select(x => new OrderItem()
        {
            Name = x.Name,
            OrderId = orderId,
            Quantity = x.Quantity,
            Unit = x.Unit
        }));
        _dbContext.SaveChanges();
        return orderId;
    }

    public bool DeleteOrder(int id)
    {
        var order = _dbContext.Orders.FirstOrDefault(o => o.Id == id);

        if (order == null) return false;

        _dbContext.Orders.Remove(order);
        _dbContext.SaveChanges();

        return true;
    }

    public bool UpdateOrder(int id, string number, DateTime date, int providerId)
    {
        var order = _dbContext.Orders.FirstOrDefault(o => o.Id == id);

        if (order == null) return false;

        order.Number = number;
        order.Date = date;
        order.ProviderId = providerId;
        _dbContext.SaveChanges();

        return true;    
    }

    /*public List<OrderItemDto> GetOrderItems(int orderId)
    {
        return _dbContext.OrderItems
            .Where(o => o.OrderId == orderId)
            .Select(o => new OrderItemDto(o))
            .ToList<OrderItemDto>();
    }*/
}