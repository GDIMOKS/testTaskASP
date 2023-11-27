using DataAccess;
using Services.Interfaces;

namespace Services.Services;

public class OrderItemService : IOrderItemService
{
    private OrdersDbContext _dbContext;
    
    public OrderItemService(OrdersDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    
}