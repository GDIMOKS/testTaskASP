import React, {useEffect, useState} from 'react';
import OrderItemForm from "./orderitemform/OrderItemForm";
import OrderItemsList from "./orderitemlist/OrderItemsList";
import {Link, useLocation} from "react-router-dom";
import {apiUrl, getObjects} from "../libraries/functions";


const OrderPage = () => {
    const baseUrl = apiUrl;
    const [order, setOrder] = useState({
        id: '',
        number: '',
        date: '',
        providerId: '',
        providerName: '',
        orderItems: []
    })
    const getOrder = async (baseUrl, destination) => {
        const options = {
            method: 'GET'
        }

        const result = await fetch(baseUrl + destination, options);
        if (result.ok) {

            return result.json()
            
        }
        return []
    }

    
    const state = useLocation()
    const orderId = state.search.substring(1)
    const removeOrder = async () => {
        const options = {
            method: "DELETE"
        }
        
        const result = await fetch(baseUrl + "orders\\"+orderId, options)
        if (result.ok) {
            console.log("Заказ " + orderId + " успешно удален!")
            setTimeout(window.location.href = "\\" ,2000)
            return result.json()

        }
        return []
    }
    useEffect(() => {
        getOrder(baseUrl, "orders\\" + orderId).then(async r => {
            const options = {
                method: 'GET'
            }
            const provider = await fetch(baseUrl + "providers\\" + r.providerId, options)
            provider.json().then(providerName => {
                setOrder({
                    number: r.number,
                    date: r.date,
                    providerName: providerName.name,
                    providerId: r.providerId,
                    orderItems: r.orderItems
                })
            })
            
        })
    }, []);
    return (
        <div>
            <Link to="/">На главную</Link>
            <div className="orderInfo">
                <label>Номер заказа</label>
                <div> {order.number}</div>
                
                <label>Дата</label>
                <div>{order.date}</div>

                <label>Провайдер</label>
                <div>{order.providerName}</div>
                <div>
                    <button onClick={e=> {
                        e.preventDefault()
                        removeOrder()
                    }}>Удалить заказ</button>
                </div>
                
                <Link to={{
                    pathname: "/editorder",
                    search: orderId
                }}>Редактировать </Link>
                
            </div>

            <OrderItemsList
                orderItems={order.orderItems}
                title={"Элементы заказа"}
                
            />
        </div>
    );
};

export default OrderPage;