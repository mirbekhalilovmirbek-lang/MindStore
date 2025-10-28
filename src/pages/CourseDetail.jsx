import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { convertUsdToKgs, formatKgsPrice } from '../utils/currency';
import './CourseDetail.css';

const CourseDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [quantity, setQuantity] = useState(1);
  const { t, i18n } = useTranslation();

  // Define courses data to match the Courses component
  const getCoursesData = () => [
    {
      id: 1,
      type: 'course',
      title: t('coursesData.course1.title'),
      instructor: t('coursesData.course1.instructor'),
      category: "IT",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      students: 1250,
      duration: "12 hours",
      lectures: 42,
      level: "Advanced",
      language: i18n.language === 'ru' ? "Английский" : "English",
      image: "https://miro.medium.com/v2/resize:fit:1360/0*zKcKlO3LuHbEBD2e.jpg",
      videoPreview: "https://thecuneiform.com/wp-content/uploads/2024/04/MicrosoftTeams-image-59.webp",
      description: t('coursesData.course1.description'),
      highlights: [
        "Advanced React Hooks (useMemo, useCallback, useReducer)",
        "Context API and state management",
        "Performance optimization techniques",
        "Testing React components",
        "Building reusable component libraries"
      ],
      curriculum: [
        {
          section: i18n.language === 'ru' ? "Продвинутые хуки" : "Advanced Hooks",
          lectures: [
            "useMemo and useCallback",
            "useReducer and state management",
            "Custom hooks development"
          ]
        },
        {
          section: i18n.language === 'ru' ? "Оптимизация производительности" : "Performance Optimization",
          lectures: [
            "React.memo and PureComponent",
            "Code splitting with React.lazy",
            "Bundle optimization techniques"
          ]
        },
        {
          section: i18n.language === 'ru' ? "Тестирование" : "Testing",
          lectures: [
            "Jest and React Testing Library",
            "Mocking API calls",
            "End-to-end testing with Cypress"
          ]
        }
      ],
      instructorInfo: {
        name: t('coursesData.course1.instructor'),
        bio: i18n.language === 'ru' 
          ? "Старший инженер фронтенда с более чем 10 летним опытом разработки на React. В настоящее время возглавляет архитектуру фронтенда в крупной технологической компании."
          : "Senior Frontend Engineer with 10+ years of experience in React development. Currently leading frontend architecture at a major tech company.",
        rating: 4.9,
        courses: 12,
        students: 15000
      }
    },
    {
      id: 2,
      type: 'course',
      title: t('coursesData.course2.title'),
      instructor: t('coursesData.course2.instructor'),
      category: i18n.language === 'ru' ? "Дизайн" : "Design",
      price: 79.99,
      originalPrice: 109.99,
      rating: 4.9,
      students: 980,
      duration: "10 hours",
      lectures: 35,
      level: i18n.language === 'ru' ? "Средний" : "Intermediate",
      language: i18n.language === 'ru' ? "Английский" : "English",
      image: "https://thecuneiform.com/wp-content/uploads/2024/04/MicrosoftTeams-image-59.webp",
      videoPreview: "https://thecuneiform.com/wp-content/uploads/2024/04/MicrosoftTeams-image-59.webp",
      description: t('coursesData.course2.description'),
      highlights: [
        "UI/UX design principles",
        "Design systems and component libraries",
        "Prototyping and user testing",
        "Accessibility and inclusive design",
        "Design tools and workflows"
      ],
      curriculum: [
        {
          section: i18n.language === 'ru' ? "Основы дизайна" : "Design Fundamentals",
          lectures: [
            "Color theory and typography",
            "Layout and composition",
            "Visual hierarchy"
          ]
        },
        {
          section: i18n.language === 'ru' ? "Инструменты дизайна" : "Design Tools",
          lectures: [
            "Figma and design systems",
            "Prototyping workflows",
            "Design collaboration"
          ]
        },
        {
          section: i18n.language === 'ru' ? "Пользовательский опыт" : "User Experience",
          lectures: [
            "User research and personas",
            "Usability testing",
            "Accessibility guidelines"
          ]
        }
      ],
      instructorInfo: {
        name: t('coursesData.course2.instructor'),
        bio: i18n.language === 'ru' 
          ? "Дизайнер с 8-летним опытом работы в ведущих технологических компаниях. Эксперт в области UI/UX и дизайн-систем."
          : "Designer with 8 years of experience at leading tech companies. Expert in UI/UX and design systems.",
        rating: 4.8,
        courses: 8,
        students: 12000
      }
    },
    {
      id: 3,
      type: 'course',
      title: t('coursesData.course3.title'),
      instructor: t('coursesData.course3.instructor'),
      category: "IT",
      price: 99.99,
      originalPrice: 139.99,
      rating: 4.7,
      students: 2100,
      duration: "15 hours",
      lectures: 50,
      level: "Advanced",
      language: i18n.language === 'ru' ? "Английский" : "English",
      image: "https://www.accuwebhosting.com/blog/wp-content/uploads/2023/06/pythom-data-science.jpg",
      videoPreview: "https://www.accuwebhosting.com/blog/wp-content/uploads/2023/06/pythom-data-science.jpg",
      description: t('coursesData.course3.description'),
      highlights: [
        "Data analysis with Pandas and NumPy",
        "Data visualization with Matplotlib and Seaborn",
        "Machine learning with Scikit-learn",
        "Statistical analysis and hypothesis testing",
        "Real-world data science projects"
      ],
      curriculum: [
        {
          section: i18n.language === 'ru' ? "Анализ данных" : "Data Analysis",
          lectures: [
            "Data cleaning and preprocessing",
            "Exploratory data analysis",
            "Statistical methods"
          ]
        },
        {
          section: i18n.language === 'ru' ? "Визуализация" : "Visualization",
          lectures: [
            "Matplotlib fundamentals",
            "Advanced Seaborn techniques",
            "Interactive visualizations"
          ]
        },
        {
          section: i18n.language === 'ru' ? "Машинное обучение" : "Machine Learning",
          lectures: [
            "Supervised learning algorithms",
            "Model evaluation and validation",
            "Deep learning basics"
          ]
        }
      ],
      instructorInfo: {
        name: t('coursesData.course3.instructor'),
        bio: i18n.language === 'ru' 
          ? "Доктор науки о данных с 12-летним опытом в академических и промышленных исследованиях. Специализируется на прикладном машинном обучении."
          : "Data Science PhD with 12 years of experience in academic and industry research. Specializes in applied machine learning.",
        rating: 4.7,
        courses: 15,
        students: 18000
      }
    },
    {
      id: 4,
      type: 'course',
      title: t('coursesData.course4.title'),
      instructor: t('coursesData.course4.instructor'),
      category: i18n.language === 'ru' ? "Языки" : "Languages",
      price: 59.99,
      originalPrice: 89.99,
      rating: 4.6,
      students: 750,
      duration: "8 hours",
      lectures: 28,
      level: "Beginner",
      language: i18n.language === 'ru' ? "Испанский" : "Spanish",
      image: "https://lingopie.com/blog/content/images/2025/04/Green-Modern-Inspiring-Quote-Instagram-Post-3.jpeg",
      videoPreview: "https://lingopie.com/blog/content/images/2025/04/Green-Modern-Inspiring-Quote-Instagram-Post-3.jpeg",
      description: t('coursesData.course4.description'),
      highlights: [
        "Basic Spanish vocabulary and grammar",
        "Common phrases and expressions",
        "Pronunciation and listening skills",
        "Cultural context and etiquette",
        "Interactive conversation practice"
      ],
      curriculum: [
        {
          section: i18n.language === 'ru' ? "Основы" : "Basics",
          lectures: [
            "Greetings and introductions",
            "Numbers and basic vocabulary",
            "Present tense verbs"
          ]
        },
        {
          section: i18n.language === 'ru' ? "Грамматика" : "Grammar",
          lectures: [
            "Noun genders and articles",
            "Adjectives and adverbs",
            "Past and future tenses"
          ]
        },
        {
          section: i18n.language === 'ru' ? "Практика" : "Practice",
          lectures: [
            "Role-playing conversations",
            "Listening comprehension",
            "Writing exercises"
          ]
        }
      ],
      instructorInfo: {
        name: t('coursesData.course4.instructor'),
        bio: i18n.language === 'ru' 
          ? "Носитель языка с 10-летним опытом преподавания испанского как иностранного. Специализируется на иммерсивных методах обучения."
          : "Native speaker with 10 years of experience teaching Spanish as a foreign language. Specializes in immersive learning techniques.",
        rating: 4.6,
        courses: 6,
        students: 9500
      }
    },
    {
      id: 5,
      type: 'course',
      title: t('coursesData.course5.title'),
      instructor: t('coursesData.course5.instructor'),
      category: i18n.language === 'ru' ? "Бизнес" : "Business",
      price: 89.99,
      originalPrice: 129.99,
      rating: 4.8,
      students: 1520,
      duration: "14 hours",
      lectures: 45,
      level: "Intermediate",
      language: i18n.language === 'ru' ? "Английский" : "English",
      image: "https://www.digitalixhub.com/cdn/shop/files/33ip1dVvREWAXGb4w9JqKQ_1.webp?v=1727449512",
      videoPreview: "https://www.digitalixhub.com/cdn/shop/files/33ip1dVvREWAXGb4w9JqKQ_1.webp?v=1727449512",
      description: t('coursesData.course5.description'),
      highlights: [
        "Digital marketing strategies",
        "Social media marketing and advertising",
        "SEO and content marketing",
        "Email marketing automation",
        "Analytics and ROI measurement"
      ],
      curriculum: [
        {
          section: i18n.language === 'ru' ? "Основы цифрового маркетинга" : "Digital Marketing Fundamentals",
          lectures: [
            "Marketing channels overview",
            "Target audience analysis",
            "Brand positioning"
          ]
        },
        {
          section: i18n.language === 'ru' ? "Социальные сети" : "Social Media",
          lectures: [
            "Platform-specific strategies",
            "Content creation and curation",
            "Paid advertising"
          ]
        },
        {
          section: i18n.language === 'ru' ? "Аналитика" : "Analytics",
          lectures: [
            "Key metrics and KPIs",
            "Google Analytics setup",
            "ROI optimization"
          ]
        }
      ],
      instructorInfo: {
        name: t('coursesData.course5.instructor'),
        bio: i18n.language === 'ru' 
          ? "Директор по маркетингу с 15-летним опытом в цифровом маркетинге. Руководил маркетинговыми кампаниями для Fortune 500 компаний."
          : "Marketing Director with 15 years of experience in digital marketing. Led marketing campaigns for Fortune 500 companies.",
        rating: 4.8,
        courses: 10,
        students: 22000
      }
    },
    {
      id: 6,
      type: 'course',
      title: t('coursesData.course6.title'),
      instructor: t('coursesData.course6.instructor'),
      category: "IT",
      price: 94.99,
      originalPrice: 134.99,
      rating: 4.7,
      students: 890,
      duration: "16 hours",
      lectures: 48,
      level: "Intermediate",
      language: i18n.language === 'ru' ? "Английский" : "English",
      image: "https://www.addevice.io/storage/ckeditor/uploads/images/65f840d316353_mobile.app.development.1920.1080.png",
      videoPreview: "https://www.addevice.io/storage/ckeditor/uploads/images/65f840d316353_mobile.app.development.1920.1080.png",
      description: t('coursesData.course6.description'),
      highlights: [
        "React Native fundamentals",
        "Cross-platform UI components",
        "Navigation and state management",
        "API integration and data fetching",
        "App deployment and publishing"
      ],
      curriculum: [
        {
          section: i18n.language === 'ru' ? "Основы React Native" : "React Native Basics",
          lectures: [
            "Environment setup",
            "Core components",
            "Styling and layout"
          ]
        },
        {
          section: i18n.language === 'ru' ? "Навигация" : "Navigation",
          lectures: [
            "React Navigation library",
            "Stack and tab navigators",
            "Deep linking"
          ]
        },
        {
          section: i18n.language === 'ru' ? "Развертывание" : "Deployment",
          lectures: [
            "App store preparation",
            "Testing strategies",
            "Performance optimization"
          ]
        }
      ],
      instructorInfo: {
        name: t('coursesData.course6.instructor'),
        bio: i18n.language === 'ru' 
          ? "Разработчик мобильных приложений с 8-летним опытом создания кроссплатформенных решений. Эксперт в React Native и Flutter."
          : "Mobile app developer with 8 years of experience building cross-platform solutions. Expert in React Native and Flutter.",
        rating: 4.7,
        courses: 7,
        students: 11000
      }
    }
  ];

  // Get the course based on the ID from the URL
  const courses = getCoursesData();
  const course = courses.find(course => course.id === parseInt(id)) || courses[0];

  const handleAddToCart = () => {
    // In a real app, this would dispatch an action to add to cart
    alert(i18n.language === 'ru' 
      ? `Добавлено ${quantity} ${course.title} в корзину` 
      : `Added ${quantity} ${course.title} to cart`);
  };

  const handleReserve = () => {
    // In a real app, this would redirect to reservation page
    alert(i18n.language === 'ru' 
      ? `Перенаправление на бронирование для ${course.title}` 
      : `Redirecting to reservation for ${course.title}`);
  };

  // Function to handle image errors
  const handleImageError = (e) => {
    e.target.src = i18n.language === 'ru' 
      ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23888'%3E%D0%9D%D0%B5%D1%82%20%D0%BF%D1%80%D0%B5%D0%B4%D0%BF%D1%80%D0%BE%D1%81%D0%BC%D0%BE%D1%82%D1%80%D0%B0%3C/text%3E%3C/svg%3E" 
      : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='20' fill='%23888'%3ENo Preview%3C/text%3E%3C/svg%3E";
  };

  return (
    <div className="course-detail">
      <div className="course-header">
        <div className="course-image">
          <img src={course.image} alt={course.title} onError={handleImageError} />
        </div>
        <div className="course-info">
          <h1 className="course-title">{course.title}</h1>
          <p className="course-instructor">{i18n.language === 'ru' ? `от ${course.instructor}` : `by ${course.instructor}`}</p>
          
          
          
          <div className="course-price-section">
            <div className="price-container">
              
            </div>
            
           
          </div>
          
          
        </div>
      </div>
      
      <div className="course-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          {i18n.language === 'ru' ? 'Обзор' : 'Overview'}
        </button>
        <button 
          className={`tab ${activeTab === 'curriculum' ? 'active' : ''}`}
          onClick={() => setActiveTab('curriculum')}
        >
          {i18n.language === 'ru' ? 'Учебный план' : 'Curriculum'}
        </button>
        <button 
          className={`tab ${activeTab === 'instructor' ? 'active' : ''}`}
          onClick={() => setActiveTab('instructor')}
        >
          {i18n.language === 'ru' ? 'Инструктор' : 'Instructor'}
        </button>
        <button 
          className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          {i18n.language === 'ru' ? 'Отзывы' : 'Reviews'}
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="video-preview">
              <img src={course.videoPreview} alt={i18n.language === 'ru' ? 'Предварительный просмотр курса' : 'Course Preview'} onError={handleImageError} />
            </div>
            
            <div className="course-description">
              <h2>{i18n.language === 'ru' ? 'Описание курса' : 'Course Description'}</h2>
              {/* Removed course description text declaration as requested */}
            </div>
            
            <div className="course-highlights">
              <h2>{i18n.language === 'ru' ? 'Что вы изучите' : 'What You\'ll Learn'}</h2>
              <ul>
                {course.highlights.map((highlight, index) => (
                  <li key={index}>{highlight}</li>
                ))}
              </ul>
            </div>
            
            <div className="course-details">
              <h2>{i18n.language === 'ru' ? 'Детали курса' : 'Course Details'}</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <strong>{i18n.language === 'ru' ? 'Категория:' : 'Category:'}</strong> {course.category}
                </div>
                <div className="detail-item">
                  <strong>{i18n.language === 'ru' ? 'Язык:' : 'Language:'}</strong> {course.language}
                </div>
                <div className="detail-item">
                  <strong>{i18n.language === 'ru' ? 'Продолжительность:' : 'Duration:'}</strong> {course.duration}
                </div>
                <div className="detail-item">
                  <strong>{i18n.language === 'ru' ? 'Лекции:' : 'Lectures:'}</strong> {course.lectures}
                </div>
                <div className="detail-item">
                  <strong>{i18n.language === 'ru' ? 'Уровень:' : 'Level:'}</strong> {course.level}
                </div>
                <div className="detail-item">
                  <strong>{i18n.language === 'ru' ? 'Сертификат:' : 'Certificate:'}</strong> {i18n.language === 'ru' ? 'Да' : 'Yes'}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'curriculum' && (
          <div className="curriculum-tab">
            <h2>{i18n.language === 'ru' ? 'Учебный план курса' : 'Course Curriculum'}</h2>
            <div className="curriculum">
              {course.curriculum.map((section, index) => (
                <div key={index} className="curriculum-section">
                  <h3>{section.section}</h3>
                  <ul>
                    {section.lectures.map((lecture, lectureIndex) => (
                      <li key={lectureIndex}>{lecture}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'instructor' && (
          <div className="instructor-tab">
            <div className="instructor-profile card">
              <h2>{i18n.language === 'ru' ? 'Об инструкторе' : 'About the Instructor'}</h2>
              <div className="instructor-info">
                <div className="instructor-avatar">
                  👤
                </div>
                <div className="instructor-details">
                  <h3>{course.instructorInfo.name}</h3>
                  <p className="instructor-bio">{course.instructorInfo.bio}</p>
                  <div className="instructor-stats">
                    <div className="stat">
                      <strong>{i18n.language === 'ru' ? 'Рейтинг:' : 'Rating:'}</strong> {course.instructorInfo.rating}
                    </div>
                    <div className="stat">
                      <strong>{i18n.language === 'ru' ? 'Курсы:' : 'Courses:'}</strong> {course.instructorInfo.courses}
                    </div>
                    <div className="stat">
                      <strong>{i18n.language === 'ru' ? 'Студенты:' : 'Students:'}</strong> {course.instructorInfo.students}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div className="reviews-tab">
            <h2>{i18n.language === 'ru' ? 'Отзывы студентов' : 'Student Reviews'}</h2>
            <div className="reviews-summary">
              <div className="average-rating">
                <div className="rating-value">{course.rating}</div>
                <div className="rating-stars">⭐⭐⭐⭐⭐</div>
                <div className="rating-count">{i18n.language === 'ru' ? `На основе ${course.students} отзывов` : `Based on ${course.students} reviews`}</div>
              </div>
            </div>
            
            <div className="reviews-list">
              <div className="review card">
                <div className="review-header">
                  <div className="reviewer">Sarah M.</div>
                  <div className="review-date">{i18n.language === 'ru' ? '2 недели назад' : '2 weeks ago'}</div>
                </div>
                <div className="review-rating">⭐⭐⭐⭐⭐</div>
                <div className="review-content">
                  {i18n.language === 'ru' 
                    ? 'Этот курс полностью преобразил мои навыки React. Инструктор объясняет сложные концепции очень понятным образом.' 
                    : 'This course completely transformed my React skills. The instructor explains complex concepts in a very understandable way.'}
                </div>
              </div>
              
              <div className="review card">
                <div className="review-header">
                  <div className="reviewer">Michael T.</div>
                  <div className="review-date">{i18n.language === 'ru' ? '1 месяц назад' : '1 month ago'}</div>
                </div>
                <div className="review-rating">⭐⭐⭐⭐⭐</div>
                <div className="review-content">
                  {i18n.language === 'ru' 
                    ? 'Отличный контент и практические примеры. Я внедрил несколько техник из этого курса в свою повседневную работу.' 
                    : 'Excellent content and practical examples. I\'ve implemented several techniques from this course in my daily work.'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;