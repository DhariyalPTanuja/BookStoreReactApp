import React, { useState, useEffect } from 'react'
import './OrderSuccessPage.css'
import { Link } from 'react-router-dom';
import OrderService from '../services/OrderService'
import CartServices from '../services/CartService';

function OrderSuccessPage() {
    const [orderSuccess, setOrderId] = useState([]);

    const fetchOrderCount = () => {
        // OrderService.getAll().then((response) => {
            OrderService.getAllData().then((response) => {
            setOrderId(response.data.data);
            console.log(response.data.data);
            // CartServices.deleteCartItems().then((response) => {
            //     console.log(response);
            // })
        })
    };
    console.log(orderSuccess);
    useEffect(() => {
        fetchOrderCount();
    }, []);

    
    return (
        <div>

            <div className="card">
                <div className="card-content">
                    <i className="checkmark">✓</i>
                </div>
                <h1>Placed Successfully</h1>
                <p>We received your purchase request<br /> on ID --{orderSuccess.length}<br /> we'll be in touch shortly!</p>
                <Link to='/'>click here</Link><p>to continue</p>
            </div>
        </div>
    )
}

export default OrderSuccessPage