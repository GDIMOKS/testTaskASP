import React, {useState} from 'react';
import StylesOI from './OrderItem.module.scss'

const OrderItem = (props) => {
    
    const deleteButton = () => {
        if (props.removeOrderItem !== undefined)
            return (
                <div>
                    <button className={StylesOI.button}  onClick={e=> {
                        e.preventDefault()
                        props.removeOrderItem(props.orderItem)
                    }}>Удалить</button>
                </div>
            )
    }
    
    const getStyle = () => {
        if (props.removeOrderItem !== undefined)
            return StylesOI.orderItemInfo;
        else
            return  StylesOI.orderItemInfoSecond
    }
    return (
        <div className={StylesOI.orderItemInfoAndButton}>
            <div className={getStyle()}>
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