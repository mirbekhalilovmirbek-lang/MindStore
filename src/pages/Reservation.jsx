import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './Reservation.css';

const Reservation = () => {
  const [reservation, setReservation] = useState({
    course: "Advanced React Development",
    date: "",
    time: "",
    name: "",
    email: "",
    phone: "",
    participants: 1
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const [availableSlots] = useState([
    { date: "2025-11-15", time: "10:00 AM", available: true },
    { date: "2025-11-15", time: "2:00 PM", available: true },
    { date: "2025-11-16", time: "11:00 AM", available: false },
    { date: "2025-11-16", time: "3:00 PM", available: true },
    { date: "2025-11-17", time: "9:00 AM", available: true },
    { date: "2025-11-17", time: "1:00 PM", available: true }
  ]);

  const handleReserve = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would send the reservation to a server
      console.log("Reservation submitted:", reservation);
      
      // Send notification to Telegram
      try {
        await axios.post('http://localhost:3001/send-reservation-notification', {
          reservation: {
            ...reservation,
            id: Date.now() // Simple ID generation for demo
          }
        });
        console.log("Telegram notification sent");
      } catch (notificationError) {
        console.error("Failed to send Telegram notification:", notificationError);
      }
      
      // Convert 12-hour format to 24-hour format for Russian
      let formattedTime = reservation.time;
      if (reservation.time.includes('AM')) {
        formattedTime = reservation.time.replace(' AM', '');
        // Handle special case for 12 AM
        if (formattedTime.startsWith('12:')) {
          formattedTime = formattedTime.replace('12:', '00:');
        }
      } else if (reservation.time.includes('PM')) {
        formattedTime = reservation.time.replace(' PM', '');
        // Handle hours from 1 PM to 11 PM
        if (formattedTime.startsWith('1:')) formattedTime = formattedTime.replace('1:', '13:');
        else if (formattedTime.startsWith('2:')) formattedTime = formattedTime.replace('2:', '14:');
        else if (formattedTime.startsWith('3:')) formattedTime = formattedTime.replace('3:', '15:');
        else if (formattedTime.startsWith('4:')) formattedTime = formattedTime.replace('4:', '16:');
        else if (formattedTime.startsWith('5:')) formattedTime = formattedTime.replace('5:', '17:');
        else if (formattedTime.startsWith('6:')) formattedTime = formattedTime.replace('6:', '18:');
        else if (formattedTime.startsWith('7:')) formattedTime = formattedTime.replace('7:', '19:');
        else if (formattedTime.startsWith('8:')) formattedTime = formattedTime.replace('8:', '20:');
        else if (formattedTime.startsWith('9:')) formattedTime = formattedTime.replace('9:', '21:');
        else if (formattedTime.startsWith('10:')) formattedTime = formattedTime.replace('10:', '22:');
        else if (formattedTime.startsWith('11:')) formattedTime = formattedTime.replace('11:', '23:');
        // 12 PM remains 12:00
      }
      
      // Redirect user to WhatsApp with confirmation message in Russian
      const userWhatsAppMessage = `Здравствуйте! Подтверждаю свою бронь на курс ${reservation.course} на ${reservation.date} в ${formattedTime}. Меня зовут ${reservation.name}, мой номер телефона ${reservation.phone}.`;
      
      const userWhatsAppUrl = `https://wa.me/703153355?text=${encodeURIComponent(userWhatsAppMessage)}`;
      window.location.href = userWhatsAppUrl;
    } catch (error) {
      console.error("Reservation error:", error);
      alert("An error occurred while processing your reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableDates = [...new Set(availableSlots.map(slot => slot.date))];

  const filteredSlots = availableSlots.filter(slot => 
    slot.date === reservation.date && slot.available
  );

  return (
    <div className="reservation">
      <section className="section">
        <h1 className="section-title">{t('reservation.title')}</h1>
        
        <div className="reservation-content">
          <div className="course-info card">
            <h2>{reservation.course}</h2>
            <p>
              {t('reservation.description')}
            </p>
            <div className="course-meta">
              <div className="meta-item">
                <strong>{t('map.duration')}:</strong> 12 {t('map.hours')}
              </div>
              <div className="meta-item">
                <strong>{t('map.level')}:</strong> {t('map.advanced')}
              </div>
              <div className="meta-item">
                <strong>{t('map.format')}:</strong> {t('map.online')}
              </div>
            </div>
          </div>
          
          <div className="reservation-form card">
            <h2>{t('reservation.reserveSpot')}</h2>
            <form onSubmit={handleReserve}>
              <div className="form-group">
                <label className="form-label">{t('reservation.selectDate')}</label>
                <select 
                  className="form-input"
                  value={reservation.date}
                  onChange={(e) => setReservation({...reservation, date: e.target.value, time: ""})}
                  required
                >
                  <option value="">{t('reservation.chooseDate')}</option>
                  {availableDates.map(date => (
                    <option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </option>
                  ))}
                </select>
              </div>
              
              {reservation.date && (
                <div className="form-group">
                  <label className="form-label">{t('reservation.selectTime')}</label>
                  <select 
                    className="form-input"
                    value={reservation.time}
                    onChange={(e) => setReservation({...reservation, time: e.target.value})}
                    required
                  >
                    <option value="">{t('reservation.chooseTime')}</option>
                    {filteredSlots.map((slot, index) => (
                      <option key={index} value={slot.time}>
                        {slot.time} ({slot.available ? t('map.available') : t('map.full')})
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div className="form-group">
                <label className="form-label">{t('reservation.fullName')}</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={reservation.name}
                  onChange={(e) => setReservation({...reservation, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{t('reservation.email')}</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={reservation.email}
                  onChange={(e) => setReservation({...reservation, email: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{t('reservation.phone')}</label>
                <input 
                  type="tel" 
                  className="form-input" 
                  value={reservation.phone}
                  onChange={(e) => setReservation({...reservation, phone: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">{t('reservation.participants')}</label>
                <select 
                  className="form-input"
                  value={reservation.participants}
                  onChange={(e) => setReservation({...reservation, participants: parseInt(e.target.value)})}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? t('reservation.person') : t('reservation.people')}</option>
                  ))}
                </select>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary reserve-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? t('reservation.submitting') || 'Processing...' : t('reservation.confirm')}
              </button>
            </form>
          </div>
        </div>
        
        <div className="reservation-info">
          <div className="info-card card">
            <h2>{t('reservation.benefits')}</h2>
            <ul>
              <li>{t('reservation.guaranteedSpot')}</li>
              <li>{t('reservation.earlyAccess')}</li>
              <li>{t('reservation.prioritySupport')}</li>
              <li>{t('reservation.specialDiscounts')}</li>
              <li>{t('reservation.exclusiveAccess')}</li>
            </ul>
          </div>
          
          <div className="info-card card">
            <h2>{t('reservation.importantInfo')}</h2>
            <ul>
              <li>{t('reservation.nonRefundable')}</li>
              <li>{t('reservation.paymentDue')}</li>
              <li>{t('reservation.reminder')}</li>
              <li>{t('reservation.materials')}</li>
              <li>{t('reservation.lateArrivals')}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reservation;