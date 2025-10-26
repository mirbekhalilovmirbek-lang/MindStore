import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import { convertUsdToKgs, formatKgsPrice } from '../utils/currency';
import './Courses.css';

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { t, i18n } = useTranslation();

  // Define courses data with translation functions
  const getCoursesData = () => [
    {
      id: 1,
      type: 'course',
      title: t('coursesData.course1.title'),
      instructor: t('coursesData.course1.instructor'),
      category: "IT",
      price: 89.99,
      rating: 4.8,
      students: 1250,
      image: "https://miro.medium.com/v2/resize:fit:1360/0*zKcKlO3LuHbEBD2e.jpg",
      description: t('coursesData.course1.description')
    },
    {
      id: 2,
      type: 'course',
      title: t('coursesData.course2.title'),
      instructor: t('coursesData.course2.instructor'),
      category: i18n.language === 'ru' ? "Дизайн" : "Design",
      price: 79.99,
      rating: 4.9,
      students: 980,
      image: "https://kryvyirih.dp.ua/wp-content/uploads/2024/05/%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_2024-05-06_174242757.png",
      description: t('coursesData.course2.description')
    },
    {
      id: 3,
      type: 'course',
      title: t('coursesData.course3.title'),
      instructor: t('coursesData.course3.instructor'),
      category: "IT",
      price: 99.99,
      rating: 4.7,
      students: 2100,
      image: "https://www.accuwebhosting.com/blog/wp-content/uploads/2023/06/pythom-data-science.jpg",
      description: t('coursesData.course3.description')
    },
    {
      id: 4,
      type: 'course',
      title: t('coursesData.course4.title'),
      instructor: t('coursesData.course4.instructor'),
      category: i18n.language === 'ru' ? "Языки" : "Languages",
      price: 59.99,
      rating: 4.6,
      students: 750,
      image: "https://lingopie.com/blog/content/images/2025/04/Green-Modern-Inspiring-Quote-Instagram-Post-3.jpeg",
      description: t('coursesData.course4.description')
    },
    {
      id: 5,
      type: 'course',
      title: t('coursesData.course5.title'),
      instructor: t('coursesData.course5.instructor'),
      category: i18n.language === 'ru' ? "Бизнес" : "Business",
      price: 89.99,
      rating: 4.8,
      students: 1520,
      image: "https://www.digitalixhub.com/cdn/shop/files/33ip1dVvREWAXGb4w9JqKQ_1.webp?v=1727449512",
      description: t('coursesData.course5.description')
    },
    {
      id: 6,
      type: 'course',
      title: t('coursesData.course6.title'),
      instructor: t('coursesData.course6.instructor'),
      category: "IT",
      price: 94.99,
      rating: 4.7,
      students: 890,
      image: "https://www.addevice.io/storage/ckeditor/uploads/images/65f840d316353_mobile.app.development.1920.1080.png",
      description: t('coursesData.course6.description')
    }
  ];

  // Get categories based on current language
  const getCategories = () => 
    i18n.language === 'ru' 
      ? ['all', 'IT', 'Дизайн', 'Языки', 'Бизнес'] 
      : ['all', 'IT', 'Design', 'Languages', 'Business'];

  // Update courses and categories when language changes
  const [courses, setCourses] = useState(getCoursesData());
  const [categories, setCategories] = useState(getCategories());

  useEffect(() => {
    setCourses(getCoursesData());
    setCategories(getCategories());
  }, [i18n.language, i18n, t]);

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleToggleFavorite = (course) => {
    if (isFavorite(course.id)) {
      removeFromFavorites(course.id);
    } else {
      addToFavorites(course);
    }
  };

  const handleAddToCart = (course) => {
    addToCart(course);
  };

  return (
    <div className="courses">
      <section className="section">
        <h1 className="section-title">{t('courses.title')}</h1>
        
        <div className="courses-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder={t('courses.searchPlaceholder')}
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
        
        <div className="courses-grid grid grid-cols-3">
          {filteredCourses.map(course => (
            <div key={course.id} className="course-card card">
              <div className="course-image">
                <img src={course.image} alt={course.title} />
              </div>
              <div className="course-content">
                <div className="course-category">{course.category}</div>
                <h3 className="course-title">{course.title}</h3>
                <p className="course-instructor">{t('courses.by')} {course.instructor}</p>
                <p className="course-description">{course.description}</p>
                
                <div className="course-meta">
                  <div className="course-rating">
                    ⭐ {course.rating} ({course.students} {t('courses.students')})
                  </div>
                  <div className="course-price">{formatKgsPrice(convertUsdToKgs(course.price))} KGS</div>
                </div>
                
                <div className="course-actions">
                  <Link to={`/course/${course.id}`} className="btn btn-primary">{t('header.courses')}</Link>
                  <button 
                    className={`btn ${isFavorite(course.id) ? 'btn-secondary' : 'btn-outline'}`}
                    onClick={() => handleToggleFavorite(course)}
                  >
                    {isFavorite(course.id) ? '❤️ Saved' : '🤍 Save'}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleAddToCart(course)}
                  >
                    {t('cart.title')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredCourses.length === 0 && (
          <div className="no-results">
            <h3>{t('courses.noCourses')}</h3>
            <p>{t('courses.tryAdjusting')}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Courses;