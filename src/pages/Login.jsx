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

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">
          {t('login.title') || 'Вход в SkillZone'}
        </h1>
        <p className="login-subtitle">
          {t('login.welcome') || 'Добро пожаловать обратно в SkillZone'}
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