// Navbar/Navbar.jsx
import { useState } from "react";
import { useCart } from "../../store/Store";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import SlidingCart from "./SlidingCart";
import "./Navbar.css";
import AuthForm from "../Auth/Auth";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const { user, logout } = useAuth();


  function toggleShowCart() {
    setShowCart(!showCart);
  }
  return (
    <header className={`header ${showCart ? "visible" : ""}`}>
      <Navigations toggleShowCart={toggleShowCart} />
      <SlidingCart toggleShowCart={toggleShowCart} />
      <CartSliderOverlay />
    </header>
  );
}

function CartButton({ toggleShowCart }) {
  const cart = useCart();

  const totalCartQty = cart.reduce((totalQty, current) => {
    return totalQty + (current.quantity || 0); 
  }, 0);

  return (
    <span onClick={toggleShowCart} className="cart-icon">
      <ShoppingCart size={22} />
      <div className="cart-counter">{totalCartQty || 0}</div>
    </span>
  );
}


function Navigations({ toggleShowCart }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, logout } = useAuth();

  function handleOpenNavigation() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <nav className={`nav container ${isNavOpen ? "nav-open" : ""}`}>
      <span className="brand-name">
        <Link to="/">SOLUNA</Link>
      </span>
      <ul className="nav-link_container">
        <li className="nav-link">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/aboutUs">About Us</NavLink>
        </li>
        <li className="nav-link">
          <NavLink to="/explore/all">Explore All</NavLink>
        </li>
        {user && (
          <li className="nav-link">
            <NavLink to="/Seller">Add Product</NavLink>
          </li>
        )}
      </ul>
      <div className="nav-secondary_btn" onClick={handleOpenNavigation}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="auth-container">
        {user ? (
          <>
            <span>{user.email}</span>
            <span className="auth-divider">|</span>
            <Link type="submit" onClick={logout} className="nav-link">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-link">
              Login
            </Link>
            <span className="auth-divider">|</span>
            <Link to="/signup" className="auth-link">
              SignUp
            </Link>
          </>
        )}
      </div>
      <div className="nav-secondary">
        <CartButton toggleShowCart={toggleShowCart} />
      </div>
      <div className="nav-overlay"></div>
    </nav>
  );
}

function CartSliderOverlay() {
  return <div className="cart-slide_overlay"></div>;
}

export default Navbar;
