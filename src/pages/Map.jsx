import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Map.css';

const Map = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { t } = useTranslation();

  // Updated location data with only 2 Bishkek addresses (removed MindStore Бишкек 2)
  const locations = [
    {
      id: 1,
      name: "MindStore Бишкек 1",
      address: "Турусбекова 109/1, Бишкек",
      phone: "+996 (312) 555-123",
      hours: "Пн-Пт: 9:00-18:00, Сб-Вс: 10:00-16:00",
      lat: 42.874621,
      lng: 74.619389,
      services: ["Курсы", "Книги", "Тестовый центр"],
      mapUrl: "https://2gis.kg/bishkek/search/%D0%A2%D1%83%D1%80%D1%83%D1%81%D0%B1%D0%B5%D0%BA%D0%BE%D0%B2%D0%B0%20109%2F1"
    },
  ];

  return (
    <div className="map-page">
      <section className="section">
        <h1 className="section-title">{t('map.title')}</h1>
        
        <div className="map-content">
          <div className="map-container card">
            {selectedLocation ? (
              <div className="map-embed-container">
                <div className="map-info">
                  <h3>{selectedLocation.name}</h3>
                  <p>{t('map.mapDescription')}</p>
                  <a 
                    href={selectedLocation.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn btn-primary map-link"
                  >
                    {t('map.viewOn2GIS')}
                  </a>
                  <p className="map-note">{t('map.note')}</p>
                </div>
              </div>
            ) : (
              <div className="map-placeholder">
                <div className="map-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/61/61165.png" alt="Map" style={{ width: '48px', height: '48px' }} />
                </div>
                <h3>{t('map.interactiveMap')}</h3>
                <p>{t('map.mapDescription')}</p>
                <p className="map-note">{t('map.note')}</p>
              </div>
            )}
          </div>
          
          <div className="locations-list">
            <h2>{t('map.findLocation')}</h2>
            <div className="search-bar">
              <input 
                type="text" 
                className="form-input" 
                placeholder={t('map.searchPlaceholder')}
              />
            </div>
            
            {/* Single scrollable card for all locations */}
            <div className="locations-card card">
              <div className="locations-scroll-container">
                {locations.map(location => (
                  <div 
                    key={location.id}
                    className={`location-card ${selectedLocation?.id === location.id ? 'selected' : ''}`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <h3>{location.name}</h3>
                    <p className="location-address">{location.address}</p>
                    <p className="location-phone">📞 {location.phone}</p>
                    <p className="location-hours">🕒 {location.hours}</p>
                    
                    <div className="location-services">
                      <h4>{t('map.services')}:</h4>
                      <div className="services-list">
                        {location.services.map((service, index) => (
                          <span key={index} className="service-tag">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="location-actions">
                      <button className="btn btn-primary">{t('map.getDirections')}</button>
                      <button className="btn btn-secondary">{t('map.callNow')}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Map;