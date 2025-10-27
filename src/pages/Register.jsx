import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const [googleAccounts] = useState([
    { email: 'user1@gmail.com', name: 'User One' },
    { email: 'user2@gmail.com', name: 'User Two' },
    { email: 'user3@gmail.com', name: 'User Three' }
  ]);
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверка паролей
    if (formData.password !== formData.confirmPassword) {
      return setError(t('register.passwordsDontMatch'));
    }
    
    if (formData.password.length < 6) {
      return setError(t('register.passwordTooShort'));
    }
    
    try {
      setError('');
      setLoading(true);
      await signup(formData);
      navigate('/profile'); 
    } catch (err) {
      setError(t('register.registrationFailed'));
    }
    
    setLoading(false);
  };

  // Show Google account selection
  const handleGoogleRegisterClick = () => {
    setShowAccountSelection(true);
  };

  // Handle account selection
  const handleAccountSelect = async (account) => {
    try {
      setError('');
      setLoading(true);
      setShowAccountSelection(false);
      
      const googleUserData = {
        name: account.name,
        email: account.email,
        password: 'google123',
        confirmPassword: 'google123'
      };
      
      await signup(googleUserData);
      navigate('/profile');
    } catch (err) {
      setError(t('register.registrationFailed'));
      setLoading(false);
    }
  };

  // Close account selection modal
  const closeAccountSelection = () => {
    setShowAccountSelection(false);
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">{t('register.title')}</h1>
        
        {error && <div className="register-error">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="register-field">
            <label>{t('register.fullName')}</label>
            <input
              type="text"
              name="name"
              className="register-input"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="register-field">
            <label>{t('register.email')}</label>
            <input
              type="email"
              name="email"
              className="register-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="register-field">
            <label>{t('register.password')}</label>
            <input
              type="password"
              name="password"
              className="register-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="register-field">
            <label>{t('register.confirmPassword')}</label>
            <input
              type="password"
              name="confirmPassword"
              className="register-input"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="register-btn"
            disabled={loading}
          >
            {loading ? t('register.signingUp') : t('register.signUp')}
          </button>
        </form>
        
        <div className="divider">
          <span>{t('register.or')}</span>
        </div>
        
        <div className="google-register">
          <button 
            onClick={handleGoogleRegisterClick}
            className="google-btn"
            disabled={loading}
          >
            <div className="google-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
            </div>
            <span>{t('register.signUpWithGoogle')}</span>
          </button>
        </div>
        
        {/* Google Account Selection Modal */}
        {showAccountSelection && (
          <div className="account-selection-overlay" onClick={closeAccountSelection}>
            <div className="account-selection-modal" onClick={(e) => e.stopPropagation()}>
              <div className="account-selection-header">
                <h2>{t('register.chooseAccount')}</h2>
                <button className="close-btn" onClick={closeAccountSelection}>×</button>
              </div>
              <div className="account-list">
                {googleAccounts.map((account, index) => (
                  <div 
                    key={index} 
                    className="account-item"
                    onClick={() => handleAccountSelect(account)}
                  >
                    <div className="account-avatar">
                      {account.name.charAt(0)}
                    </div>
                    <div className="account-info">
                      <div className="account-name">{account.name}</div>
                      <div className="account-email">{account.email}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="account-selection-footer">
                <button className="add-account-btn">
                  {t('register.addAccount')}
                </button>
              </div>
            </div>
          </div>
        )}
        
        <div className="register-footer">
          <p>
            {t('register.alreadyHaveAccount')}{' '}
            <Link to="/login" className="register-link">{t('register.signIn')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;