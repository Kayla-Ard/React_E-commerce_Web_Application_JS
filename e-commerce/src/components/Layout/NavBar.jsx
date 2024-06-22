
import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';

const NavBar = () => {
    return (
        <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
            <div className="container">
                <Link className={`navbarBrand ${styles.navbarBrand}`} to="/">
                    Filler for now
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className={`navbarTogglerIcon ${styles.navbarTogglerIcon}`}></span>
                </button>
                <div className={`collapse navbarCollapse ${styles.navbarCollapse}`} id="navbarSupportedContent">
                    <ul className="navbarNav ml-auto">
                        <li className="navItem">
                            <Link className={`navLink ${styles.navLink}`} to="/">
                                Home
                            </Link>
                        </li>
                        <li className="navItem">
                            <Link className={`navLink ${styles.navLink}`} to="/products">
                                Products
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;







