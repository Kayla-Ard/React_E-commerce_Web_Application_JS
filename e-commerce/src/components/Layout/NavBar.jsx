import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import FurBabyLogo from './FurBabyLogo.png';
import { FaSearch, FaMapMarkerAlt, FaShoppingCart } from 'react-icons/fa';
import { useCart } from './Cart';
import CartModal from './CartModal';

const NavBar = () => {
    const { cartCount } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [isAddressModalOpen, setAddressModalOpen] = useState(false);
    const [isCartModalOpen, setCartModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleAddressModal = () => {
        setAddressModalOpen(!isAddressModalOpen);
    };

    const toggleCartModal = () => {
        setCartModalOpen(!isCartModalOpen);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.logoContainer}>
                <img src={FurBabyLogo} alt="Fur Baby Logo" className={styles.logo} />
            </div>
            <div className={styles.searchBox}>
                <input type="text" placeholder="Search..." className={styles.searchInput} />
                <button className={styles.searchButton}><FaSearch /></button>
            </div>
            <div className={styles.iconsContainer}>
                <div className={styles.addressIcon} onClick={toggleAddressModal}>
                    <FaMapMarkerAlt />
                    {isAddressModalOpen && (
                        <div className={styles.modal}>
                            <p>1445 Aspen Way Logan, Utah 84345</p>
                        </div>
                    )}
                </div>
                <div className={styles.cartIcon} onClick={toggleCartModal}>
                    <FaShoppingCart />
                    <span className={styles.cartCount}>{cartCount}</span>
                </div>
                {isCartModalOpen && <CartModal onClose={toggleCartModal} />}
            </div>
            <div className={styles.menuToggle}>
                <div className={styles.toggle} onClick={toggleMenu}>
                    ☰
                </div>
                <div className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
                    <Link to="/" className={styles.navItem} onClick={() => setIsOpen(false)}>Home</Link>
                    <Link to="/products" className={styles.navItem} onClick={() => setIsOpen(false)}>Products</Link>
                    <Link to="/customers" className={styles.navItem} onClick={() => setIsOpen(false)}>Customers</Link>
                    <Link to="/orders" className={styles.navItem} onClick={() => setIsOpen(false)}>Orders</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
















