import React from 'react';
import MainPage from "./components/MainPage";
import OrderPage from "./components/OrderPage";
import AddOrderPage from "./components/AddOrderPage";
import EditOrderPage from "./components/EditOrderPage";

const AppRoutes = [
    {
        path: '/',
        element: <MainPage />
    },
    {
        path: '/order',
        element: <OrderPage />
    },
    {
        path: '/addorder',
        element: <AddOrderPage />
    },
    {
        path: '/editorder',
        element: <EditOrderPage />
    }
];

export default AppRoutes;