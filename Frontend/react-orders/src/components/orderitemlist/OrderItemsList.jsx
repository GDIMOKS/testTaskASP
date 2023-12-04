import React from 'react';
import OrderItem from "../orderitem/OrderItem";

const OrderItemsList = ({orderItems, title, ...props}) => {
    return (
        <div>
            <h1>
                {title}
            </h1>
            {
                orderItems.map((orderItem, index) =>
                    <OrderItem
                        orderItem={orderItem}
                        key={(orderItem.id !== undefined) ? orderItem.id : index}
                        removeOrderItem={props.removeOrderItem}
                    />
                )
            }
        </div>
    );
};

export default OrderItemsList;