import { useCart } from "../../store/Store";
import "./OrderSummary.css";

function OrderSummary() {
  const cart = useCart();
  
  const allSoloProducts = cart.map((product) => (
    <SoloBill product={product} key={product._id} />
  ));

  const totalPrice = cart.reduce((acc, cur) => {
    return acc + (cur.quantity || 0) * cur.price;
  }, 0);

  return (
    <div className="order-summary_container">
      <h3>Order Summary</h3>
      <div className="order-summary">{allSoloProducts}</div>
      <div className="order-total solo-bill">
        <p>Total</p>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
}

function SoloBill({ product }) {
  return (
    <div className="solo-bill">
      <p>
        <b>{product.quantity}</b> * <b>{product.name}</b>
      </p>
      <span>${(product.quantity * product.price).toFixed(2)}</span>
    </div>
  );
}

export default OrderSummary;