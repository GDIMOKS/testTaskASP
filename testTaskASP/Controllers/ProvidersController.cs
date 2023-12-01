using Microsoft.AspNetCore.Mvc;
using Services.Dtos;
using Services.Dtos.Provider;
using Services.Interfaces;

namespace testTaskASP.Controllers;

[Route("api/[controller]/")]
[ApiController]
public class ProvidersController : ControllerBase
{
    private IProviderService _providerService;

    public ProvidersController(IProviderService providerService)
    {
        _providerService = providerService;
    }
    
    [HttpGet]
    public IEnumerable<ProviderDto> GetProviders()
    {
        return _providerService.GetProviders();
    }

    [HttpGet("{id}")]
    public IActionResult GetProvider([FromRoute] int id)
    {
        var provider = _providerService.GetProvider(id);
        return (provider != null) ? Ok(provider) : NotFound();
    }

    /*[HttpPost]
    public void AddProvider([FromBody]CreateProviderDto dto)
    {
        _providerService.AddProvider(dto.Name);
    }

    [HttpDelete("{id}")]
    public void DeleteProvider([FromRoute]int id)
    {
        _providerService.DeleteProvider(id);
    }
    
    [HttpPut("{id}")]
    public void UpdateProvider([FromRoute]int id, [FromBody]CreateProviderDto dto)
    {
        _providerService.UpdateProvider(id, dto.Name);
    }*/
}