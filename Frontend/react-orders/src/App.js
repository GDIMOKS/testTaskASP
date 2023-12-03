import React, {useEffect, useState} from "react";
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
    const getOrders = async () => {
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filters)
        }
        const result = await fetch(baseUrl + "orders/list", options)
        if (result.ok) {
            const _orders = await result.json();
            setOrders(_orders)
        }
    }
    useEffect(() => {
        getOrders();
    }, []);

    const [orders, setOrders] = useState([]);

    filters.orderEndDate = new Date()
    filters.orderBeginDate = new Date(filters.orderEndDate)
    filters.orderBeginDate = new Date(filters.orderBeginDate.setMonth(filters.orderBeginDate.getMonth() -1)) 

    const changeFilterValues = (values, filterName) => {
        filters[filterName] = values
    }
    
    return (
        <div className="App">
            <form onSubmit={e => {
                e.preventDefault();
                getOrders()
            }}>
                <label>По провайдеру</label>
                <MultipleFilter baseUrl={baseUrl} destination={'providers'} filterName='providersId' changeFilterValues={changeFilterValues}/>
                <label>По номеру заказа</label>
                <MultipleFilter baseUrl={baseUrl} destination={'orders/numbers'} filterName='orderNumbers' changeFilterValues={changeFilterValues}/>
                <label>По названию</label>
                <MultipleFilter baseUrl={baseUrl} destination={'orderItems/names'} filterName='orderItemNames' changeFilterValues={changeFilterValues}/>
                <label>По единице измерения</label>
                <MultipleFilter baseUrl={baseUrl} destination={'orderItems/units'} filterName='orderItemUnits' changeFilterValues={changeFilterValues}/>    
                <input type="submit"  value="Принять фильтры"/>
            </form>

            <OrdersTable orders={orders}/>


        </div>
    );
}

export default App;