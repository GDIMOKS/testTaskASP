namespace Services.Dtos.Provider;

public class ProviderDto : CreateProviderDto
{
    public int Id { get; set; }
    
    public ProviderDto() : base()
    {
        
    }
    
    public ProviderDto(int id, string name) : base(name)
    {
        Id = id;
    }

    public ProviderDto(Models.Provider provider) : this(provider.Id, provider.Name)
    {
        
    }
}