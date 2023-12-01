using Services.Dtos;
using Services.Dtos.OrderItem;

namespace Services.Interfaces;

public interface IOrderItemService
{
    List<OrderItemDto> GetOrderItems();
    OrderItemDto? GetOrderItem(int id);

    List<string> GetOrderItemNames();
    List<string> GetOrderItemUnits();

    int AddOrderItem(string name, decimal quantity, string unit, int orderId, string orderNumber);
    bool DeleteOrderItem(int id);
    int UpdateOrderItem(int id, string name, decimal quantity, string unit, int orderId, string orderNumber);
}