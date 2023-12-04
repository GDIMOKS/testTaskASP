import React, {useState} from 'react';

const OrderItem = (props) => {
    
    const deleteButton = () => {
        if (props.removeOrderItem !== undefined)
            return (
                <div>
                    <button onClick={e=> {
                        e.preventDefault()
                        props.removeOrderItem(props.orderItem)
                    }}>Удалить</button>
                </div>
            )
    }
    return (
        <div>
            <div>
                <label>Название</label>
                <div>{props.orderItem.name}</div>
                <label>Количество</label>
                <div>{props.orderItem.quantity}</div>
                <label>Единица измерения</label>
                <div>{props.orderItem.unit}</div>

            </div>

            {
                deleteButton()
            }
        </div>
    );
};

export default OrderItem;