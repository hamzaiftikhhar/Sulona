// frontend/src/components/Auth/Auth.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosConfig';
import './Auth.css';

const Auth = ({ type = 'login' }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match for signup
    if (type === 'signup' && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const response = await axiosInstance.post(endpoint, {
        email: formData.email,
        password: formData.password
      });

      // Handle successful auth
      login(response.data.user, response.data.token);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
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

        {error && <div className="error-message">{error}</div>}

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

          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Loading...' : (type === 'login' ? 'Sign In' : 'Create Account')}
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