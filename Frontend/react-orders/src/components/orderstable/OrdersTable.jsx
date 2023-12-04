import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import StylesOT from './OrdersTable.module.scss'
const OrdersTable = (props) => {
    return (
        <div className={StylesOT.allOrders}>
            {props.orders.map((order) => {
                return <Link className={StylesOT.order} to={'/order?'+order.id} key={order.id} value={order.id}>Заказ: {order.number} 
                    <div>Элементы заказа:</div>
                    
                    {order.orderItems.map((orderItem, index) => {
                        return <div key={index}>{orderItem.name}</div>
                    })}
                </Link>
            })}
        </div>
    );
};

export default OrdersTable;