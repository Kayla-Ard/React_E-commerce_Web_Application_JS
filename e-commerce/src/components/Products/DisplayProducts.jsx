import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import styles from './DisplayProducts.module.css';

const DisplayProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5001/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleShowPrice = (productId) => {
        console.log(`Show price for product with ID: ${productId}`);
    };

    return (
        <div className={styles.productListContainer}>
            <h2>All Products</h2>
            <div className={styles.productGrid}>
                {products.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        product={product}
                        onClick={() => handleShowPrice(product.product_id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DisplayProducts;



