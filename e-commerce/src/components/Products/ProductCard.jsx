import styles from './ProductCard.module.css';
import betaFishImage from '../ProductImages/betaFish.png';
import catFoodImage from '../ProductImages/catFood.png';
import dogFoodImage from '../ProductImages/dogFood.png';
import dogToyImage from '../ProductImages/dogToy.png';

const ProductCard = ({ product, onClick }) => {
    
    const getImage = (productName) => {
        switch (productName.toLowerCase()) {
            case 'beta fish':
                return betaFishImage;
            case 'cat food':
                return catFoodImage;
            case 'dog food':
                return dogFoodImage;
            case 'dog toys':
                return dogToyImage;
            default:
                return null; 
        }
    };

    const productImage = getImage(product.name);

    return (
        <div className={styles.productCard} onClick={onClick}>
            <img src={productImage} alt={product.name} className={styles.productImage} />
            <h3 className={styles.productTitle}>{product.name}</h3>
            <p className={styles.productPrice}>${product.price}</p>
        </div>
    );
};

export default ProductCard;


