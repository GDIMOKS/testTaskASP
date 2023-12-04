import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
const OrdersTable = (props) => {
    return (
        <div>
            {props.orders.map((order) => {
                return <Link to={'/order?'+order.id} key={order.id} value={order.id}>Заказ: {order.number} 
                    <div>Элементы заказа:</div>
                    
                    {order.orderItems.map((orderItem, index) => {
                        return <div key={index}>{orderItem.name}</div>
                    })}
                    <hr/>
                </Link>
            })}
        </div>
    );
};

export default OrdersTable;