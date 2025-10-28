import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import { convertUsdToKgs, formatKgsPrice } from '../utils/currency';
import './Books.css';

const Books = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [previewBook, setPreviewBook] = useState(null); // State for preview modal
  const { addToCart } = useCart();
  const { t, i18n } = useTranslation();

  // Define books data with translation functions
  const getBooksData = () => [
    {
      id: 1,
      title: t('booksData.book1.title'),
      author: t('booksData.book1.author'),
      category: "IT",
      price: 29.99,
      rating: 4.7,
      pages: 320,
      image: "https://res.cloudinary.com/dvrqjaeju/image/upload/c_scale,h_1000/a_-90/v1692959836/IMG_6121_ioq1qp.jpg",
      description: t('booksData.book1.description')
    },
    {
      id: 2,
      title: t('booksData.book2.title'),
      author: t('booksData.book2.author'),
      category: i18n.language === 'ru' ? "Дизайн" : "Design",
      price: 34.99,
      rating: 4.8,
      pages: 280,
      image: "https://m.media-amazon.com/images/I/81dF-Te275L._UF894,1000_QL80_.jpg",
      description: t('booksData.book2.description')
    },
    {
      id: 3,
      title: t('booksData.book3.title'),
      author: t('booksData.book3.author'),
      category: "IT",
      price: 39.99,
      rating: 4.6,
      pages: 420,
      image: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/24/6a/65/246a658d-1056-1ecd-7cf4-e374a2cf09e1/9781839218910.jpg/1200x1200wz.jpg",
      description: t('booksData.book3.description')
    },
    {
      id: 4,
      title: t('booksData.book4.title'),
      author: t('booksData.book4.author'),
      category: i18n.language === 'ru' ? "Языки" : "Languages",
      price: 24.99,
      rating: 4.5,
      pages: 250,
      image: "https://www.researchgate.net/publication/320508106/figure/fig2/AS:551296725942272@1508450790430/Types-of-Language-Learning-Strategies-Oxford-1999-2001-2003.png",
      description: t('booksData.book4.description')
    },
    {
      id: 5,
      title: t('booksData.book5.title'),
      author: t('booksData.book5.author'),
      category: i18n.language === 'ru' ? "Бизнес" : "Business",
      price: 32.99,
      rating: 4.7,
      pages: 350,
      image: "https://static.geekschip.com/data/category_images/1647524654_0.jpg",
      description: t('booksData.book5.description')
    },
    {
      id: 6,
      title: t('booksData.book6.title'),
      author: t('booksData.book6.author'),
      category: i18n.language === 'ru' ? "Дизайн" : "Design",
      price: 27.99,
      rating: 4.6,
      pages: 220,
      image: "https://lollypop.design/wp-content/uploads/2024/08/7-UI-UX-Design-Principles-for-Mobile-App-Development.webp",
      description: t('booksData.book6.description')
    }
  ];

  // Get categories based on current language
  const getCategories = () => 
    i18n.language === 'ru' 
      ? ['all', 'IT', 'Дизайн', 'Языки', 'Бизнес'] 
      : ['all', 'IT', 'Design', 'Languages', 'Business'];

  // Update books and categories when language changes
  const [books, setBooks] = useState(getBooksData());
  const [categories, setCategories] = useState(getCategories());

  useEffect(() => {
    setBooks(getBooksData());
    setCategories(getCategories());
  }, [i18n.language, i18n, t]);

  const filteredBooks = books.filter(book => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (book) => {
    // Add book type to distinguish from other item types
    const bookItem = { ...book, type: 'book' };
    addToCart(bookItem);
  };

  const handlePreview = (book) => {
    setPreviewBook(book);
  };

  const closePreview = () => {
    setPreviewBook(null);
  };

  return (
    <div className="books">
      <section className="section">
        <h1 className="section-title">{t('books.title')}</h1>
        
        <div className="books-controls">
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
        
        <div className="books-grid grid grid-cols-3">
          {filteredBooks.map(book => (
            <div key={book.id} className="book-card card">
              <div className="book-cover">
                <img src={book.image} alt={book.title} />
              </div>
              <div className="book-content">
                <div className="book-category">{book.category}</div>
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{t('courses.by')} {book.author}</p>
                
                <div className="book-meta">
                  <div className="book-rating">
                    ⭐ {book.rating} ({book.pages} {t('home.month')})
                  </div>
                  <div className="book-price">{formatKgsPrice(convertUsdToKgs(book.price))} KGS</div>
                </div>
                
                <div className="book-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(book)}
                  >
                    {t('cart.title')}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handlePreview(book)}
                  >
                    {t('courses.preview')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredBooks.length === 0 && (
          <div className="no-results">
            <h3>{t('courses.noCourses')}</h3>
            <p>{t('courses.tryAdjusting')}</p>
          </div>
        )}

        {/* Additional information about books */}
        <div className="books-info">
          <p>{t('books.infoText')}</p>
        </div>
      </section>

      {/* Preview Modal */}
      {previewBook && (
        <div className="preview-modal" onClick={closePreview}>
          <div className="preview-content" onClick={(e) => e.stopPropagation()}>
            <button className="preview-close" onClick={closePreview}>×</button>
            <div className="preview-header">
              <h2>{previewBook.title}</h2>
              <p className="preview-author">{t('courses.by')} {previewBook.author}</p>
            </div>
            <div className="preview-body">
              <div className="preview-image">
                <img src={previewBook.image} alt={previewBook.title} />
              </div>
              <div className="preview-details">
                <p className="preview-description">{previewBook.description}</p>
                <div className="preview-meta">
                  <div className="preview-category">{previewBook.category}</div>
                  <div className="preview-rating">⭐ {previewBook.rating}</div>
                  <div className="preview-pages">{previewBook.pages} {t('home.month')}</div>
                  <div className="preview-price">{formatKgsPrice(convertUsdToKgs(previewBook.price))} KGS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Books;