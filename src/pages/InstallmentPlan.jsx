import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { convertUsdToKgs, formatKgsPrice } from '../utils/currency';
import './InstallmentPlan.css';

const InstallmentPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState('3');
  const [course, setCourse] = useState({
    title: "Advanced React Development",
    price: 89.99,
    image: "/src/assets/course1.jpg"
  });
  const { t } = useTranslation();

  const plans = {
    '3': { months: 3, interest: 0, monthly: 29.997 },
    '6': { months: 6, interest: 5, monthly: 15.75 },
    '12': { months: 12, interest: 10, monthly: 8.25 }
  };

  const selectedPlanData = plans[selectedPlan];
  const totalWithInterest = selectedPlanData ? 
    (course.price * (1 + selectedPlanData.interest / 100)).toFixed(2) : 0;

  const handleEnroll = () => {
    // In a real app, this would process the enrollment
    alert(t('installment.enroll'));
  };

  return (
    <div className="installment-plan">
      <section className="section">
        <h1 className="section-title">{t('installment.title')}</h1>
        
        <div className="installment-content">
          <div className="course-preview card">
            <div className="course-image">
              <img src={course.image} alt={course.title} />
            </div>
            <div className="course-info">
              <h2>{course.title}</h2>
              <div className="course-price">{formatKgsPrice(convertUsdToKgs(course.price))} KGS</div>
            </div>
          </div>
          
          <div className="plan-selector card">
            <h2>{t('installment.selectPlan')}</h2>
            <p>{t('installment.chooseOption')}</p>
            
            <div className="plan-options">
              {Object.entries(plans).map(([key, plan]) => (
                <div 
                  key={key}
                  className={`plan-option ${selectedPlan === key ? 'selected' : ''}`}
                  onClick={() => setSelectedPlan(key)}
                >
                  <div className="plan-header">
                    <h3>{plan.months} {t('installment.months')}</h3>
                    <div className="plan-interest">
                      {plan.interest > 0 ? `${plan.interest}% ${t('installment.interest')}` : t('installment.noInterest')}
                    </div>
                  </div>
                  <div className="plan-details">
                    <div className="monthly-payment">
                      {t('installment.monthlyPayment')}: {formatKgsPrice(convertUsdToKgs(plan.monthly))} KGS/{t('home.month')}
                    </div>
                    <div className="total-payment">
                      {t('installment.totalPayment')}: {formatKgsPrice(convertUsdToKgs((course.price * (1 + plan.interest / 100))))} KGS
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="plan-summary">
              <h3>{t('installment.planSummary')}</h3>
              <div className="summary-details">
                <div className="summary-row">
                  <span>{t('installment.coursePrice')}:</span>
                  <span>{formatKgsPrice(convertUsdToKgs(course.price))} KGS</span>
                </div>
                <div className="summary-row">
                  <span>{t('installment.interestFee')} ({selectedPlanData?.interest || 0}%):</span>
                  <span>{formatKgsPrice(convertUsdToKgs((course.price * (selectedPlanData?.interest || 0) / 100)))} KGS</span>
                </div>
                <div className="summary-row total">
                  <span>{t('cart.total')}:</span>
                  <span>{formatKgsPrice(convertUsdToKgs(parseFloat(totalWithInterest)))} KGS</span>
                </div>
                <div className="summary-row">
                  <span>{t('installment.monthlyPayment')}:</span>
                  <span>{formatKgsPrice(convertUsdToKgs(selectedPlanData?.monthly))} KGS</span>
                </div>
              </div>
            </div>
            
            <button className="btn btn-primary enroll-btn" onClick={handleEnroll}>
              {t('installment.enroll')}
            </button>
            
            <div className="plan-benefits">
              <h3>{t('installment.benefits')}</h3>
              <ul>
                <li>{t('installment.spreadCost')}</li>
                <li>{t('installment.noCreditImpact')}</li>
                <li>{t('installment.flexibleOptions')}</li>
                <li>{t('installment.startLearning')}</li>
                <li>{t('installment.cancelAnytime')}</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="faq-section">
          <h2>{t('installment.faq')}</h2>
          <div className="faq-grid grid grid-cols-2">
            <div className="faq-card card">
              <h3>{t('installment.howWork')}</h3>
              <p>
                {t('installment.howWorkDesc')}
              </p>
            </div>
            
            <div className="faq-card card">
              <h3>{t('installment.interestFaq')}</h3>
              <p>
                {t('installment.interestFaqDesc')}
              </p>
            </div>
            
            <div className="faq-card card">
              <h3>{t('installment.changePlan')}</h3>
              <p>
                {t('installment.changePlanDesc')}
              </p>
            </div>
            
            <div className="faq-card card">
              <h3>{t('installment.missPayment')}</h3>
              <p>
                {t('installment.missPaymentDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstallmentPlan;