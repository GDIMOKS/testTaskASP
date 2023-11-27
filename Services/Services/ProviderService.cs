using DataAccess;
using Services.Interfaces;

namespace Services.Services;

public class ProviderService : IProviderService
{
    private OrdersDbContext _dbContext;
    
    public ProviderService(OrdersDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    
}