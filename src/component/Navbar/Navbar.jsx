import { useState } from "react";
import { useCart } from "../../store/store";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, MagnifyingGlass, X } from "phosphor-react";
import SlidingCart from "./SlidingCart";
import "./Navbar.css";
import AuthForm from "../Auth/Auth";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout } = useAuth();

  function toggleShowCart() {
    setShowCart(!showCart);
  }

  function toggleSearch() {
    setShowSearch(!showSearch);
  }

  return (
    <header className={`header ${showCart ? "visible" : ""}`}>
      <div className={`search-overlay ${showSearch ? "show" : ""}`}>
        <div className="search-container container">
          <div className="search-header">
            <h2>Search Products</h2>
            <button onClick={toggleSearch} className="close-search">
              <X size={24} weight="bold" />
            </button>
          </div>
          <div className="search-input-wrapper">
            <MagnifyingGlass size={20} weight="bold" />
            <input
              type="text"
              placeholder="Search for products..."
              className="search-input"
              autoFocus
            />
          </div>
          <div className="search-suggestions">
            <h3>Popular Searches</h3>
            <div className="suggestion-tags">
              <span>Dresses</span>
              <span>Jackets</span>
              <span>Accessories</span>
              <span>New Arrivals</span>
            </div>
          </div>
        </div>
      </div>
      <Navigations toggleShowCart={toggleShowCart} toggleSearch={toggleSearch} />
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
    <button onClick={toggleShowCart} className="cart-icon">
      <ShoppingCart size={22} weight="bold" />
      <div className="cart-counter">{totalCartQty || 0}</div>
    </button>
  );
}

function Navigations({ toggleShowCart, toggleSearch }) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, logout } = useAuth();

  function handleOpenNavigation() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <nav className={`nav container ${isNavOpen ? "nav-open" : ""}`}>
      <div className="nav-left">
        <div className="nav-secondary_btn" onClick={handleOpenNavigation}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <span className="brand-name">
          <Link to="/">SOLUNA</Link>
        </span>
      </div>

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
            <NavLink to="/Seller">Admin Dashboard</NavLink>
          </li>
        )}
      </ul>

      <div className="nav-right">
        <button className="search-button" onClick={toggleSearch}>
          <MagnifyingGlass size={22} weight="bold" />
        </button>
        
        <div className="auth-container">
          {user ? (
            <>
              <span className="user-email">{user.email}</span>
              <span className="auth-divider">|</span>
              <button onClick={logout} className="auth-link">
                Logout
              </button>
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
      </div>

      <div className="nav-overlay"></div>
    </nav>
  );
}

function CartSliderOverlay() {
  return <div className="cart-slide_overlay"></div>;
}

export default Navbar;