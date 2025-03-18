// OrderSummary.jsx
import React from "react";
import { useCart } from "../../store/store";
import "./OrderSummary.css";

function OrderSummary() {
  const cart = useCart();
  
  const subtotal = cart.reduce((acc, cur) => {
    return acc + (cur.quantity || 0) * cur.price;
  }, 0);

  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="order-summary">
      <div className="order-summary-header">
        <h3>Order Summary</h3>
      </div>
      
      <div className="order-items">
        {cart.map((product) => (
          <SoloBill product={product} key={product._id} />
        ))}
      </div>

      <div className="order-calculations">
        <div className="calculation-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="calculation-row">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="calculation-row total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

function SoloBill({ product }) {
  return (
    <div className="order-item">
      <div className="item-details">
        <span className="item-quantity">{product.quantity}x</span>
        <span className="item-name">{product.name}</span>
      </div>
      <span className="item-price">${(product.quantity * product.price).toFixed(2)}</span>
    </div>
  );
}

export default OrderSummary;