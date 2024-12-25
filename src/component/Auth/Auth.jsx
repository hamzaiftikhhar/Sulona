import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosConfig';
import toast from 'react-hot-toast';
import './Auth.css';

const Auth = ({ type = 'login' }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      setError('All fields are required');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (type === 'signup') {
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }

    return true;
  };

  const handleSuccessfulAuth = async (user, token) => {
    // Store auth data
    localStorage.setItem('token', token);
    localStorage.setItem('userData', JSON.stringify(user));

    // Update auth context
    await login(user, token);

    // Redirect to home page
    navigate('/', { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setIsSubmitting(true);
    const loadingToast = toast.loading(
      type === 'login' ? 'Signing in...' : 'Creating account...'
    );

    try {
      const endpoint = type === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const response = await axiosInstance.post(endpoint, {
        email: formData.email,
        password: formData.password,
      });

      const { user, token } = response.data;

      // Use the refactored function
      await handleSuccessfulAuth(user, token);

      toast.success(
        type === 'login'
          ? 'Welcome back!'
          : 'Account created successfully!',
        { id: loadingToast }
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (type === 'login'
          ? 'Failed to sign in. Please check your credentials.'
          : 'Failed to create account. Please try again.');

      setError(errorMessage);
      toast.error(errorMessage, { id: loadingToast });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError('');
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

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={error && !formData.email ? 'error' : ''}
              aria-invalid={error && !formData.email ? 'true' : 'false'}
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
              onChange={handleInputChange}
              disabled={isSubmitting}
              className={error && !formData.password ? 'error' : ''}
              aria-invalid={error && !formData.password ? 'true' : 'false'}
              minLength={6}
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
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={error && !formData.confirmPassword ? 'error' : ''}
                aria-invalid={error && !formData.confirmPassword ? 'true' : 'false'}
              />
            </div>
          )}

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? type === 'login'
                ? 'Signing in...'
                : 'Creating account...'
              : type === 'login'
              ? 'Sign In'
              : 'Create Account'}
          </button>

          <div className="auth-switch">
            <span>
              {type === 'login'
                ? "Don't have an account? "
                : 'Already have an account? '}
            </span>
            <Link
              to={type === 'login' ? '/signup' : '/login'}
              tabIndex={isSubmitting ? -1 : 0}
            >
              {type === 'login' ? 'Sign up' : 'Sign in'}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
