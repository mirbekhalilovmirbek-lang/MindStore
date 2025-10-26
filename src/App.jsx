import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { FavoritesProvider } from './contexts/FavoritesContext';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Books from './pages/Books';
import Lectures from './pages/Lectures';
import Podcasts from './pages/Podcasts';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Reservation from './pages/Reservation';
import Map from './pages/Map';
import Favorites from './pages/Favorites';
import Register from './pages/Register';
import Login from './pages/Login';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AuthProvider>
          <FavoritesProvider>
            <CartProvider>
              <Router>
                <div className="App">
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/course/:id" element={<CourseDetail />} />
                      <Route path="/books" element={<Books />} />
                      <Route path="/lectures" element={<Lectures />} />
                      <Route path="/podcasts" element={<Podcasts />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/profile" element={<Profile />} />
                      {/* <Route path="/installment" element={<InstallmentPlan />} /> */}
                      <Route path="/reservation" element={<Reservation />} />
                      <Route path="/map" element={<Map />} />
                      <Route path="/favorites" element={<Favorites />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/admin" element={<Admin />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              </Router>
            </CartProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;