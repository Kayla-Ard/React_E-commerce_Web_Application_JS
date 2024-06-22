
import styles from './ProductCard.module.css';

const ProductCard = ({ product, onClick }) => {
    return (
        <div className={styles.productCard} onClick={onClick}>
            <img src={product.image_url} alt={product.name} className={styles.productImage} />
            <h3 className={styles.productTitle}>{product.name}</h3>
            <p className={styles.productPrice}>${product.price}</p>
        </div>
    );
};

export default ProductCard;

