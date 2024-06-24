import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import styles from './Products.module.css';
import { fetchProducts } from '../../../API/API';
import { useLocation } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const petType = queryParams.get('search');

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const data = await fetchProducts();
            setProducts(data);
            filterProducts(petType); 
            setFilteredProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value;
        setSearchTerm(searchTerm);
        filterProducts(searchTerm);
    };

    const filterProducts = (term) => {
        if (!term) {
            setFilteredProducts(products); 
            return;
        }

        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div className={styles.productListContainer}>
            <h2>Products</h2>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.productGrid}>
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        product={product}
                        onClick={() => console.log(`Show price for product with ID: ${product.product_id}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Products;






