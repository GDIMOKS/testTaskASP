using Models;
using Services.Dtos;
using Services.Dtos.Filter;
using Services.Dtos.Order;
using Services.Dtos.OrderItem;

namespace Services.Interfaces;

public interface IOrderService
{
    List<FitOrderDto> GetOrders(FilterDto? filter);
    OrderDto? GetOrder(int id);
    List<string> GetOrderNumbers();
    
    /*List<FitOrderDto> GetOrdersByFilters(FilterDto? filter);*/
    int AddOrder(string number, DateTime date, int providerId);
    int AddOrder(string number, DateTime date, int providerId, List<OrderItemInOrderDto> orderItems);
    bool DeleteOrder(int id);
    bool UpdateOrder(int id, string number, DateTime date, int providerId);

    /*
    List<OrderItemDto> GetOrderItems(int orderId);
    */

}