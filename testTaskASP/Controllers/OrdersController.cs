using Microsoft.AspNetCore.Mvc;
using Services.Dtos;
using Services.Dtos.Filter;
using Services.Dtos.Order;
using Services.Interfaces;

namespace testTaskASP.Controllers;

[Route("api/[controller]/")]
[ApiController]
public class OrdersController : ControllerBase
{
    private IOrderService _orderService;

    public OrdersController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpPost("List")]
    public IEnumerable<FitOrderDto> GetOrders([FromBody]FilterDto? filterDto)
    {
        return _orderService.GetOrders(filterDto);
    }


    [HttpGet("{id}")]
    public IActionResult GetOrder([FromRoute]int id)
    {
        var order = _orderService.GetOrder(id);
        return (order != null) ? Ok(order) : NotFound();
    }
    
    [HttpGet("Numbers")]
    public IEnumerable<string> GetOrderNumbers()
    {
        return _orderService.GetOrderNumbers();
    }


    [HttpPost]
    public IActionResult AddOrder([FromBody]CreateOrderDto dto)
    {
        int orderId = _orderService.AddOrder(dto.Number, dto.Date, dto.ProviderId, dto.OrderItems);

        switch (orderId)
        {
            case -1:
                return BadRequest("Не должно существовать двух заказов от одного поставщика с одинаковыми номерами!");
            
            case -2:
                return BadRequest("Имя элемента заказа не может быть равным номеру заказа!");
            
            default:
                return Ok(orderId);

        }
    }

    [HttpDelete("{id}")]
    public void DeleteOrder([FromRoute]int id)
    {
        _orderService.DeleteOrder(id);
    }
    
    [HttpPut("{id}")]
    public void UpdateOrder([FromRoute]int id, [FromBody]CreateOrderDto dto)
    {
        _orderService.UpdateOrder(id, dto.Number, dto.Date, dto.ProviderId);
    }
}