using Services.Dtos;

namespace Services.Interfaces;

public interface IOrderService
{
    List<OrderDto> GetOrders();
    OrderDto GetOrder();
    List<OrderDto> GetOrdersByFilters();
    void AddOrder(string number, DateTime date);
    bool DeleteOrder(int id);
    bool UpdateOrder(int id, string number, DateTime date);

    List<OrderItemDto> GetOrderItems(int orderId);

}