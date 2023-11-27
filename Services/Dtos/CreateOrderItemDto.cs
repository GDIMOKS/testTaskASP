namespace Services.Dtos;

public class CreateOrderItemDto
{
    public string Name { get; set; }
    public decimal Quantity { get; set; }
    public string Unit { get; set; }
    
    public CreateOrderItemDto()
    {
        
    }
    public CreateOrderItemDto(string name, decimal quantity, string unit) : this()
    {
        Name = name;
        Quantity = quantity;
        Unit = unit;
    }
}