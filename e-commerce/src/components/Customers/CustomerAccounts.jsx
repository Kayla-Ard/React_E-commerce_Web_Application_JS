

import React, { useEffect, useState } from 'react';
import { fetchCustomerAccounts, saveCustomerAccount, deleteCustomerAccount } from '../../../API/API';
import styles from './CustomerAccounts.module.css'; 

const CustomerAccounts = () => {
    const [customerAccounts, setCustomerAccounts] = useState([]);
    const [newCustomerAccount, setNewCustomerAccount] = useState({ username: '', password: '', customer_id: '' });

    useEffect(() => {
        const loadCustomerAccounts = async () => {
            try {
                const accounts = await fetchCustomerAccounts();
                console.log('Fetched customer accounts:', accounts); 
                setCustomerAccounts(accounts);
            } catch (error) {
                console.error('Error loading customer accounts:', error);
            }
        };
        loadCustomerAccounts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCustomerAccount({ ...newCustomerAccount, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const savedAccount = await saveCustomerAccount(newCustomerAccount);
            console.log('Saved new account:', savedAccount); 
            setNewCustomerAccount({ username: '', password: '', customer_id: '' });
            const accounts = await fetchCustomerAccounts();
            setCustomerAccounts(accounts);
        } catch (error) {
            console.error('Error saving customer account:', error);
        }
    };

    const handleDelete = async (accountId) => {
        try {
            await deleteCustomerAccount(accountId);
            console.log('Deleted account ID:', accountId); 
            const accounts = await fetchCustomerAccounts();
            setCustomerAccounts(accounts);
        } catch (error) {
            console.error('Error deleting customer account:', error);
        }
    };

    return (
        <div className={styles.customerAccountsContainer}>
            <h2>Customer Accounts</h2>
            <form onSubmit={handleSubmit} className={styles.customerAccountsForm}>
                <input
                    type="text"
                    name="username"
                    value={newCustomerAccount.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    required
                    className={styles.customerAccountsInput}
                />
                <input
                    type="password"
                    name="password"
                    value={newCustomerAccount.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    required
                    className={styles.customerAccountsInput}
                />
                <input
                    type="text"
                    name="customer_id"
                    value={newCustomerAccount.customer_id}
                    onChange={handleInputChange}
                    placeholder="Customer ID"
                    required
                    className={styles.customerAccountsInput}
                />
                <button type="submit" className={styles.customerAccountsButton}>Save</button>
            </form>
            <ul className={styles.customerAccountsList}>
                {customerAccounts.map((account) => (
                    <li key={account.id} className={styles.customerAccountsListItem}>
                        {account.username} - {account.customer_id}
                        <button onClick={() => handleDelete(account.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerAccounts;


