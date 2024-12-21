// product/ProductView.jsx
import { useCartActions } from "../../store/Store";
import "./ProductView.css";
import toast from "react-hot-toast";

function ProductView({ productData }) {
  const { addToCart } = useCartActions();

  function handleAddToCart() {
    const cartItem = {
      _id: productData._id, // Using MongoDB _id
      name: productData.name, // Changed from title
      price: productData.price,
      description: productData.description,
      imagePath: productData.imagePath, // Changed from image
      quantity: 1 // Default quantity for cart
    };
    
    addToCart(cartItem);
    toast.success("Added to Cart");
  }

  return (
    <div className="product-container">
      <div className="product-img_wrapper">
        <img src={productData.imagePath} alt={productData.name} /> {/* Changed from image to imagePath */}
      </div>
      <div className="product-info">
        <h2 className="product-name">{productData.name}</h2> {/* Changed from title */}
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