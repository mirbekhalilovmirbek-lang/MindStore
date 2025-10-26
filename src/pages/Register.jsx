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