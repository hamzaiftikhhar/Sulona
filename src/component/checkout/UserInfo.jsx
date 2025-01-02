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
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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

  async function checkoutHandler() {
    try {
      // Existing validation checks
      if (cart.length < 1) {
        toast.error("Your shopping cart is empty");
        return;
      }

      const subtotal = cart.reduce((acc, cur) => {
        return acc + cur.quantity * cur.price;
      }, 0);

      if (subtotal < 1) {
        toast.error("Cannot process order value of zero(0).");
        return;
      }

      if (
        !formData.email ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.address ||
        !formData.city
      ) {
        toast.error("Please fill in all fields");
        return;
      }

      // Show loading state
      toast.loading("Processing your order...");

      // Calculate order summary
      const shipping = 0; // Free shipping
      const total = subtotal + shipping;

      // Send order to backend
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          formData: {
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            address: formData.address,
            city: formData.city,
          },
          cart: cart,
          subtotal: subtotal,
          shipping: 0,
          total: subtotal,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", errorText);
        throw new Error("Failed to create order");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      // Clear cart and show success message
      emptyCart();
      toast.dismiss(); // Clear the loading toast
      toast.success("Order placed successfully!");

      // Store order ID and navigate
      localStorage.setItem("lastOrderId", data.orderId);
      navigate(`/order-success/${data.orderId}`);
    } catch (error) {
      toast.dismiss(); // Clear the loading toast
      toast.error(error.message || "Error placing order");
      console.error("Checkout error:", error);
    }
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
