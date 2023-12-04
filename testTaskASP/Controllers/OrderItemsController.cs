using Microsoft.AspNetCore.Mvc;
using Services.Dtos;
using Services.Dtos.OrderItem;
using Services.Interfaces;

namespace testTaskASP.Controllers;

[Route("api/[controller]/")]
[ApiController]
public class OrderItemsController : ControllerBase
{
    private IOrderItemService _orderItemService;

    public OrderItemsController(IOrderItemService orderItemService)
    {
        _orderItemService = orderItemService;
    }

    [HttpGet]
    public IEnumerable<OrderItemDto> GetOrderItems()
    {
        return _orderItemService.GetOrderItems();
    }

    [HttpGet("{id}")]
    public IActionResult GetOrderItem([FromRoute] int id)
    {
        var orderItem = _orderItemService.GetOrderItem(id);
        return (orderItem != null) ? Ok(orderItem) : NotFound();
    }
    
    [HttpGet("Names")]
    public IEnumerable<string> GetOrderItemNames()
    {
        return _orderItemService.GetOrderItemNames();
    }
    [HttpGet("Units")]
    public IEnumerable<string> GetOrderItemUnits()
    {
        return _orderItemService.GetOrderItemUnits();
    }
    
    [HttpPost]
    public IActionResult AddOrderItem([FromBody]CreateOrderItemDto dto/*,string orderNumber*/)
    {
        var result = _orderItemService.AddOrderItem(dto.Name, dto.Quantity, dto.Unit, dto.OrderId/*, orderNumber*/);
        if (result == -1)
            return BadRequest("Имя элемента заказа не может быть равным номеру заказа!");
        
        return Ok(result);
    }

    [HttpDelete("{id}")]
    public void DeleteOrderItem([FromRoute]int id)
    {
        _orderItemService.DeleteOrderItem(id);
    }
    
    [HttpPut("{id}")]
    public IActionResult UpdateOrderItem([FromRoute]int id, [FromBody]CreateOrderItemDto dto/*, string orderNumber*/)
    {
        var result = _orderItemService.UpdateOrderItem(id, dto.Name, dto.Quantity, dto.Unit, dto.OrderId/*, orderNumber*/);

        switch (result)
        {
            case -1:
                return BadRequest("Имя элемента заказа не может быть равным номеру заказа!");
            case 0:
                return BadRequest("Данного элемента заказа не существует!");
            default:
                return Ok(result);
        }
    }
}