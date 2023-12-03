import React, {useEffect, useState} from 'react';

const OrdersTable = (props) => {
    const [orders, setOrders] = useState([]);
    const getOrders = async () => {
        let request = {
            orderNumbers: null,
            orderBeginDate: null,
            orderEndDate: null,
            providersId: null,
            orderItemNames:  null,
            orderItemUnits:  null
        };
        if (props.request) {
            request = props.request;
        }
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'  
            },
            body: JSON.stringify(request)
        }
        const result = await fetch(props.baseUrl + "orders/list", options)
        if (result.ok) {
            const _orders = await result.json();
            setOrders(_orders);
            return _orders;
        }
    }
    
    useEffect(() => {
        getOrders();
    }, [props.request]);
    
    return (
        <div>
            {orders.map((order) => {
                return <div key={order.id} value={order.id}>{order.number} 
                    {order.orderItems.map((orderItem, index) => {
                        return <div key={index}>{orderItem.name}</div>
                    })}
                </div>
            })}
        </div>
    );
};

export default OrdersTable;