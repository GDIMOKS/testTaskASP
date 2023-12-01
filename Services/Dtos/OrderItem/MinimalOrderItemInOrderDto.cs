namespace Services.Dtos.OrderItem;

public class MinimalOrderItemInOrderDto
{
    public string Name { get; set; }
    public MinimalOrderItemInOrderDto()
    {
        
    }
    public MinimalOrderItemInOrderDto(string name) : this()
    {
        Name = name;
    }
}