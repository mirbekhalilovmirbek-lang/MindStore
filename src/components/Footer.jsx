import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';
import { FaGithub, FaWhatsapp, FaInstagram, FaTelegramPlane } from 'react-icons/fa';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>LearnIT</h3>
          <p>{t('footer.description')}</p>
        </div>

        <div className="footer-section">
          <h4>{t('footer.quickLinks')}</h4>
          <ul>
            <li><a href="/">{t('header.home')}</a></li>
            <li><a href="/courses">{t('header.courses')}</a></li>
            <li><a href="/books">{t('header.books')}</a></li>
            <li><a href="/about">{t('footer.about')}</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t('footer.support')}</h4>
          <ul>
            <li><a href="/contact">{t('footer.contact')}</a></li>
            <li><a href="/faq">{t('footer.faq')}</a></li>
            <li><a href="/terms">{t('footer.terms')}</a></li>
            <li><a href="/privacy">{t('footer.privacy')}</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t('footer.contact')}</h4>
          <p>{t('footer.email')}: mirbekhalilov470@gmail.com</p>
          <p>{t('footer.phone')}: +996 (703) 15 33 55</p>

          <div className="social-icons">
            <a
              href="https://github.com/mirbekhalilovmirbek-lang"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://wa.me/996703153355"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://instagram.com/u1_anovich"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://t.me/Mirbek_08"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
            >
              <FaTelegramPlane />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
      </div>
    </footer>
  );
};

export default Footer;
