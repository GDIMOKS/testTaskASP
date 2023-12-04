import React from 'react';
import OrderForm from "./orderform/OrderForm";
import {apiUrl} from "../libraries/functions";
import {useLocation} from "react-router-dom";

const EditOrderPage = () => {
    const state = useLocation()
    console.log(state.search.substring(1))
    return (
        <div>
            <OrderForm formType={'edit'} baseUrl={apiUrl} orderId={state.search.substring(1)} />
        </div>
    );
};

export default EditOrderPage;