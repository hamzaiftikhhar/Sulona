// Auth.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Auth = ({ type = 'login' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your authentication logic here
    
    // After successful authentication, navigate to home
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <div className="auth-header">
          <h2>{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
          <p>
            {type === 'login' 
              ? 'Please enter your details to sign in'
              : 'Please fill in the information below'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {type === 'signup' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
          )}

          {type === 'login' && (
            <div className="forgot-password">
              <button type="button">Forgot password?</button>
            </div>
          )}

          <button type="submit" className="submit-button">
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <div className="auth-switch">
            <span>
              {type === 'login' ? "Don't have an account? " : 'Already have an account? '}
            </span>
            <Link to={type === 'login' ? '/signup' : '/login'}>
              {type === 'login' ? 'Sign up' : 'Sign in'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;

// Navbar.jsx (Update your existing Navbar component)
const Navbar = () => {
  // ... your existing navbar code ...
  
  return (
    <nav className="nav">
      {/* ... other navbar items ... */}
      
      <div className="auth-container">
        <Link to="/login" className="auth-link">Login</Link>
        <span className="auth-divider">|</span>
        <Link to="/signup" className="auth-link">SignUp</Link>
      </div>
    </nav>
  );
};
