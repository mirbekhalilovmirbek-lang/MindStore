import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };


  const currentLanguage = i18n.language && i18n.language.length >= 2 ? i18n.language.substring(0, 2) : 'en';

  return (
    <div className="language-selector">
      <button 
        className={`lang-btn ${currentLanguage === 'en' ? 'active' : ''}`}
        onClick={() => changeLanguage('en')}
      >
        EN
      </button>
      <button 
        className={`lang-btn ${currentLanguage === 'ru' ? 'active' : ''}`}
        onClick={() => changeLanguage('ru')}
      >
        RU
      </button>
    </div>
  );
};

export default LanguageSelector;