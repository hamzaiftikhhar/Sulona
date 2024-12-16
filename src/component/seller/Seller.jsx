import React, { useState } from 'react';
import axios from 'axios';
import './Seller.css';

const Seller = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    image: null,
  });

  // Fetch user's products
  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Handle new product creation
  const handleProductChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setNewProduct({ ...newProduct, image: e.target.files[0] });
  };

  const handleProductCreate = async () => {
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('description', newProduct.description);
      formData.append('price', newProduct.price);
      formData.append('image', newProduct.image);

      await axios.post('/api/products', formData);
      setNewProduct({ name: '', description: '', price: 0, image: null });
      fetchProducts();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  // Handle product management
  const handleProductEdit = async (product) => {
    // Implement product editing logic
  };

  const handleProductDelete = async (productId) => {
    try {
      await axios.delete(`/api/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-header">
          <h2>Seller Dashboard</h2>
          <p>Manage your products here</p>
        </div>

        <div className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleProductChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Product Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Product Description"
              value={newProduct.description}
              onChange={handleProductChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="price">Product Price</label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Product Price"
              value={newProduct.price}
              onChange={handleProductChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageUpload}
            />
          </div>
          <button className="submit-button" onClick={handleProductCreate}>
            Create Product
          </button>
        </div>

        <div className="auth-form">
          <h2 className="auth-header">My Products</h2>
          <div className="seller-dashboard__products-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>
                      <button
                        className="toggle-button"
                        onClick={() => handleProductEdit(product)}
                      >
                        Edit
                      </button>
                      <button
                        className="toggle-button"
                        onClick={() => handleProductDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;