import React from 'react';
import OrderForm from "./orderform/OrderForm";
import {apiUrl} from "../libraries/functions";
import {Link, useLocation} from "react-router-dom";
const AddOrderPage = (props) => {

    return (
        <div>
            <Link to="/">На главную</Link>
            <OrderForm formType={'add'} baseUrl={apiUrl}/>

        </div>
    );
};

export default AddOrderPage;