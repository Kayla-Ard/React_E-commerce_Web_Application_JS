import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomModal from '../Modal/Modal';
import styles from './AdminProducts.module.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5001/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = async (product) => {
    try {
      await axios.post('http://localhost:5001/products', product);
      fetchProducts();
      showConfirmationModal('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`http://localhost:5001/products/${id}`, updatedProduct);
      fetchProducts();
      showConfirmationModal('Product updated successfully');
      setSelectedProduct(null); // Reset selected product after update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/products/${id}`);
      fetchProducts();
      showConfirmationModal('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const showConfirmationModal = (message) => {
    setModalTitle('Confirmation');
    setModalContent(message);
    setShowModal(true);
  };

  return (
    <div className={styles.adminProducts}>
      <h2 className={styles.header}>Admin Products Management</h2>
      <ProductForm
        product={selectedProduct}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
      />
      <ProductList
        products={products}
        onSelectProduct={setSelectedProduct}
        onDeleteProduct={handleDeleteProduct}
      />
      <CustomModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        title={modalTitle}
      >
        {modalContent}
      </CustomModal>
    </div>
  );
};

const ProductForm = ({ product, onAddProduct, onUpdateProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track whether in edit mode

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setPrice(product.price || '');
      setIsEditing(true); // Set edit mode when product is provided
    } else {
      setName('');
      setPrice('');
      setIsEditing(false); // Reset edit mode when no product is provided
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing && product && product.id) {
      onUpdateProduct(product.id, { name, price });
    } else {
      onAddProduct({ name, price });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.productForm}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Product Name"
        className={styles.inputField}
        required
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Product Price"
        className={styles.inputField}
        required
      />
      <button type="submit" className={styles.submitButton}>
        {isEditing ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

const ProductList = ({ products, onSelectProduct, onDeleteProduct }) => {
  const handleEditProduct = (product) => {
    onSelectProduct(product);
    window.scrollTo(0, 0); // Scroll to top when editing
  };

  return (
    <ul className={styles.productList}>
      {products.map((product) => (
        <li key={product.id} className={styles.productItem}>
          <span className={styles.productDetails}>
            {product.name} - ${product.price}
          </span>
          <button
            onClick={() => handleEditProduct(product)}
            className={styles.editButton}
          >
            Edit
          </button>
          <button
            onClick={() => onDeleteProduct(product.id)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default AdminProducts;
