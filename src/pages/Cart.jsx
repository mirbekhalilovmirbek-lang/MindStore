import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../contexts/CartContext';
import axios from 'axios';
import { convertUsdToKgs, formatKgsPrice } from '../utils/currency';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, subtotal, tax, total, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [notificationStatus, setNotificationStatus] = useState(null); // null, 'success', or 'error'
  const { t } = useTranslation();

  // Function to handle image errors
  const handleImageError = (e) => {
    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='10' fill='%23888'%3ENo Image%3C/text%3E%3C/svg%3E";
  };

  const handleRemoveFromCart = (id, type) => {
    removeFromCart(id, type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckoutClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: ''
    });
    setOrderPlaced(false);
    setNotificationStatus(null);
  };

 const handlePlaceOrder = async (e) => {
  e.preventDefault();
  setIsCheckingOut(true);
  setNotificationStatus(null);

  try {
    // Создаём объект заказа
    const order = {
      id: Date.now(),
      items: cartItems,
      subtotal,
      tax,
      total,
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerAddress: formData.address,
    };

    // Формируем текст для Telegram
    const message = `
🛍 Новый заказ №${order.id}
👤 Имя: ${order.customerName}
📧 Email: ${order.customerEmail}
📞 Телефон: ${order.customerPhone}
🏠 Адрес: ${order.customerAddress}

🧾 Состав заказа:
${order.items.map((item) => `- ${item.name} x${item.quantity} = ${formatKgsPrice(convertUsdToKgs(item.price * item.quantity))} KGS`).join("\n")}

💰 Итого: ${formatKgsPrice(convertUsdToKgs(order.total))} KGS
`;

    // Отправляем уведомление в Telegram
    try {
      const telegramBotToken = "8267840967:AAFFfV8bGCqQldyYl-AJazVBhopH1EhX3Eo"; // ⚠️ вставь свой токен
      const chatId = "6695513288"; // ⚠️ вставь свой chat_id

      const response = await axios.post(
        `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
        {
          chat_id: chatId,
          text: message,
          parse_mode: "HTML",
        },
        { timeout: 5000 }
      );

      if (response.data.ok) {
        console.log("Telegram notification sent for order");
        setNotificationStatus("success");
      } else {
        console.warn("Telegram notification warning:", response.data.description);
        setNotificationStatus("warning");
      }
    } catch (notificationError) {
      console.error("Failed to send Telegram notification:", notificationError);
      setNotificationStatus("error");
    }

    // Очищаем корзину
    clearCart();

    // Показываем сообщение об успешном заказе
    setOrderPlaced(true);
  } catch (error) {
    console.error("Checkout error:", error);
    alert(t("cart.checkoutError"));
  } finally {
    setIsCheckingOut(false);
  }
};

  return (
    <div className="cart">
      <section className="section">
        <h1 className="section-title">{t('cart.title')}</h1>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>{t('cart.empty')}</h2>
            <p>{t('cart.startAdding')}</p>
            <div className="empty-cart-actions">
              <Link to="/courses" className="btn btn-primary no-hover">{t('cart.browseCourses')}</Link>
            </div>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={`${item.id}-${item.type}`} className="cart-item card">
                  <div className="item-image">
                    <img src={item.image} alt={item.title} onError={handleImageError} />
                  </div>
                  <div className="item-details">
                    <h3 className="item-title">{item.title}</h3>
                    <p className="item-meta">
                      {item.type === 'course' && `${t('courses.by')} ${item.instructor}`}
                      {item.type === 'book' && `${t('courses.by')} ${item.author}`}
                      {item.type === 'lecture' && `${t('courses.by')} ${item.speaker}`}
                      {item.type === 'podcast' && `${t('courses.by')} ${item.host}`}
                    </p>
                    <p className="item-type">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                  </div>
                  <div className="item-price">{formatKgsPrice(convertUsdToKgs(item.price))} KGS</div>
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">{formatKgsPrice(convertUsdToKgs(item.price * item.quantity))} KGS</div>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(item.id, item.type)}
                  >
                    {t('profile.remove')}
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary card">
              <h2>{t('cart.orderSummary')}</h2>
              <div className="summary-row">
                <span>{t('cart.subtotal')}</span>
                <span>{formatKgsPrice(convertUsdToKgs(subtotal))} KGS</span>
              </div>
              <div className="summary-row">
                <span>{t('cart.tax')}</span>
                <span>{formatKgsPrice(convertUsdToKgs(tax))} KGS</span>
              </div>
              <div className="summary-row total">
                <span>{t('cart.total')}</span>
                <span>{formatKgsPrice(convertUsdToKgs(total))} KGS</span>
              </div>
              <button 
                className="btn btn-primary checkout-btn"
                onClick={handleCheckoutClick}
              >
                {t('cart.proceedCheckout')}
              </button>
              <Link to="/installment" className="installment-link">
                {t('cart.payInstallments')}
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* Checkout Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t('cart.checkout')}</h2>
              <button className="modal-close" onClick={closeModal}>×</button>
            </div>
            
            {orderPlaced ? (
              <div className="order-success">
                <div className="success-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/148/148761.png" alt="Success" style={{ width: '48px', height: '48px' }} />
                </div>
                <h3>{t('cart.orderPlaced')}</h3>
                <p>{t('cart.orderPlacedMessage')}</p>
                {notificationStatus === 'success' && (
                  <p className="notification-success">{t('cart.notificationSent')}</p>
                )}
                {notificationStatus === 'error' && (
                  <p className="notification-error">{t('cart.notificationFailed')}</p>
                )}
                {notificationStatus === 'warning' && (
                  <p className="notification-warning">{t('cart.notificationWarning')}</p>
                )}
                <button 
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  {t('cart.continueShopping')}
                </button>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="checkout-form">
                <div className="form-group">
                  <label htmlFor="name">{t('cart.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">{t('cart.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">{t('cart.phone')}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="address">{t('cart.address')}</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    rows="3"
                    required
                  ></textarea>
                </div>
                
                <div className="order-summary">
                  <h3>{t('cart.orderSummary')}</h3>
                  <div className="summary-row">
                    <span>{t('cart.subtotal')}</span>
                    <span>{formatKgsPrice(convertUsdToKgs(subtotal))} KGS</span>
                  </div>
                  <div className="summary-row">
                    <span>{t('cart.tax')}</span>
                    <span>{formatKgsPrice(convertUsdToKgs(tax))} KGS</span>
                  </div>
                  <div className="summary-row total">
                    <span>{t('cart.total')}</span>
                    <span>{formatKgsPrice(convertUsdToKgs(total))} KGS</span>
                  </div>
                </div>
                
                {notificationStatus === 'error' && (
                  <div className="notification-error-box">
                    {t('cart.notificationServerError')}
                  </div>
                )}
                
                <div className="modal-actions">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={closeModal}
                    disabled={isCheckingOut}
                  >
                    {t('cart.cancel')}
                  </button>
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isCheckingOut}
                  >
                    {isCheckingOut ? t('cart.processing') : t('cart.placeOrder')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;