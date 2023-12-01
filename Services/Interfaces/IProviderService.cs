using Services.Dtos;
using Services.Dtos.Provider;

namespace Services.Interfaces;

public interface IProviderService
{
    List<ProviderDto> GetProviders();
    ProviderDto? GetProvider(int id);
    void AddProvider(string name);
    bool DeleteProvider(int id);
    bool UpdateProvider(int id, string name);
}