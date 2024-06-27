import React from 'react';
import styles from './CustomerModal.module.css';

const CustomerModal = ({ message, customerDetails, closeModal }) => {
    return (
        <div className={styles.adminModalOverlay}>
            <div className={styles.adminModalContent}>
                <h2 className={styles.header}>{message}</h2>
                <div className={styles.customerDetails}>
                    <p>Name: {customerDetails.name}</p>
                    <p>Email: {customerDetails.email}</p>
                    <p>Phone: {customerDetails.phone}</p>
                    <p>Customer ID: {customerDetails.customer_id}</p>
                </div>
                <button className={styles.adminCloseButton} onClick={closeModal}>Close</button>
            </div>
        </div>
    );
};

export default CustomerModal;
