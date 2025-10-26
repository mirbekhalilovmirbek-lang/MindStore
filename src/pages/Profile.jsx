import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import './Profile.css';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUserData(storedUsers);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h2>{t('profile.pleaseLogin')}</h2>
          <button 
            onClick={() => navigate('/login')}
            className="btn-primary"
          >
            {t('login.signIn')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1>{t('profile.title')}</h1>
          <button 
            onClick={handleLogout}
            className="btn-danger"
          >
            {t('profile.logout')}
          </button>
        </div>
        
        <div className="profile-content">
          <div className="user-info">
            <h2>{t('profile.profile')}</h2>
            <div className="info-item">
              <label>{t('profile.fullName')}</label>
              <p>{currentUser.name}</p>
            </div>
            <div className="info-item">
              <label>{t('profile.email')}</label>
              <p>{currentUser.email}</p>
            </div>
            <div className="info-item">
              <label>{t('profile.role')}</label>
              <p className="capitalize">{currentUser.role}</p>
            </div>
            {currentUser.createdAt && (
              <div className="info-item">
                <label>{t('profile.memberSince')}</label>
                <p>{new Date(currentUser.createdAt).toLocaleDateString()}</p>
              </div>
            )}
          </div>
          
          <div className="registered-users">
            <h2>{t('profile.registeredUsers')}</h2>
            <div className="users-list">
              {userData && userData.length > 0 ? (
                <ul>
                  {userData.map((user, index) => (
                    <li key={user.id || index}>
                      <p className="user-name">{user.name}</p>
                      <p className="user-email">{user.email}</p>
                      <p className="user-date">
                        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>{t('profile.noUsersFound')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;