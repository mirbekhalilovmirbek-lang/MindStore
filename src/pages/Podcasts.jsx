import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { convertUsdToKgs, formatKgsPrice } from '../utils/currency';
import './Podcasts.css';

const Podcasts = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { addToCart } = useCart();
  const { t, i18n } = useTranslation();

  const getPodcastsData = () => [
    {
      id: 1,
      title: t('podcastsData.podcast1.title'),
      host: t('podcastsData.podcast1.host'),
      category: "IT",
      price: 9.99,
      rating: 4.8,
      episodes: 42,
      duration: "30-45 min",
      image: "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8667c3e9-9667-4e5d-aefc-6717ca9bc518_1600x900.gif",
      description: t('podcastsData.podcast1.description')
    },
    {
      id: 2,
      title: t('podcastsData.podcast2.title'),
      host: t('podcastsData.podcast2.host'),
      category: i18n.language === 'ru' ? "Дизайн" : "Design",
      price: 7.99,
      rating: 4.9,
      episodes: 28,
      duration: "25-40 min",
      image: "https://m.media-amazon.com/images/I/71LnHGtK18S._UF1000,1000_QL80_.jpg",
      description: t('podcastsData.podcast2.description')
    },
    {
      id: 3,
      title: t('podcastsData.podcast3.title'),
      host: t('podcastsData.podcast3.host'),
      category: i18n.language === 'ru' ? "Языки" : "Languages",
      price: 5.99,
      rating: 4.7,
      episodes: 36,
      duration: "20-35 min",
      image: "https://cdn.prod.website-files.com/644c0ecc4a055c732a922d57/658da3d3fad6a31f9d6d383a_new-year01.png",
      description: t('podcastsData.podcast3.description')
    },
    {
      id: 4,
      title: t('podcastsData.podcast4.title'),
      host: t('podcastsData.podcast4.host'),
      category: i18n.language === 'ru' ? "Бизнес" : "Business",
      price: 8.99,
      rating: 4.6,
      episodes: 24,
      duration: "35-50 min",
      image: "https://inspireip.com/wp-content/uploads/2024/10/business-growth-strategies.png",
      description: t('podcastsData.podcast4.description')
    },
    {
      id: 5,
      title: t('podcastsData.podcast5.title'),
      host: t('podcastsData.podcast5.host'),
      category: "IT",
      price: 9.99,
      rating: 4.8,
      episodes: 31,
      duration: "40-55 min",
      image: "https://www.gartner.com/ngw/globalassets/en/data-analytics/images/infographics/gartner-domain-data-and-analytics-framework.png",
      description: t('podcastsData.podcast5.description')
    },
    {
      id: 6,
      title: t('podcastsData.podcast6.title'),
      host: t('podcastsData.podcast6.host'),
      category: i18n.language === 'ru' ? "Дизайн" : "Design",
      price: 6.99,
      rating: 4.7,
      episodes: 19,
      duration: "30-45 min",
      image: "https://usergeneratededucation.wordpress.com/wp-content/uploads/2015/03/creativity-mindset.jpg",
      description: t('podcastsData.podcast6.description')
    }
  ];

  const getCategories = () => 
    i18n.language === 'ru' 
      ? ['all', 'IT', 'Дизайн', 'Языки', 'Бизнес'] 
      : ['all', 'IT', 'Design', 'Languages', 'Business'];

  const [podcasts, setPodcasts] = useState(getPodcastsData());
  const [categories, setCategories] = useState(getCategories());

  useEffect(() => {
    setPodcasts(getPodcastsData());
    setCategories(getCategories());
  }, [i18n.language, i18n, t]);

  const filteredPodcasts = podcasts.filter(podcast => {
    const matchesCategory = selectedCategory === 'all' || podcast.category === selectedCategory;
    const matchesSearch = podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          podcast.host.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (podcast) => {
    const podcastItem = { ...podcast, type: 'podcast' };
    addToCart(podcastItem);
  };

  const handlePreview = (podcast) => {
    console.log('Previewing podcast:', podcast.title);
    alert(`Previewing: ${podcast.title}\n\n${podcast.description}`);
  };

  const handleSubscribe = (podcast) => {
    alert(`You have subscribed to: ${podcast.title}\n\nYou will receive updates about new episodes.`);
    const podcastItem = { ...podcast, type: 'podcast' };
    addToCart(podcastItem);
  };

  return (
    <div className="podcasts">
      <section className="section">
        <h1 className="section-title">{t('podcasts.title')}</h1>
        
        <div className="podcasts-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder={t('podcasts.searchPlaceholder')}
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
        
        <div className="podcasts-grid grid grid-cols-3">
          {filteredPodcasts.map(podcast => (
            <div key={podcast.id} className="podcast-card card">
              <div className="podcast-image">
                <img src={podcast.image} alt={podcast.title} />
                <div className="play-button">▶</div>
              </div>
              <div className="podcast-content">
                <div className="podcast-category">{podcast.category}</div>
                <h3 className="podcast-title">{podcast.title}</h3>
                <p className="podcast-host">{t('courses.by')} {podcast.host}</p>
                <p className="podcast-description">{podcast.description}</p>
                
                <div className="podcast-meta">
                  <div className="podcast-rating">
                    ⭐ {podcast.rating} ({podcast.episodes} {t('courses.students')})
                  </div>
                  <div className="podcast-price">{formatKgsPrice(convertUsdToKgs(podcast.price))} KGS/{t('home.month')}</div>
                </div>
                
                <div className="podcast-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(podcast)}
                  >
                    {t('cart.title')}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleSubscribe(podcast)}
                  >
                    {t('podcasts.subscribe')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredPodcasts.length === 0 && (
          <div className="no-results">
            <h3>{t('podcasts.noPodcasts')}</h3>
            <p>{t('courses.tryAdjusting')}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Podcasts;