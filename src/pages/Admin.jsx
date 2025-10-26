import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import './Reservation.css';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Проверяем, является ли пользователь администратором
  useEffect(() => {
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/'); // Перенаправляем на главную, если не админ
    } else {
      // Загружаем данные (в реальном приложении здесь будет запрос к API)
      loadUsers();
      loadCourses();
      setLoading(false);
    }
  }, [currentUser, navigate]);

  const loadUsers = () => {
    // В реальном приложении здесь будет запрос к API
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  };

  const loadCourses = () => {
    // В реальном приложении здесь будет запрос к API
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    setCourses(storedCourses);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm(t('admin.confirmDeleteUser'))) {
      const updatedUsers = users.filter(user => user.id !== userId);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
    }
  };

  const handleCreateAdmin = () => {
    const email = prompt(t('admin.enterAdminEmail'));
    if (email) {
      // В реальном приложении здесь будет запрос к API
      const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
      const adminUser = {
        id: Date.now(),
        email,
        name: 'Admin',
        role: 'admin'
      };
      
      storedUsers.push(adminUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
      setUsers(storedUsers);
    }
  };

  if (!currentUser || currentUser.role !== 'admin') {
    return null; // Не показываем ничего, если пользователь не админ
  }

  return (
    <div className="reservation">
      <section className="section">
        <h1 className="section-title">{t('admin.title')}</h1>
        
        {loading ? (
          <div className="loading">{t('admin.loading')}</div>
        ) : (
          <div className="admin-content">
            {/* Панель управления пользователями */}
            <div className="admin-section card">
              <div className="admin-header">
                <h2>{t('admin.userManagement')}</h2>
                <button className="btn btn-primary" onClick={handleCreateAdmin}>
                  {t('admin.createAdmin')}
                </button>
              </div>
              
              <div className="users-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>{t('admin.name')}</th>
                      <th>{t('admin.email')}</th>
                      <th>{t('admin.role')}</th>
                      <th>{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`role-badge role-${user.role}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>
                          {user.role !== 'admin' && (
                            <button 
                              className="btn btn-danger"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              {t('admin.delete')}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Панель управления курсами */}
            <div className="admin-section card">
              <div className="admin-header">
                <h2>{t('admin.courseManagement')}</h2>
                <button className="btn btn-primary">
                  {t('admin.addCourse')}
                </button>
              </div>
              
              <div className="courses-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>{t('admin.title')}</th>
                      <th>{t('admin.instructor')}</th>
                      <th>{t('admin.price')}</th>
                      <th>{t('admin.actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map(course => (
                      <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.title}</td>
                        <td>{course.instructor}</td>
                        <td>${course.price}</td>
                        <td>
                          <button className="btn btn-secondary">
                            {t('admin.edit')}
                          </button>
                          <button className="btn btn-danger">
                            {t('admin.delete')}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Admin;