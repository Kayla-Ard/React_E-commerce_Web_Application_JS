import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import { Card, ListGroup } from 'react-bootstrap';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
    const { orderId } = useParams(); 
    const [order, setOrder] = useState(null);

    useEffect(() => {
        fetchOrderDetails(orderId);
    }, [orderId]);

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await fetch(`http://localhost:5001/orders/${orderId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            const data = await response.json();
            setOrder(data);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.orderDetailsContainer}>
            <h2>Order Details</h2>
            <Card>
                <Card.Body>
                    <Card.Title>Order ID: {order.order_id}</Card.Title>
                    <Card.Text>Order Date: {order.order_date}</Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                    {order.items.map((item) => (
                        <ListGroup.Item key={item.item_id} className={styles.orderItem}>
                            <div className={styles.orderItemHeader}>
                                {item.quantity} x {item.product_name} - ${item.total_price}
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Card.Body>
                    <Card.Text className={styles.orderItemTotal}>
                        Total Price: ${order.total_price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default OrderDetails;

