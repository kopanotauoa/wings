import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from './firebaseConfig'; // Firebase import
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
  });
  const [editingProductId, setEditingProductId] = useState(null);

  // Load products from Firestore on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsArray);
    };
    fetchProducts();
  }, []);

  // Add a new product to Firestore
  const addProduct = async () => {
    try {
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      setProducts((prevProducts) => [
        ...prevProducts,
        { ...newProduct, id: docRef.id },
      ]);
      resetForm();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Update an existing product in Firestore
  const updateProduct = async (id, updatedDetails) => {
    try {
      const productDoc = doc(db, 'products', id);
      await updateDoc(productDoc, updatedDetails);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, ...updatedDetails } : product
        )
      );
      resetForm();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Delete a product from Firestore
  const deleteProduct = async (id) => {
    try {
      const productDoc = doc(db, 'products', id);
      await deleteDoc(productDoc);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const startEditing = (product) => {
    setEditingProductId(product.id);
    setNewProduct(product); // Pre-fill form with product details for editing
  };

  const handleSaveEdit = () => {
    if (editingProductId !== null) {
      updateProduct(editingProductId, newProduct);
    }
  };

  const resetForm = () => {
    setNewProduct({ name: '', description: '', category: '', price: '', quantity: '' });
    setEditingProductId(null); // Clear editing mode
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  return (
    <div className="product-management-container">
      <h2 className="heading">Product Management</h2>

      <h3 className="subheading">{editingProductId ? 'Edit Product' : 'Add New Product'}</h3>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={handleInputChange}
        className="input-field"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newProduct.description}
        onChange={handleInputChange}
        className="input-field"
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={newProduct.category}
        onChange={handleInputChange}
        className="input-field"
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={newProduct.price}
        onChange={handleInputChange}
        className="input-field"
      />
      <input
        type="number"
        name="quantity"
        placeholder="Initial Quantity"
        value={newProduct.quantity}
        onChange={handleInputChange}
        className="input-field"
      />
      <button onClick={editingProductId ? handleSaveEdit : addProduct} className="submit-button">
        {editingProductId ? 'Save Changes' : 'Add Product'}
      </button>

      <h3 className="subheading">Inventory</h3>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>
                <button onClick={() => startEditing(product)} className="update-button">Update</button>
                <button onClick={() => deleteProduct(product.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Link to Control Desk */}
      <div className="control-desk-link">
        <Link to="/control-desk" className="nav-link">Go to Control Desk</Link>
      </div>
    </div>
  );
};

export default ProductManagement;
