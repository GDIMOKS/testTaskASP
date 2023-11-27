using DataAccess;
using Services.Interfaces;

namespace Services.Services;

public class OrderService : IOrderService
{
    private OrdersDbContext _dbContext;
    
    public OrderService(OrdersDbContext dbContext)
    {
        _dbContext = dbContext;
    }
}