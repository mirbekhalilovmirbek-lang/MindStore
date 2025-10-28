import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Books from './Books';
import Courses from './Courses';
import Lectures from './Lectures';
import Podcasts from './Podcasts';
import Cart from './Cart';
import Favorites from './Favorites';
import Profile from './Profile';
import Reservation from './Reservation';
import Map from './Map';
import './Home.css';

const Home = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content slide-in-left">
          <h1 className="hero-title">{t('home.title')}</h1>
          <p className="hero-subtitle">{t('home.subtitle')}</p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn btn-primary">{t('home.exploreCourses')}</Link>
          </div>
        </div>
        <div className="hero-image float-animation slide-in-right">
          <div className="floating-card card">
            <h3>{t('home.readyToLearn')}</h3>
            <p>{t('home.joinStudents')}</p>
          </div>
        </div>
      </section>


<section className="features section">
  <h2 className="section-title">{t('home.whyChoose')}</h2>

  <div className="grid grid-cols-3">
    <div className="feature-card card fade-in" style={{ "--delay": "1" }}>
      <img 
        src="https://mvpteam.org/blog/kak-vybrat-trenera-po-pokeru5.jpg" 
        alt="Expert Instructors" 
        width="24" 
        height="24" 
        className="feature-icon"
      />
      <h3>{t('home.expertInstructors')}</h3>
      <p>{t('home.expertInstructorsDesc')}</p>
    </div>

    <div className="feature-card card fade-in" style={{ "--delay": "2" }}>
      <img 
        src="https://www.rezonit.ru/upload/iblock/985/985d7f46dbe549f618b3e9027b6b3c72.jpg" 
        alt="Flexible Payments" 
        width="24" 
        height="24" 
        className="feature-icon"
      />
      <h3>{t('home.flexiblePayments')}</h3>
      <p>{t('home.flexiblePaymentsDesc')}</p>
    </div>

    <div className="feature-card card fade-in" style={{ "--delay": "3" }}>
      <img 
        src="https://img.freepik.com/premium-vector/global-access-web-social-media-content-files_88272-4419.jpg" 
        alt="Global Access" 
        width="24" 
        height="24" 
        className="feature-icon"
      />
      <h3>{t('home.globalAccess')}</h3>
      <p>{t('home.globalAccessDesc')}</p>
    </div>
  </div>
</section>

<section className="categories section">
  <h2 className="section-title">{t('home.browseCategories')}</h2>

  <div className="grid grid-cols-3">
    <Link to="/courses?category=it" className="category-card card fade-in" style={{ "--delay": "1" }}>
      <img 
        src="https://adukar.com/images/photo/kratkij-slovar-it-professij-3.jpg" 
        alt="IT and Software Development" 
        width="24" 
        height="24" 
        className="category-icon"
      />
      <h3>{t('home.itSoftware')}</h3>
      <p>{t('home.itSoftwareDesc')}</p>
    </Link>

    <Link to="/courses?category=design" className="category-card card fade-in" style={{ "--delay": "2" }}>
      <img 
        src="https://stimulo.com/wp-content/uploads/2024/03/ideas-idea-vision-design-plan-objective-mission-concept-1024x654.jpg" 
        alt="Design" 
        width="24" 
        height="24" 
        className="category-icon"
      />
      <h3>{t('home.design')}</h3>
      <p>{t('home.designDesc')}</p>
    </Link>

    <Link to="/courses?category=languages" className="category-card card fade-in" style={{ "--delay": "3" }}>
      <img 
        src="https://perevedi.by/upload/medialibrary/6ad/6adc89cfa195881ba7885991a0ea9061.jpeg" 
        alt="Languages" 
        width="24" 
        height="24" 
        className="category-icon"
      />
      <h3>{t('home.languages')}</h3>
      <p>{t('home.languagesDesc')}</p>
    </Link>
  </div>
</section>

      {/* Books Component */}
      <section className="home-section">
        <Books />
      </section>

      {/* Courses Component */}
      <section className="home-section">
        <Courses />
      </section>

      {/* Lectures Component */}
      <section className="home-section">
        <Lectures />
      </section>

      {/* Podcasts Component */}
      <section className="home-section">
        <Podcasts />
      </section>

      {/* Cart Component */}
      <section className="home-section">
        <Cart hideEmptyState={true} hideTitle={true} />
      </section>

      {/* Favorites Component */}
      <section className="home-section">
        <Favorites hideEmptyState={true} hideTitle={true} />
      </section>

      {/* Profile Component */}
      <section className="home-section">
        <Profile hideEmptyState={true} />
      </section>

      {/* Reservation Component */}
      <section className="home-section">
        <Reservation />
      </section>

      {/* Map Component */}
      <section className="home-section">
        <Map />
      </section>

<section className="cta section">
  <div className="cta-card card fade-in">
    <h2>{t('home.readyToLearn')}</h2>
    <p>{t('home.joinStudents')}</p>
    <Link to="/courses" className="btn btn-primary">{t('home.getStarted')}</Link>
  </div>
</section>

    </div>
  );
};

export default Home;