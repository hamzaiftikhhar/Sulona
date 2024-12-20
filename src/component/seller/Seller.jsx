import React, { useState } from "react";
import axios from "axios";
import "./Seller.css";

const Seller = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    quantity: 0,
    image: null,
  });

  // Fetch user's products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
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
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category: newProduct.category,
        quantity: newProduct.quantity,
        imagePath: newProduct.imagePath, // Store the image path here
      };

      await axios.post("/api/products", productData);
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        category: "",
        quantity: 0,
        imagePath: "",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error creating product:", error);
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
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="seller-container">
      <div className="seller-form-wrapper">
        <div className="seller-header">
          <h2>Seller Dashboard</h2>
          <p>Manage your products here</p>
        </div>

        <div className="seller-form">
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
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="Product Category"
              value={newProduct.category}
              onChange={handleProductChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Available Quantity"
              value={newProduct.quantity}
              onChange={handleProductChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="imagePath">Image Path</label>
            <input
              type="text"
              id="imagePath"
              name="imagePath"
              placeholder="Path to the image"
              value={newProduct.imagePath}
              onChange={handleProductChange}
            />
          </div>
          <button className="submit-button" onClick={handleProductCreate}>
            Create Product
          </button>
        </div>

        <div className="seller-form">
          <h2 className="seller-header">My Products</h2>
          <div className="seller-dashboard__products-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
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
