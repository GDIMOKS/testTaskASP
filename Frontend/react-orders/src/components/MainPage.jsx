import React, {useEffect, useState} from 'react';
import DateInput from "./UI/dateinput/DateInput";
import MultipleFilter from "./multiplefilter/MultipleFilter";
import OrdersTable from "./orderstable/OrdersTable";
import OrderForm from "./orderform/OrderForm";
import {apiUrl} from "../libraries/functions";
import {Link} from "react-router-dom";

const MainPage = (props) => {
    const [baseUrl, setBaseUrl] = useState(apiUrl)
    
    const [filters, selectFilters] = useState({
        orderNumbers: [],
        orderBeginDate: null,
        orderEndDate: null,
        providersId: [],
        orderItemNames: [],
        orderItemUnits: []
    })

    const getOrders = async (isFirstLoad) => {
        let selectedFilters = {
            orderNumbers: [],
            orderBeginDate: null,
            orderEndDate: null,
            providersId: [],
            orderItemNames: [],
            orderItemUnits: []
        };
        if (!isFirstLoad)
            selectedFilters = filters;

        if (selectedFilters.orderEndDate != null && selectedFilters.orderBeginDate != null)
            if (selectedFilters.orderEndDate < selectedFilters.orderBeginDate) {
                setOrders([])
                //TODO: нормальное уведомление в компоненте
                alert("Начальная дата должна быть меньше конечной даты!")
                return
            }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedFilters)
        }

        const result = await fetch(baseUrl + "orders/list", options)

        if (result.ok) {
            const _orders = await result.json();
            setOrders(_orders)
        }
    }
    
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders(true);
    }, []);
    const changeFilterValues = (values, filterName) => {
        filters[filterName] = values
    }


    return (
        <div className="MainPage">
            <Link to={{
                pathname: "/addorder"
            }}>Добавить заказ</Link>
            <form onSubmit={e => {
                e.preventDefault();
                getOrders(false)
            }}>
                <DateInput labelText='Начальная дата' onChange={changeFilterValues} filterName='orderBeginDate'/>
                <DateInput labelText='Конечная дата' onChange={changeFilterValues} filterName='orderEndDate'/>

                <MultipleFilter baseUrl={baseUrl} destination={'providers'} filterName='providersId' changeFilterValues={changeFilterValues} labelText='По провайдеру'/>
                <MultipleFilter baseUrl={baseUrl} destination={'orders/numbers'} filterName='orderNumbers' changeFilterValues={changeFilterValues} labelText='По номеру заказа'/>
                <MultipleFilter baseUrl={baseUrl} destination={'orderItems/names'} filterName='orderItemNames' changeFilterValues={changeFilterValues} labelText='По названию'/>
                <MultipleFilter baseUrl={baseUrl} destination={'orderItems/units'} filterName='orderItemUnits' changeFilterValues={changeFilterValues} labelText='По единице измерения'/>

                <input type="submit"  value="Применить фильтры"/>
            </form>
            <h2>Заказы:</h2>
            <OrdersTable orders={orders}/>
        </div>
    );
};

export default MainPage;