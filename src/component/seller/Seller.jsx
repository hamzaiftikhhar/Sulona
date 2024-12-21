import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import "./Seller.css";

const Seller = () => {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    imagePath: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  // Validation rules
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!newProduct.name.trim()) {
      newErrors.name = "Product name is required";
    } else if (newProduct.name.length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }

    // Description validation
    if (!newProduct.description.trim()) {
      newErrors.description = "Product description is required";
    } else if (newProduct.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    // Price validation
    if (!newProduct.price) {
      newErrors.price = "Price is required";
    } else if (Number(newProduct.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    } else if (!/^\d+(\.\d{1,2})?$/.test(newProduct.price)) {
      newErrors.price =
        "Price must be a valid number with up to 2 decimal places";
    }

    // Category validation
    if (!newProduct.category.trim()) {
      newErrors.category = "Category is required";
    }

    // Quantity validation
    if (!newProduct.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (Number(newProduct.quantity) < 0) {
      newErrors.quantity = "Quantity cannot be negative";
    } else if (!Number.isInteger(Number(newProduct.quantity))) {
      newErrors.quantity = "Quantity must be a whole number";
    }

    // Image path validation
    if (!newProduct.imagePath.trim()) {
      newErrors.imagePath = "Image path is required";
    } else if (!/^[a-zA-Z0-9_\-./]+$/.test(newProduct.imagePath)) {
      newErrors.imagePath =
        'Image path must be a valid string (e.g., "/images/product1.jpg")';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // URL validation helper
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Fetch user's products
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get("api/products");
      const productsData = Array.isArray(response.data) ? response.data : [];
      setProducts(productsData);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setProducts([]);
      showStatus("Error fetching products. Please try again.", "error");
      setIsLoading(false);
    }
  };

  // Handle input changes
  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Show status message
  const showStatus = (message, type) => {
    setSubmitStatus({ show: true, message, type });
    setTimeout(
      () => setSubmitStatus({ show: false, message: "", type: "" }),
      5000
    );
  };

  // Handle form submission (create or update)
  const handleSubmit = async () => {
    if (!validateForm()) {
      showStatus('Please fix the errors before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showStatus('Please log in to manage products.', 'error');
        window.location.href = '/login';
        return;
      }

      const productData = {
        name: newProduct.name.trim(),
        description: newProduct.description.trim(),
        price: parseFloat(newProduct.price),
        category: newProduct.category.trim(),
        quantity: parseInt(newProduct.quantity),
        imagePath: newProduct.imagePath.trim(),
      };

      if (editingProductId) {
        // Update existing product
        await axiosInstance.put(`api/products/${editingProductId}`, productData);
        showStatus('Product updated successfully!', 'success');
      } else {
        // Create new product
        await axiosInstance.post("api/products", productData);
        showStatus('Product created successfully!', 'success');
      }

      // Reset form and fetch updated products
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        quantity: "",
        imagePath: "",
      });
      setEditingProductId(null);
      fetchProducts();
    } catch (error) {
      console.error('Submit error:', error);
      if (error.response?.status === 401) {
        showStatus('Please log in to manage products.', 'error');
        window.location.href = '/login';
      } else {
        showStatus(`Error ${editingProductId ? 'updating' : 'creating'} product. Please try again.`, 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle product edit
  const handleProductEdit = (product) => {
    setEditingProductId(product._id);
    setNewProduct({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      quantity: product.quantity.toString(),
      imagePath: product.imagePath,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditingProductId(null);
    setNewProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      quantity: "",
      imagePath: "",
    });
    setErrors({});
  };

  // Handle product delete
  const handleProductDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await axiosInstance.delete(`api/products/${productId}`);
      showStatus("Product deleted successfully!", "success");
      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
      showStatus("Error deleting product. Please try again.", "error");
    }
  };

  return (
    <div className="seller-container">
      <div className="seller-form-wrapper">
        <div className="seller-header">
          <h2>{editingProductId ? 'Edit Product' : 'Create New Product'}</h2>
          <p>Manage your products here</p>
        </div>

        {submitStatus.show && (
          <div className={`status-message ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        <div className="seller-form">
          <div className="form-fields-container">
            <div className="form-group">
              <label htmlFor="name">Product Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={handleProductChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Product Description *</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter detailed product description"
                value={newProduct.description}
                onChange={handleProductChange}
                className={errors.description ? "error" : ""}
              ></textarea>
              {errors.description && (
                <span className="error-message">{errors.description}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="price">Product Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                placeholder="0.00"
                step="0.01"
                min="0"
                value={newProduct.price}
                onChange={handleProductChange}
                className={errors.price ? "error" : ""}
              />
              {errors.price && (
                <span className="error-message">{errors.price}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <input
                type="text"
                id="category"
                name="category"
                placeholder="Enter product category"
                value={newProduct.category}
                onChange={handleProductChange}
                className={errors.category ? "error" : ""}
              />
              {errors.category && (
                <span className="error-message">{errors.category}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                placeholder="Enter available quantity"
                min="0"
                step="1"
                value={newProduct.quantity}
                onChange={handleProductChange}
                className={errors.quantity ? "error" : ""}
              />
              {errors.quantity && (
                <span className="error-message">{errors.quantity}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="imagePath">Image URL *</label>
              <input
                type="url"
                id="imagePath"
                name="imagePath"
                placeholder="https://example.com/image.jpg"
                value={newProduct.imagePath}
                onChange={handleProductChange}
                className={errors.imagePath ? "error" : ""}
              />
              {errors.imagePath && (
                <span className="error-message">{errors.imagePath}</span>
              )}
            </div>
          </div>

          <div className="button-group">
            <button
              className={`submit-button ${isSubmitting ? "submitting" : ""}`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (editingProductId ? "Updating..." : "Creating...") 
                : (editingProductId ? "Update Product" : "Create Product")}
            </button>
            
            {editingProductId && (
              <button
                className="submit-button"
                onClick={handleCancelEdit}
                disabled={isSubmitting}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        <div className="seller-products">
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
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="no-products">
                      No products found
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product.name}</td>
                      <td>{product.description}</td>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.category}</td>
                      <td>{product.quantity}</td>
                      <td>
                        <button
                          className="toggle-button edit"
                          onClick={() => handleProductEdit(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="toggle-button delete"
                          onClick={() => handleProductDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seller;