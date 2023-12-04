import React, {useState} from 'react';
import Input from "../UI/input/Input";
import StylesOIF from "./OrderItemForm.module.scss"

const OrderItemForm = (props) => {
    const [orderItem, setOrderItem] = useState({
        name: '',
        quantity: 0,
        unit:''
    })
    
    return (
        <div className={StylesOIF.inputsList}>
            <Input
                required
                value={orderItem.name}
                onChange={e => setOrderItem({...orderItem, name: e.target.value})}
                type={"text"}
                placeholder={"Название элемента заказа"}/>
            <Input
                required
                value={orderItem.quantity}
                onChange={e =>  {
                    if (e.target.value < 0)
                        e.target.value = 0
                    setOrderItem({...orderItem, quantity: e.target.value})
                }}
                type={"number"}
                placeholder={"Количество"}/>
            <Input
                required
                value={orderItem.unit}
                onChange={e => setOrderItem({...orderItem, unit: e.target.value})}
                type={"text"}
                placeholder={"Единица измерения"}/>
            <Input type='submit' onClick={e => {
                e.preventDefault()
                props.addNewOrderItem(orderItem)
            }} value='Добавить'/>

        </div>
    );
};

export default OrderItemForm;