import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import LanguageSelector from './LanguageSelector';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();
  const { cartCount } = useCart();
  const { currentUser } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const [updateKey, setUpdateKey] = useState(0);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    setUpdateKey(prev => prev + 1);
  }, [favoritesCount, cartCount]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header key={updateKey} className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img 
              src="https://cdn-icons-png.flaticon.com/256/9956/9956343.png" 
              alt="MindStore Logo" 
              className="logo-image"
            />
            <span className="logo-text">{t('header.logo')}</span>
          </Link>
        </div>
        
        <nav className="nav">
          <ul className="nav-list">
            <li><Link to="/">{t('header.home')}</Link></li>
            <li><Link to="/courses">{t('header.courses')}</Link></li>
            <li><Link to="/books">{t('header.books')}</Link></li>
            <li><Link to="/lectures">{t('header.lectures')}</Link></li>
            <li><Link to="/podcasts">{t('header.podcasts')}</Link></li>
            {/* <li><Link to="/installment">{t('header.installment')}</Link></li> */}
            <li><Link to="/reservation">{t('header.reserve')}</Link></li>
            <li><Link to="/map">{t('header.locations')}</Link></li>
          </ul>
        </nav>
        
        <div className="header-actions">
          <Link to="/favorites" className="favorites-link">
            <span className="favorites-icon">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Heart_coraz%C3%B3n.svg/1200px-Heart_coraz%C3%B3n.svg.png " alt="Favorites" style={{ width: '30px', height: '30px', color: '#e50914' }} />
            </span>
            {favoritesCount > 0 && <span className="favorites-count">{favoritesCount}</span>}
          </Link>
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">
              <img src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png " alt="Cart" style={{ width: '30px', height: '30px', color: '#1a1a1a' }} />
            </span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>

          {currentUser ? (
            <>
              <Link to="/profile" className="profile-link">
                <img src="https://svgsilh.com/svg_v2/1699635.svg" alt="Profile" style={{ width: '30px', height: '30px' }} />
              </Link>
              {currentUser.role === 'admin' && (
                <Link to="/admin" className="admin-link">
                  <span className="admin-icon">⚙️</span>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="login-link">
                <span className="login-text">{t('header.login')}</span>
              </Link>
              <Link to="/register" className="register-link">
                <span className="register-text">{t('header.register')}</span>
              </Link>
            </>
          )}
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <LanguageSelector />
        </div>
        
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      <div ref={mobileMenuRef} className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="logo">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <img 
                src="https://cdn-icons-png.flaticon.com/256/9956/9956343.png" 
                alt="MindStore Logo" 
                className="logo-image"
              />
              <span className="logo-text">{t('header.logo')}</span>
            </Link>
          </div>
          <button 
            className="mobile-menu-close"
            onClick={() => setIsMenuOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <ul className="mobile-nav-list">
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>{t('header.home')}</Link></li>
          <li><Link to="/courses" onClick={() => setIsMenuOpen(false)}>{t('header.courses')}</Link></li>
          <li><Link to="/books" onClick={() => setIsMenuOpen(false)}>{t('header.books')}</Link></li>
          <li><Link to="/lectures" onClick={() => setIsMenuOpen(false)}>{t('header.lectures')}</Link></li>
          <li><Link to="/podcasts" onClick={() => setIsMenuOpen(false)}>{t('header.podcasts')}</Link></li>
          {/* <li><Link to="/installment" onClick={() => setIsMenuOpen(false)}>{t('header.installment')}</Link></li> */}
          <li><Link to="/reservation" onClick={() => setIsMenuOpen(false)}>{t('header.reserve')}</Link></li>
          <li><Link to="/map" onClick={() => setIsMenuOpen(false)}>{t('header.locations')}</Link></li>
        </ul>
        
        <div className="mobile-header-actions">
          <Link to="/favorites" className="favorites-link" onClick={() => setIsMenuOpen(false)}>
            <span className="favorites-icon">❤️</span>
            {favoritesCount > 0 && <span className="favorites-count">{favoritesCount}</span>}
          </Link>
          <Link to="/cart" className="cart-link" onClick={() => setIsMenuOpen(false)}>
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          {currentUser ? (
            <>
              <Link to="/profile" className="profile-link" onClick={() => setIsMenuOpen(false)}>
                <span className="profile-icon">👤</span>
              </Link>
              {currentUser.role === 'admin' && (
                <Link to="/admin" className="admin-link" onClick={() => setIsMenuOpen(false)}>
                  <span className="admin-icon">⚙️</span>
                </Link>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="login-link" onClick={() => setIsMenuOpen(false)}>
                <span className="login-text">{t('header.login')}</span>
              </Link>
              <Link to="/register" className="register-link" onClick={() => setIsMenuOpen(false)}>
                <span className="register-text">{t('header.register')}</span>
              </Link>
            </>
          )}
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
};

export default Header;