import styles from './Footer.module.css';


const Footer = () => {
    return (
        <footer className={`${styles.footer} mt-auto py-3 bg-light`}>
            <div className="container text-center">
                <span className="text-muted">© 2024 Created & designed by Kayla Ard.</span>
            </div>
        </footer>
    );
};

export default Footer;
