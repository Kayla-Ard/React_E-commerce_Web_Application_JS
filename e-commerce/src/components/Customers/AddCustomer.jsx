import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './AddCustomer.module.css'; 

const AddCustomer = () => {
    const history = useHistory();
    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({ ...customerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch('http://localhost:5001/customers', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerData)
        });
        if (!response.ok) {
            throw new Error('Failed to add customer');
        }
        alert('Customer added successfully');
        history.push('/');
        } catch (error) {
        console.error('Error adding customer:', error);
        }
    };

    return (
        <div className={styles.formContainer}>
        <h2>Add Customer</h2>
        <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
            <label>Name</label>
            <input type="text" name="name" value={customerData.name} onChange={handleChange} placeholder="Name" required />
            </div>
            <div className={styles.formGroup}>
            <label>Email</label>
            <input type="email" name="email" value={customerData.email} onChange={handleChange} placeholder="Email" required />
            </div>
            <div className={styles.formGroup}>
            <label>Phone</label>
            <input type="text" name="phone" value={customerData.phone} onChange={handleChange} placeholder="Phone" required />
            </div>
            <button type="submit" className={styles.submitButton}>Add Customer</button>
        </form>
        </div>
    );
};

export default AddCustomer;

