// Navbar/SlidingCart.jsx
import { ShoppingCart, X } from "phosphor-react";
import { Link } from "react-router-dom";
import { useCartActions } from "../../store/store";
import { useCart } from "../../store/store";
import toast from "react-hot-toast";
import "./SlidingCart.css";

function SlidingCart({ toggleShowCart }) {
  let cart = useCart();
  let { addProductQuantity, removeFromCart } = useCartActions();

  return (
    <div className={`sliding-cart_container`}>
      <CartTop toggleShowCart={toggleShowCart} />
      <CartMain
        cart={cart}
        addProductQuantity={addProductQuantity}
        removeFromCart={removeFromCart}
      />
      <CartCheckOut cart={cart} toggleShowCart={toggleShowCart} />
    </div>
  );
}

function CartTop({ toggleShowCart }) {
  return (
    <div className="cart-top">
      <ShoppingCart size={22} />
      <h2>Your Shopping Carts</h2>
      <div className="close-shopping-cart" onClick={toggleShowCart}>
        <X size="22px" />
      </div>
    </div>
  );
}
function CartProducts({ product, addProductQuantity, removeFromCart }) {
  function inputHandler(e) {
    addProductQuantity(product._id, Number(e.target.value));
  }

  function removeProduct() {
    removeFromCart(product._id);
    toast.error("Removed from Cart ");
  }

  return (
    <div className="cart-product">
      <img src={product.imagePath} alt={product.name} />
      <div className="cart-product_info">
        <h3>{product.name}</h3>
        <p>Category: {product.category}</p>
        <p className="qty">
          Qty:
          <input
            type="number"
            value={product.quantity}
            onChange={inputHandler}
            id="qty"
            min="1"
            max="20"
          />
        </p>
      </div>
      <p className="cart-product_price">
        ${(product.price * product.quantity).toFixed(2)}
      </p>
      <span className="cart-product_x" onClick={removeProduct}>
        <X size="16px" />
      </span>
    </div>
  );
}

function CartMain({ cart, addProductQuantity, removeFromCart }) {
  return (
    <div className="cart-main_container">
      {cart.length < 1 ? (
        <div style={{ textAlign: "center", fontSize: "1.6rem" }}>
          Your cart is empty :(
        </div>
      ) : (
        cart.map((product) => (
          <CartProducts
            key={product._id}
            product={product}
            addProductQuantity={addProductQuantity}
            removeFromCart={removeFromCart}
          />
        ))
      )}
    </div>
  );
}

function CartCheckOut({ cart, toggleShowCart }) {
  const totalPrice = cart.reduce((accumulator, current) => {
    return accumulator + current.price * current.quantity;
  }, 0);

  return (
    <div className="cart-checkout_container">
      <h3>Checkout</h3>
      <p>${totalPrice.toFixed(2)}</p>
      <Link to="checkout" onClick={toggleShowCart}>
        Go to Checkout
      </Link>
    </div>
  );
}
export default SlidingCart;
