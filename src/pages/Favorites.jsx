import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../contexts/FavoritesContext';
import './Favorites.css';

const Favorites = ({ hideEmptyState = false, hideTitle = false }) => {
  const { favorites, removeFromFavorites, favoritesCount } = useFavorites();
  const { t } = useTranslation();

  // Function to handle image errors
  const handleImageError = (e) => {
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23888'%3ENo Image%3C/text%3E%3C/svg%3E";
  };

  const handleRemoveFavorite = (id) => {
    removeFromFavorites(id);
  };

  return (
    <div className="favorites">
      <section className="section">
        {!hideTitle && <h1 className="section-title">❤️ {t('favorites.title')}</h1>}
        
        {favorites.length === 0 ? (
          hideEmptyState ? null : (
          <div className="empty-favorites">
            <h2>{t('favorites.empty')}</h2>
            <p>{t('favorites.startAdding')}</p>
            <Link to="/courses" className="btn btn-primary">{t('favorites.browse')}</Link>
          </div>
          )
        ) : (
          <div className="favorites-content">
            <div className="favorites-grid grid grid-cols-3">
              {favorites.map(item => (
                <div key={item.id} className="favorite-card card">
                  <div className="favorite-image">
                    <img src={item.image} alt={item.title} onError={handleImageError} />
                  </div>
                  <div className="favorite-content">
                    <div className="favorite-category">{item.category}</div>
                    <h3 className="favorite-title">{item.title}</h3>
                    <p className="favorite-meta">
                      {item.type === 'course' && `${t('courses.by')} ${item.instructor}`}
                      {item.type === 'book' && `${t('courses.by')} ${item.author}`}
                      {item.type === 'lecture' && `${t('courses.by')} ${item.speaker}`}
                      {item.type === 'podcast' && `${t('courses.by')} ${item.host}`}
                    </p>
                    <p className="favorite-description">{item.description}</p>
                    
                    <div className="favorite-meta-info">
                      <div className="favorite-rating">
                        ⭐ {item.rating}
                      </div>
                      <div className="favorite-price">${item.price.toFixed(2)}</div>
                    </div>
                    
                    <div className="favorite-actions">
                      <Link 
                        to={item.type === 'course' ? `/course/${item.id}` : `/${item.type}/${item.id}`} 
                        className="btn btn-primary"
                      >
                        {t('favorites.viewDetails')}
                      </Link>
                      <button 
                        className="btn btn-secondary remove-from-favorites-btn"
                        onClick={() => handleRemoveFavorite(item.id)}
                      >
                        {t('favorites.remove')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Favorites;