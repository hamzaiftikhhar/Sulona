// explore/ProductCard.jsx
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useCartActions } from "../../store/Store";
import "./ProductCard.css";

function ProductCard({ product }) {
  let { addToCart } = useCartActions();

  function handleAddToCart() {
    const cartItem = {
      _id: product._id,
      name: product.name,
      price: product.price,
      description: product.description,
      imagePath: product.imagePath,
      category: product.category, // Added to match what's shown in cart
      quantity: 1
    };

    addToCart(cartItem);
    toast.success("Added to Cart");
  }

  return (
    <div className="product-card_wrapper">
      <Link to={`/product/${product._id}`}> {/* Changed from id to _id */}
        <div className="product-card_img">
          
          <img src={`../../+${product.imagePath}`} alt={product.name} /> {/* Changed from image to imagePath */}
        </div>
      </Link>
      <div className="product-card_description">
        <h3>{product.name}</h3> {/* Changed from title */}
        <p>{product.description}</p>
        <span className="product-card_bottom">
          <button 
            className="add-cart_btn" 
            onClick={handleAddToCart}
            disabled={product.quantity <= 0}
          >
            {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <b className="product-card_price">${product.price}</b>
        </span>
        <div className="product-card_meta">
          <span className="category">{product.category}</span>
          <span className="stock">Stock: {product.quantity}</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;