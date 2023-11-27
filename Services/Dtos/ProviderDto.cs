namespace Services.Dtos;

public class ProviderDto : CreateProviderDto
{
    public int Id { get; set; }
    
    public ProviderDto(int id, string name) : base(name)
    {
        Id = id;
    }
}