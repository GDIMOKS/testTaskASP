using System.ComponentModel;

namespace Models;

[DisplayName("Provider")]
public class Provider
{
    public int Id { get; set; }
    public string Name { get; set; }

    public List<Order>? Orders;
}