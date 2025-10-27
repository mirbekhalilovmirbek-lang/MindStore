import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const [googleAccounts] = useState([
    { email: 'user1@gmail.com', name: 'User One' },
    { email: 'user2@gmail.com', name: 'User Two' },
    { email: 'user3@gmail.com', name: 'User Three' }
  ]);
  const { login } = useAuth();
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
    try {
      setError('');
      setLoading(true);
      await login(formData.email, formData.password);
      navigate('/profile');
    } catch (err) {
      setError(t('login.invalidCredentials'));
    }
    setLoading(false);
  };

  // Show Google account selection
  const handleGoogleLoginClick = () => {
    setShowAccountSelection(true);
  };

  // Handle account selection
  const handleAccountSelect = async (account) => {
    try {
      setError('');
      setLoading(true);
      setShowAccountSelection(false);
      
      // For Google login, we'll use a fixed password for simulation
      await login(account.email, 'google123');
      navigate('/profile');
    } catch (err) {
      setError(t('login.invalidCredentials'));
      setLoading(false);
    }
  };

  // Close account selection modal
  const closeAccountSelection = () => {
    setShowAccountSelection(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">
          {t('login.title') || 'Вход в LearnIT'}
        </h1>
        <p className="login-subtitle">
          {t('login.welcome') || 'Добро пожаловать обратно в LearnIT'}
        </p>

        {error && (
          <div className="login-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="login-field">
            <label>
              {t('login.email') || 'Электронная почта'}
            </label>
            <div className="input-wrapper">
              <FaEnvelope className="icon" />
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field">
            <label>
              {t('login.password') || 'Пароль'}
            </label>
            <div className="input-wrapper">
              <FaLock className="icon" />
              <input
                type="password"
                name="password"
                placeholder={t('login.enterPassword') || 'Введите пароль'}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Remember + Forgot password */}
          <div className="login-options">
            <label>
              <input type="checkbox" />
              <span>{t('login.rememberMe') || 'Запомнить меня'}</span>
            </label>
            <Link to="/forgot-password">
              {t('login.forgotPassword') || 'Забыли пароль?'}
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="login-btn"
          >
            {loading ? t('login.signingIn') || 'Входим...' : t('login.signIn') || 'Войти'}
          </button>
        </form>

        <div className="divider">
          <span>{t('login.or') || t('register.or') || 'или'}</span>
        </div>

        <div className="google-login">
          <button 
            onClick={handleGoogleLoginClick}
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
            <span>{t('login.signInWithGoogle') || t('register.signUpWithGoogle') || 'Войти через Google'}</span>
          </button>
        </div>

        {/* Google Account Selection Modal */}
        {showAccountSelection && (
          <div className="account-selection-overlay" onClick={closeAccountSelection}>
            <div className="account-selection-modal" onClick={(e) => e.stopPropagation()}>
              <div className="account-selection-header">
                <h2>{t('login.chooseAccount') || t('register.chooseAccount') || 'Выберите аккаунт'}</h2>
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
                  {t('login.addAccount') || t('register.addAccount') || 'Добавить другой аккаунт'}
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="login-footer">
          {t('login.dontHaveAccount') || 'Нет аккаунта?'}{' '}
          <Link to="/register" className="login-link">
            {t('login.signUp') || 'Зарегиструйтесь здесь'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;