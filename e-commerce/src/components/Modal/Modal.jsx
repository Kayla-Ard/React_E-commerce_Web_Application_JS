
import { Modal, Button } from 'react-bootstrap';
import styles from './Modal.module.css';

const CustomModal = ({ show, handleClose, title, children }) => {
    return (
        <Modal show={show} onHide={handleClose} className={styles.modal}>
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>{children}</Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CustomModal;


