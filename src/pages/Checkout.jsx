import React from "react";
import "./Checkout.css";
import UserInfo from "../component/checkout/UserInfo";
import OrderSummary from "../component/checkout/OrderSummary";
import Footer from "../component/Footer/Footer";

function Checkout() {
  return (
    <>
    <div className="container checkout-container">
      <UserInfo />
      <OrderSummary />
    </div>
    <Footer/>
    </>
  );
}

export default Checkout;
