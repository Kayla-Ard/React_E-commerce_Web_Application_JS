

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Orders.module.css';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch('http://localhost:5001/orders');
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div className={styles.ordersContainer}>
            <h1>Orders Page</h1>
            <ul className={styles.ordersList}>
                {orders.map((order) => (
                    <li key={order.order_id} className={styles.orderItem}>
                        <Link to={`/orders/${order.order_id}`} className={styles.orderLink}>
                            Order ID: {order.order_id} - Total: ${order.total_price}
                        </Link>
                    </li>
                ))}
            </ul>
            <Link to="/orders/new"> 
                <button className={styles.createOrderButton}>Create New Order</button>
            </Link>
        </div>
    );
};

export default Orders;





