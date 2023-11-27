namespace Services.Dtos;

public class CreateProviderDto
{
    public string Name { get; set; }
    
    public CreateProviderDto()
    {
        
    }
    public CreateProviderDto(string name) : this()
    {
        Name = name;
    }
}