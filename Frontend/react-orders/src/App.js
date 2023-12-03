import React, {useState, useEffect} from "react";
import MultipleFilter from "./components/MultipleFilter";
import OrdersTable from "./components/OrdersTable";

function App() {
    const baseUrl = "http://localhost:5054/api/";
    
    let filters = {
        orderNumbers: [],
        orderBeginDate: null,
        orderEndDate: null,
        providersId: [],
        orderItemNames: [],
        orderItemUnits: []
    };
    
    filters.orderEndDate = new Date()
    filters.orderBeginDate = new Date(filters.orderEndDate)
    filters.orderBeginDate = new Date(filters.orderBeginDate.setMonth(filters.orderBeginDate.getMonth() -1)) 

    const changeFilterValues = (values, filterName) => {
        filters[filterName] = values
    }
    const getOrders = (event) => {
        event.preventDefault();
        return <OrdersTable request={filters} baseUrl={baseUrl}/>
    }
    return (
        <div className="App">
            <form onSubmit={event => {getOrders(event)}}>
                <label>По провайдеру</label>
                <MultipleFilter baseUrl={baseUrl} destination={'providers'} filterName='providersId' changeFilterValues={changeFilterValues}/>
                <label>По номеру заказа</label>
                <MultipleFilter baseUrl={baseUrl} destination={'orders/numbers'} filterName='orderNumbers' changeFilterValues={changeFilterValues}/>
                <label>По названию</label>
                <MultipleFilter baseUrl={baseUrl} destination={'orderItems/names'} filterName='orderItemNames' changeFilterValues={changeFilterValues}/>
                <label>По единице измерения</label>
                <MultipleFilter baseUrl={baseUrl} destination={'orderItems/units'} filterName='orderItemUnits' changeFilterValues={changeFilterValues}/>    
                <input type="submit" value="Принять фильтры"/>
            </form>
            

            <OrdersTable request={null} baseUrl={baseUrl}/>

            

        </div>
    );
}

export default App;