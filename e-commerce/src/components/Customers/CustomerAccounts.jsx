import React, { useState, useEffect } from 'react';
import { fetchCustomerAccounts, fetchCustomerById, saveCustomerAccount, deleteCustomerAccount, updateCustomerAccount } from '../../../API/API';
import styles from './CustomerAccounts.module.css';
import Modal from "../Customers/CustomerModal"; 

const CustomerAccounts = () => {
    const [customerAccounts, setCustomerAccounts] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [selectedAccount, setSelectedAccount] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalCustomerDetails, setModalCustomerDetails] = useState(null);

    useEffect(() => {
        loadCustomerAccounts();
    }, []);

    const loadCustomerAccounts = async () => {
        try {
            const accounts = await fetchCustomerAccounts();
            setCustomerAccounts(accounts);
        } catch (error) {
            console.error('Error loading customer accounts:', error);
        }
    };

    const handleInputChange = (e) => {
        setCustomerId(e.target.value);
    };

    const handleSearch = async () => {
        try {
            const account = await fetchCustomerById(customerId);
            if (account) {
                setSelectedAccount(account);
            } else {
                console.error('No account found with ID:', customerId);
                setSelectedAccount(null);
            }
        } catch (error) {
            console.error('Error fetching customer account:', error);
            setSelectedAccount(null);
        }
    };

    const handleUpdate = async () => {
        try {
            const updatedAccount = { ...selectedAccount };
            await updateCustomerAccount(updatedAccount.account_id, updatedAccount);
            loadCustomerAccounts();
            setSelectedAccount(null);

            setModalMessage('Customer Updated Successfully!');
            setModalCustomerDetails(updatedAccount);
            setShowModal(true);
        } catch (error) {
            console.error('Error updating customer account:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteCustomerAccount(selectedAccount.account_id);
            loadCustomerAccounts();
            setSelectedAccount(null);

            setModalMessage('Customer Account closed & customer deleted successfully!');
            setModalCustomerDetails(selectedAccount);
            setShowModal(true);
        } catch (error) {
            console.error('Error deleting customer account:', error);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.customerAccountsContainer}>
            <h2>Customer Accounts</h2>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Enter Customer ID"
                    value={customerId}
                    onChange={handleInputChange}
                />
                <button className={styles.searchButton} onClick={handleSearch}>Search</button>
            </div>
            {selectedAccount ? (
                <div className={styles.accountDetails}>
                    <h3>Customer Details</h3>
                    <p>Name: {selectedAccount.name}</p>
                    <p>Email: {selectedAccount.email}</p>
                    <p>Phone: {selectedAccount.phone}</p>
                    <p>Customer ID: {selectedAccount.customer_id}</p>
                    <div className={styles.actions}>
                        <button onClick={handleUpdate}>Update Details</button>
                        <button onClick={handleDelete}>Delete Account</button>
                        <button onClick={() => setSelectedAccount(null)}>Close Details</button>
                    </div>
                </div>
            ) : null}

            {showModal && (
                <Modal
                    message={modalMessage}
                    customerDetails={modalCustomerDetails}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default CustomerAccounts;
