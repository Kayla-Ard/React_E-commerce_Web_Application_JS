import { useState } from 'react';
import axios from 'axios';
import styles from './CustomerForm.module.css';

const CustomerForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`${API_BASE_URL}/customers`, { name, email, phone });
            alert('Customer added successfully!');
        } catch (error) {
            console.error('Error adding customer:', error);
            alert('Failed to add customer. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formGroup}>
                <label>Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className={styles.formGroup}>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div className={styles.formGroup}>
                <label>Phone:</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div className={styles.formGroup}>
                <button type="submit" className={styles.submitButton}>Add Customer</button>
            </div>
        </form>
    );
};

export default CustomerForm;

