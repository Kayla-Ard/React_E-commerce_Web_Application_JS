import React, { useState } from 'react';
import './AddCustomer.module.css'; 

const AddCustomer = ({ onSave }) => {
    const [customer, setCustomer] = useState({ name: '', email: '', phone: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer({ ...customer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(customer);
        setCustomer({ name: '', email: '', phone: '' });
    };

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={customer.name}
                        onChange={handleInputChange}
                        placeholder="Enter Name"
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleInputChange}
                        placeholder="Enter Email"
                        required
                    />
                </div>
                <div className="formGroup">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={customer.phone}
                        onChange={handleInputChange}
                        placeholder="Enter Phone"
                        required
                    />
                </div>
                <button className="submitButton" type="submit">Save Customer</button>
            </form>
        </div>
    );
};

export default AddCustomer;



