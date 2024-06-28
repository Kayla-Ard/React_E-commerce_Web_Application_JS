import React, { useState, useEffect } from 'react';
import styles from './Customers.module.css';
import AddCustomer from './AddCustomer';
import { fetchCustomers, fetchCustomerById, saveCustomer, deleteCustomer, updateCustomer } from '../../../API/API';
import Modal from './CustomerModal';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalCustomerDetails, setModalCustomerDetails] = useState(null);
    const [isDeleteConfirmation, setIsDeleteConfirmation] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [editCustomer, setEditCustomer] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const loadedCustomers = await fetchCustomers();
            setCustomers(loadedCustomers);
        } catch (error) {
            console.error('Error loading customers:', error);
        }
    };

    const handleInputChange = (e) => {
        setCustomerId(e.target.value);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditCustomer((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveCustomer = async (customer) => {
        try {
            const savedCustomer = await saveCustomer(customer);
            
            if (savedCustomer) {
                setCustomers([...customers, savedCustomer]);
                setModalMessage(`Customer added successfully!`);
                setModalCustomerDetails(null);
                setShowModal(true);

                setTimeout(() => {
                    setShowModal(false);
                    closeModal();
                }, 3000);

            } else {
                console.error('Error saving customer: Saved customer data is undefined or incomplete.');
            }
        } catch (error) {
            console.error('Error saving customer:', error);
            setModalMessage('Error: Failed to save customer. Please try again.');
            setShowModal(true);
        }
    };
    

    const handleSearch = async () => {
        try {
            const customer = await fetchCustomerById(customerId);
            if (customer) {
                setSelectedCustomer(customer);
            } else {
                console.error('No customer found with ID:', customerId);
                setSelectedCustomer(null);
            }
        } catch (error) {
            console.error('Error fetching customer:', error);
            setSelectedCustomer(null);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault(); 

        try {
            if (!selectedCustomer) {
                console.error('No customer selected for update.');
                return;
            }

            const updatedCustomer = {
                ...selectedCustomer,
                name: editCustomer.name,
                email: editCustomer.email,
                phone: editCustomer.phone
            };

            const result = await updateCustomer(updatedCustomer.customer_id, updatedCustomer);

            setCustomers(customers.map((customer) => {
                if (customer.customer_id === updatedCustomer.customer_id) {
                    return updatedCustomer;
                }
                return customer;
            }));

            setModalMessage('Customer Updated Successfully!');
            setModalCustomerDetails(updatedCustomer);
            setShowModal(true);

            setIsEditing(false); 

            setTimeout(() => {
                setShowModal(false);
                closeModal();
            }, 3000);

        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const handleDeleteConfirmation = () => {
        setIsDeleteConfirmation(true);
        setModalMessage(`Are you sure you want to delete customer ID ${selectedCustomer.customer_id}?`);
        setShowModal(true);
    };

    const handleDelete = async () => {
        try {
            if (!selectedCustomer) {
                console.error('No customer selected for delete.');
                return;
            }
            await deleteCustomer(selectedCustomer.customer_id);
            
            setCustomers(customers.filter((customer) => customer.customer_id !== selectedCustomer.customer_id));

            setModalMessage('Customer deleted successfully!');
            setModalCustomerDetails(selectedCustomer);
            setShowModal(true);

            setIsDeleteConfirmation(false);

            setTimeout(() => {
                setShowModal(false);
                closeModal();
            }, 3000); 
        } catch (error) {
            console.error('Error deleting customer:', error);
        }

    };

    const closeModal = () => {
        setShowModal(false);
        setIsDeleteConfirmation(false);
        setCustomerId(''); 
        setSelectedCustomer(null);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Customers</h1>
            <div className={styles.section}>
                <h2>Add Customer</h2>
                <AddCustomer onSave={handleSaveCustomer} />
            </div>
            <div className={styles.section}>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Enter Customer ID"
                        value={customerId}
                        onChange={handleInputChange}
                    />
                    <button className={styles.searchButton} onClick={handleSearch}>Search</button>
                </div>
                {selectedCustomer && (
                    <div className={styles.customerDetails}>
                        <h3>Customer Details</h3>
                        {!isEditing ? (
                            <>
                                <p>Name: {selectedCustomer.name}</p>
                                <p>Email: {selectedCustomer.email}</p>
                                <p>Phone: {selectedCustomer.phone}</p>
                                <p>Customer ID: {selectedCustomer.customer_id}</p>
                                <div className={styles.actions}>
                                    <button onClick={() => setIsEditing(true)}>Update Details</button>
                                    <button onClick={handleDeleteConfirmation}>Delete Customer</button>
                                    <button onClick={() => setSelectedCustomer(null)}>Close Details</button>
                                </div>
                            </>
                        ) : (
                            <form onSubmit={handleUpdate}>
                                <input
                                    type="text"
                                    name="name"
                                    value={editCustomer.name}
                                    onChange={handleEditInputChange}
                                    placeholder="Name"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={editCustomer.email}
                                    onChange={handleEditInputChange}
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={editCustomer.phone}
                                    onChange={handleEditInputChange}
                                    placeholder="Phone"
                                />
                                <button type="submit">Save Changes</button>
                                <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                            </form>
                        )}
                    </div>
                )}
            </div>
            {showModal && (
                <Modal
                    message={modalMessage}
                    customerDetails={modalCustomerDetails}
                    closeModal={closeModal}
                    onConfirm={isDeleteConfirmation ? handleDelete : null}
                />
            )}
        </div>
    );
};

export default Customers;
