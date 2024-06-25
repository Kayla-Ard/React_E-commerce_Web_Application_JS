/* Ideas ---- 
- Create Account (should send user to Customer page)
- Account Details (should send user to Customer page)
- Update Account (should send user to Customer page)
- Delete Account  (should send user to Customer page) */

import React, { useState } from 'react';
import styles from './Customers.module.css';
import AddCustomer from './AddCustomer';
import CustomerAccounts from './CustomerAccounts';
import { saveCustomer } from '../../../API/API';  // Ensure you have a function to save customer

const Customers = () => {
    const [customers, setCustomers] = useState([]);

    const handleSaveCustomer = async (customer) => {
        const savedCustomer = await saveCustomer(customer);
        setCustomers([...customers, savedCustomer]);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Customers Page</h1>
            <div className={styles.section}>
                <h2>Add Customer</h2>
                <AddCustomer onSave={handleSaveCustomer} />
            </div>
            <div className={styles.section}>
                <CustomerAccounts />
            </div>
        </div>
    );
};

export default Customers;


