import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Инициализация пользователя при загрузке приложения
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    
    // Создаем тестового администратора при первом запуске
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const adminExists = storedUsers.some(user => user.role === 'admin');
    
    if (!adminExists) {
      const adminUser = {
        id: 1,
        email: 'admin@example.com',
        name: 'Admin User',
        role: 'admin'
      };
      
      storedUsers.push(adminUser);
      localStorage.setItem('users', JSON.stringify(storedUsers));
    }
    
    // Создаем тестовые курсы при первом запуске
    const storedCourses = JSON.parse(localStorage.getItem('courses') || '[]');
    
    if (storedCourses.length === 0) {
      const testCourses = [
        {
          id: 1,
          title: 'React для начинающих',
          instructor: 'Иван Петров',
          price: 49.99
        },
        {
          id: 2,
          title: 'Продвинутый JavaScript',
          instructor: 'Мария Сидорова',
          price: 79.99
        },
        {
          id: 3,
          title: 'Node.js и Express',
          instructor: 'Алексей Иванов',
          price: 69.99
        }
      ];
      
      localStorage.setItem('courses', JSON.stringify(testCourses));
    }
    
    setLoading(false);
  }, []);

  // Функция регистрации
  const signup = async (userData) => {
    // В реальном приложении здесь будет запрос к API
    const newUser = {
      id: Date.now(),
      ...userData,
      role: 'user', // По умолчанию все новые пользователи - обычные пользователи
      createdAt: new Date().toISOString()
    };
    
    // Сохраняем пользователя в localStorage (в реальном приложении это будет на сервере)
    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentUser(newUser);
    
    return newUser;
  };

  // Функция входа
  const login = async (email, password) => {
    // В реальном приложении здесь будет запрос к API для проверки учетных данных
    // Для демонстрации мы просто проверим, есть ли пользователь в localStorage
    
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find(u => u.email === email);
    
    if (user) {
      // В реальном приложении здесь должна быть проверка пароля
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      return user;
    }
    
    // Если пользователя нет в списке, создаем его (для демонстрации)
    const newUser = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      role: 'user'
    };
    
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    localStorage.setItem('user', JSON.stringify(newUser));
    setCurrentUser(newUser);
    
    return newUser;
  };

  // Функция выхода
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  // Функция для создания администратора (только для демонстрации)
  const createAdmin = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const adminUser = {
      id: Date.now(),
      email,
      name: 'Admin',
      role: 'admin'
    };
    
    storedUsers.push(adminUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    
    return adminUser;
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    createAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};