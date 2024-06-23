import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import styles from './Products.module.css';
import { fetchProducts } from '../../../API/API';

const DisplayProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const data = await fetchProducts();
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




