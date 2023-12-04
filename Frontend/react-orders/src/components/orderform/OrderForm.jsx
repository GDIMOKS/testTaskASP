import React, {useEffect, useState} from 'react';
import Select from "../select/Select";
import {getObjects} from "../../libraries/functions";
import Input from "../UI/input/Input";
import OrderItemsList from "../orderitemlist/OrderItemsList";
import OrderItemForm from "../orderitemform/OrderItemForm";
import StylesOF from "./OrderForm.module.scss";

const OrderForm = ({formType, baseUrl, ...props}) => {
    const [allProviders, setAllProviders] = useState([]);
    
    const [order, setOrder] = useState({
        id: '',
        number: '',
        date: '',
        providerId: '',
        orderItems: []
    })
    const getOrder = (baseUrl, destination) => {
        getObjects(baseUrl, destination).then(r => setOrder(r))
    }
    const checkValues = (_orderItem) => {
        return !(_orderItem.name === '' || _orderItem.quantity === '' || _orderItem.unit === '');
    }
    const checkOrderValues = (_order) => {
        return !(_order.number === '' || _order.date === '' || _order.providerId === '');
    }
    const addOrderItemToExistOrder = async (newOrderItem) => {
        if (!checkValues(newOrderItem)) 
            return
        
        newOrderItem.orderId = order.id
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrderItem)
        }

        const result = await fetch(baseUrl + "orderItems", options)

        if (result.ok) {
            return result.json()
        }
    }

    const removeOrderItemFromExistOrder = async (orderItemId) => {
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderItemId)
        }

        const result = await fetch(baseUrl + "orderItems\\" + orderItemId, options)

        if (result.ok) {
            
        }
    }
    const addNewOrderItem = (newOrderItem) => {
        if (newOrderItem.name === order.number)
        {
            console.log("Номер заказа и имя элемента не должны совпадать!")
            return
        }

        if (checkValues(newOrderItem)) {
            if (formType === 'edit') {
                addOrderItemToExistOrder(newOrderItem).then(r =>  setOrder({...order, orderItems: [...order.orderItems, {
                        id: r,
                        orderId: newOrderItem.orderId,
                        quantity: newOrderItem.quantity,
                        unit: newOrderItem.unit,
                        name: newOrderItem.unit}
                    ]
                }))
            } else {
                setOrder({...order, orderItems: [...order.orderItems, newOrderItem]})
            }
        } else {
            console.log("Поля элемента заказа не должны быть пустыми!")
        }
        
    }

    const editOrder = async (e) => {
        e.preventDefault()
        console.log(order)

        if (!checkOrderValues(order)) {
            console.log("Поля заказа должны быть заполнены!")
            return
        }

        const options = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }
        const result = await fetch(baseUrl + "orders\\" +order.id, options)

        if (result.ok) {
            console.log("Заказ успешно обновлен!")
        }
    }
    const addNewOrder = async (e) => {
        e.preventDefault()
        console.log(order)
        if (!checkOrderValues(order)) {
            console.log("Поля заказа должны быть заполнены!")
            return
        }
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }

        const result = await fetch(baseUrl + "orders", options)

        if (result.ok) {
            return result.json()
        }
    }
    
    const removeOrderItem = (orderItem) => {
        let items;
        if (formType === 'edit') {
            removeOrderItemFromExistOrder(orderItem.id)
            items = order.orderItems.filter(n => n.id !== orderItem.id);
        } else {
            items = order.orderItems.filter(n => n.name !== orderItem.name);
        }
        setOrder({...order, orderItems: items})

    }

    useEffect(() => {
        getObjects(baseUrl, "providers").then(r => setAllProviders(r))
        if (formType === 'edit')
            getOrder(baseUrl, "orders\\" + props.orderId)
    }, []);

    const getButton = () => {
        if (formType === 'edit')
            return <button className="button" onClick={e => {editOrder(e)}}>Сохранить изменения в заказе</button>

        else
            return <button className="button" onClick={e => {addNewOrder(e).then(value => {console.log(value)})}}>Создать заказ с добавленными элементами</button>

    }
    
    return (
        <form>
            <div className={StylesOF.orderInfo}>
                <Input
                    className={StylesOF.orderName}
                    value={order.number}
                    onChange={e => setOrder({...order, number: e.target.value})}
                    type={"text"}
                    placeholder={"Название заказа"}/>
                
                <div className={StylesOF.dateAndProvider}>
                    <div className={StylesOF.date}>
                        <label>Выберите дату</label>
                            <Input
                                value={order.date}
                                onChange={e => setOrder({...order, date: e.target.value})}
                                type={"datetime-local"}/>
                    </div>
                    <Select
                        type={false}
                        labelText = {'Провайдер'}
                        options={allProviders}
                        value={order.providerId}
                        onChange={(target) =>
                        {
                            setOrder({...order, providerId: target.value})
                        }} />
                </div>

                {
                    getButton()
                }
            </div>
            
            <OrderItemForm
                addNewOrderItem={addNewOrderItem}
            />
            
            <OrderItemsList
                orderItems={order.orderItems}
                title={"Элементы заказа"}
                removeOrderItem={removeOrderItem}
            />
        </form>
    );
};

export default OrderForm;