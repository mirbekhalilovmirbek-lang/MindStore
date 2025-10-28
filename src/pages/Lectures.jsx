import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { convertUsdToKgs, formatKgsPrice } from '../utils/currency';
import './Lectures.css';

const Lectures = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  const { t, i18n } = useTranslation();

  // Define lectures data with translation functions
  const getLecturesData = () => [
    {
      id: 1,
      title: t('lecturesData.lecture1.title'),
      speaker: t('lecturesData.lecture1.speaker'),
      category: "IT",
      price: 19.99,
      rating: 4.8,
      duration: "90 min",
      date: "2025-11-15",
      image: "https://media.licdn.com/dms/image/v2/D4E12AQE4hgOBiPsHYA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1675088136886?e=2147483647&v=beta&t=Jly0d_jHU4YZDpbJzO3DNk9Op7zTzi2nnOXCxagpF4E",
      description: t('lecturesData.lecture1.description')
    },
    {
      id: 2,
      title: t('lecturesData.lecture2.title'),
      speaker: t('lecturesData.lecture2.speaker'),
      category: i18n.language === 'ru' ? "Дизайн" : "Design",
      price: 14.99,
      rating: 4.9,
      duration: "75 min",
      date: "2025-11-20",
      image: "https://wefttechnologies.com/wp-content/uploads/2025/03/UIUX-Design-Services-.jpg",
      description: t('lecturesData.lecture2.description')
    },
    {
      id: 3,
      title: t('lecturesData.lecture3.title'),
      speaker: t('lecturesData.lecture3.speaker'),
      category: "IT",
      price: 24.99,
      rating: 4.7,
      duration: "120 min",
      date: "2025-11-25",
      image: "https://miro.medium.com/1*VRbrA-5P0bs5qNseo-eU-A.jpeg",
      description: t('lecturesData.lecture3.description')
    },
    {
      id: 4,
      title: t('lecturesData.lecture4.title'),
      speaker: t('lecturesData.lecture4.speaker'),
      category: i18n.language === 'ru' ? "Языки" : "Languages",
      price: 12.99,
      rating: 4.6,
      duration: "60 min",
      date: "2025-12-01",
      image: "https://www.lingomastery.com/wp-content/uploads/2021/02/Conversational-French-Dialogues_mockup.png",
      description: t('lecturesData.lecture4.description')
    },
    {
      id: 5,
      title: t('lecturesData.lecture5.title'),
      speaker: t('lecturesData.lecture5.speaker'),
      category: i18n.language === 'ru' ? "Бизнес" : "Business",
      price: 19.99,
      rating: 4.7,
      duration: "90 min",
      date: "2025-12-05",
      image: "https://assets.everspringpartners.com/dims4/default/5c7264b/2147483647/strip/true/crop/900x540+0+0/resize/800x480!/quality/90/?url=http%3A%2F%2Feverspring-brightspot.s3.us-east-1.amazonaws.com%2Fc3%2F8c%2F6d5dafeb4f19aaac980b3b53bf4f%2Fcrypto-currency-block-chain-and-business.jpg",
      description: t('lecturesData.lecture5.description')
    },
    {
      id: 6,
      title: t('lecturesData.lecture6.title'),
      speaker: t('lecturesData.lecture6.speaker'),
      category: i18n.language === 'ru' ? "Дизайн" : "Design",
      price: 17.99,
      rating: 4.8,
      duration: "100 min",
      date: "2025-12-10",
      image: "https://s3-alpha.figma.com/hub/file/6445916508/15a35054-f9bd-4e2f-8073-ef10ae6ae694-cover.png",
      description: t('lecturesData.lecture6.description')
    }
  ];

  // Get categories based on current language
  const getCategories = () => 
    i18n.language === 'ru' 
      ? ['all', 'IT', 'Дизайн', 'Языки', 'Бизнес'] 
      : ['all', 'IT', 'Design', 'Languages', 'Business'];

  // Update lectures and categories when language changes
  const [lectures, setLectures] = useState(getLecturesData());
  const [categories, setCategories] = useState(getCategories());

  useEffect(() => {
    setLectures(getLecturesData());
    setCategories(getCategories());
  }, [i18n.language, i18n, t]);

  const filteredLectures = lectures.filter(lecture => {
    const matchesCategory = selectedCategory === 'all' || lecture.category === selectedCategory;
    const matchesSearch = lecture.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lecture.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Function to search Google for lecture content
  const searchGoogle = (lecture) => {
    const searchQuery = `${lecture.title} ${lecture.speaker}`;
    const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;
    window.open(googleSearchUrl, '_blank');
  };

  const handleAddToCart = (lecture) => {
    // Add lecture type to distinguish from other item types
    const lectureItem = { ...lecture, type: 'lecture' };
    addToCart(lectureItem);
  };

  return (
    <div className="lectures">
      <section className="section">
        <h1 className="section-title">{t('lectures.title')}</h1>
        
        <div className="lectures-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder={t('lectures.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
            />
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? t('courses.all') : category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="lectures-grid grid grid-cols-3">
          {filteredLectures.map(lecture => (
            <div key={lecture.id} className="lecture-card card">
              <div className="lecture-image">
                <img src={lecture.image} alt={lecture.title} />
                <div className="lecture-date">{lecture.date}</div>
              </div>
              <div className="lecture-content">
                <div className="lecture-category">{lecture.category}</div>
                <h3 className="lecture-title">{lecture.title}</h3>
                <p className="lecture-speaker">{t('courses.by')} {lecture.speaker}</p>
                
                <div className="lecture-meta">
                  <div className="lecture-rating">
                    ⭐ {lecture.rating} ({lecture.duration})
                  </div>
                  <div className="lecture-price">{formatKgsPrice(convertUsdToKgs(lecture.price))} KGS</div>
                </div>
                
                <div className="lecture-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => searchGoogle(lecture)}
                  >
                    {t('lectures.searchGoogle') || 'Search Google'}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleAddToCart(lecture)}
                  >
                    {t('cart.title')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredLectures.length === 0 && (
          <div className="no-results">
            <h3>{t('lectures.noLectures')}</h3>
            <p>{t('courses.tryAdjusting')}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Lectures;