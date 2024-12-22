// UserInfo.jsx
import React, { useState } from "react";
import { useCartActions, useCart } from "../../store/Store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./UserInfo.css";

function UserInfo() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="checkout-form">
      <div className="checkout-form-header">
        <h2>Checkout</h2>
        <p>Please fill in your information to complete your order</p>
      </div>
      
      <ContactInformation formData={formData} handleChange={handleChange} />
      <ShippingAddress formData={formData} handleChange={handleChange} />
    </div>
  );
}

function ContactInformation({ formData, handleChange }) {
  return (
    <div className="form-section">
      <h3>Contact Information</h3>
      <div className="form-group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-input"
        />
      </div>
    </div>
  );
}

function ShippingAddress({ formData, handleChange }) {
  const { emptyCart } = useCartActions();
  const cart = useCart();
  const navigate = useNavigate();

  function checkoutHandler() {
    if (cart.length < 1) {
      toast.error("Your shopping cart is empty");
      return;
    }

    const totalPrice = cart.reduce((acc, cur) => {
      return acc + cur.quantity * cur.price;
    }, 0);

    if (totalPrice < 1) {
      toast.error("Cannot process order value of zero(0).");
      return;
    }

    // Validate form
    if (!formData.email || !formData.firstName || !formData.lastName || !formData.address || !formData.city) {
      toast.error("Please fill in all fields");
      return;
    }

    emptyCart();
    toast.success("Order placed successfully!");
    navigate("/");
  }

  return (
    <div className="form-section">
      <h3>Shipping Address</h3>
      <div className="form-row">
        <div className="form-group">
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className="form-input"
          />
        </div>
      </div>
      <div className="form-group">
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="form-input"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="form-input"
        />
      </div>
      <button className="checkout-button" onClick={checkoutHandler}>
        Place Order
      </button>
    </div>
  );
}

export default UserInfo;