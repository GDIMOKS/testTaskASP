import React from 'react';
import OrderForm from "./orderform/OrderForm";
import {apiUrl} from "../libraries/functions";
import {Link, useLocation} from "react-router-dom";

const EditOrderPage = () => {
    const state = useLocation()
    console.log(state.search.substring(1))
    return (
        
        <div className="EditOrderPage commonPage">
            <Link className="button" to="/">На главную</Link>
            <OrderForm formType={'edit'} baseUrl={apiUrl} orderId={state.search.substring(1)} />
        </div>
    );
};

export default EditOrderPage;