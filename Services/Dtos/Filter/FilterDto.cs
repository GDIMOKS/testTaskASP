using Services.Dtos.Provider;

namespace Services.Dtos.Filter;

public class FilterDto
{
    public List<string>? OrderNumbers { get; set; } 
    public DateTime? OrderBeginDate { get; set; }
    public DateTime? OrderEndDate { get; set; }
    public List<int>? ProvidersId { get; set; }
    public List<string>? OrderItemNames { get; set; }
    public List<string>? OrderItemUnits { get; set; }
}