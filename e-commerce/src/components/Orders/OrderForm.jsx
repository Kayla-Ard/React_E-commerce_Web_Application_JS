
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import styles from './OrderForm.module.css';

const OrderForm = () => {
    const history = useHistory();

    const [products, setProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [formData, setFormData] = useState({
        customerName: '',
        customerEmail: '',
        items: [],
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5001/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleProductChange = (e, productId) => {
        const { checked } = e.target;
        if (checked) {
            const selectedProduct = products.find((product) => product.product_id === productId);
            setSelectedProducts([...selectedProducts, selectedProduct]);
        } else {
            const updatedSelectedProducts = selectedProducts.filter(
                (product) => product.product_id !== productId
            );
            setSelectedProducts(updatedSelectedProducts);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
            ...formData,
            items: selectedProducts.map((product) => ({
                product_id: product.product_id,
                quantity: 1, 
            })),
        };

        try {
            const response = await fetch('http://localhost:5001/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });
            if (!response.ok) {
                throw new Error('Failed to create order');
            }
            const data = await response.json();
            
            history.push(`/orders/${data.order_id}`);
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <h2>Create Order</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="customerName" className={styles.formGroup}>
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="customerEmail" className={styles.formGroup}>
                    <Form.Label>Customer Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                <Form.Group className={styles.formGroup}>
                    <Form.Label>Select Products</Form.Label>
                    {products.map((product) => (
                        <Form.Check
                            key={product.product_id}
                            type="checkbox"
                            id={`product-${product.product_id}`}
                            label={`${product.name} - $${product.price}`}
                            onChange={(e) => handleProductChange(e, product.product_id)}
                        />
                    ))}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit Order
                </Button>
            </Form>
        </div>
    );
};

export default OrderForm;

