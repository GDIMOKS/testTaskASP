using DataAccess;
using Models;
using Services.Dtos;
using Services.Dtos.Provider;
using Services.Interfaces;

namespace Services.Services;

public class ProviderService : IProviderService
{
    private OrdersDbContext _dbContext;
    
    public ProviderService(OrdersDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public List<ProviderDto> GetProviders()
    {
        return _dbContext.Providers
            .Select(p => new ProviderDto(p))
            .ToList<ProviderDto>();
    }

    public ProviderDto? GetProvider(int id)
    {
        var provider = _dbContext.Providers.FirstOrDefault(p => p.Id == id);
        return (provider != null) ? new ProviderDto(provider) : null;
    }

    public void AddProvider(string name)
    {
        var provider = new Provider() {Name = name};
        _dbContext.Add(provider);
        _dbContext.SaveChanges();
    }

    public bool DeleteProvider(int id)
    {
        var provider = _dbContext.Providers.FirstOrDefault(p => p.Id == id);
        
        if (provider == null) return false;
        
        _dbContext.Providers.Remove(provider);
        _dbContext.SaveChanges();
        return true;

    }

    public bool UpdateProvider(int id, string name)
    {
        var provider = _dbContext.Providers.FirstOrDefault(p => p.Id == id);
        
        if (provider == null) return false;

        provider.Name = name;
        _dbContext.SaveChanges();
        
        return true;

    }
}