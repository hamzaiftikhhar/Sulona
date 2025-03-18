// product/ProductView.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCartActions } from "../../store/store";
import "./ProductView.css";
import toast from "react-hot-toast";

function ProductView() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Get the id from URL
  const { addToCart } = useCartActions();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProductData(data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  function handleAddToCart() {
    const cartItem = {
      _id: productData._id,
      name: productData.name,
      price: productData.price,
      description: productData.description,
      imagePath: productData.imagePath,
      quantity: 1
    };
    
    addToCart(cartItem);
    toast.success("Added to Cart");
  }

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!productData) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-container">
      <div className="product-img_wrapper">
        <img 
          src={productData.imagePath.startsWith('http') 
            ? productData.imagePath 
            : `/images/${productData.imagePath}`} 
          alt={productData.name} 
        />
      </div>
      <div className="product-info">
        <h2 className="product-name">{productData.name}</h2>
        <p className="product-price">${productData.price}</p>
        <p className="product-description">{productData.description}</p>
        <p className="product-category">Category: {productData.category}</p>
        <p className="product-stock">In Stock: {productData.quantity}</p>

        <button 
          className="product-cart_btn" 
          onClick={handleAddToCart}
          disabled={productData.quantity <= 0}
        >
          {productData.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}

export default ProductView;