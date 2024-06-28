# Fur Baby Boutique E-Commerce Application

Welcome to the Fur Baby Boutique, a comprehensive e-commerce application designed for pet lovers to browse and purchase various pets and pet products. This project combines a JavaScript/React frontend with a Python/Flask backend, providing a seamless user experience for managing products, orders, and customers.

## Features

### Customer and Management
- Create Customer Form: Capture and submit essential customer information, including name, email, and phone number.
- Read Customer Details: Display customer details retrieved from the backend based on their unique identifier (customer_id).
- Update Customer Form: Update customer details, including name, email, and phone number.
- Delete Customer Information: Delete a customer from the backend based on their unique identifier (customer_id).
- Customer Confirmation Modules: Design a confirmation modal for securely creating, updating, or deleting a customer from the system based on their ID.

### Product Catalog
- List Products: Display a list of all available products in the e-commerce platform, providing essential product information.
- Create Product Form: Add a new product to the e-commerce database, capturing essential details such as the product name and price.
- Read Product Details: Display product details retrieved from the backend based on the product's unique identifier (product_id).
- Update Product Form: Update product details, including the product name and price.
- Delete Product Information: Delete a product from the backend based on its unique identifier (product_id).
- Product Confirmation Module: Design a confirmation modal for securely creating, updating, or deleting a product from the system based on its unique product_id.

### Order Processing
- Place Order Form: Create a form component for customers to place new orders, specifying the products they wish to purchase and providing essential order details.
- Retrieve Order Details: Allow customers to retrieve details of a specific order based on its unique identifier (order_id), providing a clear overview of the order, including the order date and associated products.
- Calculate Order Total Price: Include a component that calculates the total price of items in a specific order, considering the prices of the products included in the order.

### Component Creation and Organization
- Functional Components: Build the user interface using functional components.
- Logical Folder Structure: Organize components into a logical folder structure for better code organization and maintainability.
- React Hooks: Use hooks such as useState and useEffect to manage component state and side effects.

### Routing and Navigation
- React Router: Implement routing to create routes for different sections and pages of the application.
- Navigation: Use navigation links or buttons to allow users to navigate between different parts of the application.

### Forms and Form Handling
- Form Development: Capture user inputs for creating, updating, or interacting with customer data, product data, and orders.
- Form Validation: Ensure user inputs meet specified criteria, such as required fields, proper formatting, and validation messages.
- Form Submission Handlers: Send data to the backend API for processing.

### Event Handling
- Event Handlers: Set up event handlers to respond to user interactions and events within the application, triggering actions like submitting forms, deleting records, and updating data.

### Integration with React-Bootstrap
- UI Enhancement: Use React-Bootstrap components and utilities to enhance the user interface.
- Bootstrap Styles: Apply Bootstrap styles and CSS classes to achieve a visually appealing and responsive layout.

### Error Handling
- Error Handling Mechanisms: Implement mechanisms to gracefully handle errors during data retrieval, form submission, or API interactions.
- Informative Error Messages: Display informative error messages to users when errors occur, helping them understand the issue and how to resolve it.

## Folder Structure
e-commerce/
│
├── API/
│   └── API.jsx
│
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── components/
│   ├── Customer/
│   │   ├── AddCustomer.jsx
│   │   ├── AddCustomer.module.css
│   │   ├── CustomerModal.jsx
│   │   ├── CustomerModal.module.css
│   │   ├── Customers.jsx
│   │   └── Customers.module.css
│   │
│   ├── HomePage/
│   │   ├── HomePage.jsx
│   │   └── HomePage.module.css
│   │
│   ├── Layout/
│   │   ├── Cart.jsx
│   │   ├── Cart.module.css
│   │   ├── CartModal.jsx
│   │   ├── CartModal.module.css
│   │   ├── Footer.jsx
│   │   ├── Footer.module.css
│   │   ├── Header.jsx
│   │   ├── Header.module.css
│   │   ├── NavBar.jsx
│   │   └── NavBar.module.css
│   │
│   ├── Orders/
│   │   ├── OrderDetails.jsx
│   │   ├── OrderDetails.module.css
│   │   ├── OrderForm.jsx
│   │   ├── OrderForm.module.css
│   │   ├── Orders.jsx
│   │   └── Orders.module.css
│   │
│   ├── Products/
│   │   ├── AdminModal.jsx
│   │   ├── AdminModal.module.css
│   │   ├── AdminProducts.jsx
│   │   ├── AdminProducts.module.css
│   │   ├── ProductCard.jsx
│   │   ├── ProductCard.module.css
│   │   ├── Products.jsx
│   │   └── Products.module.css
│
└── README.md


## Usage
- Customer Interface: Browse products, add them to the cart, and proceed to checkout.
- Admin Interface: Log in with admin credentials to manage products and view analytics.

## Technologies Used
1. Frontend: 
    - JavaScript
    - React
    - React Router
    - Axios
    - CSS Modules
2. Backend:
    - Python
    - Flask
    - SQLAlchemy
    - Marshmallow
    - Flask-CORS
3. API platform: 
    - Postman

## Getting Started

1. Clone the repository: git clone <https://github.com/Kayla-Ard/React_E-commerce_Web_Application_JS>
2. Install dependencies: Navigate to the e-commerce folder and run npm install for frontend dependencies and pip install -r requirements.txt for backend dependencies.
3. Start the Flask API: Navigate to the backend directory and run flask run --port 5001.
4. Start the React app: Navigate to the src folder and run npm start.