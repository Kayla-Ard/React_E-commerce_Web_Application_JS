
import { useState, useEffect } from 'react';
import { Button, Table, Modal } from 'react-bootstrap';
import styles from './AdminProducts.module.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const handleModalClose = () => {
    setShowModal(false);
    
    fetchProducts();
  };

  const handleEditProduct = (productId) => {
    
    console.log(`Edit product with ID: ${productId}`);
  };

  const handleDeleteProduct = (productId) => {
    
    console.log(`Delete product with ID: ${productId}`);
  };

  return (
    <div className={styles.adminProducts}>
      <h2>Admin Products</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add New Product
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleEditProduct(product.product_id)}
                >
                  Edit
                </Button>{' '}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product.product_id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm handleClose={handleModalClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminProducts;

