namespace Services.Dtos;

public class CreateOrderDto
{
    public string Number { get; set; }
    public DateTime Date { get; set; }

    public CreateOrderDto()
    {
        
    }
    public CreateOrderDto(string number, DateTime date) : this()
    {
        Number = number;
        Date = date;
    }
}