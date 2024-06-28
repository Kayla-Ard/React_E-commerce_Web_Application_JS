import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomerModal.module.css';

const CustomerModal = ({ message, customerDetails, closeModal, children }) => {
    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={closeModal}>&times;</span>
                <p>{message}</p>
                {customerDetails && (
                    <>
                        <p>Name: {customerDetails.name}</p>
                        <p>Email: {customerDetails.email}</p>
                        <p>Phone: {customerDetails.phone}</p>
                    </>
                )}
                {children}
            </div>
        </div>
    );
};

CustomerModal.propTypes = {
    message: PropTypes.string.isRequired,
    customerDetails: PropTypes.object,
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.node
};

export default CustomerModal;
