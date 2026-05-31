import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          🚗 AutoSoul
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Главная
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/quiz" className={styles.navLink}>
                Подобрать авто
              </Link>
              <Link to="/results" className={styles.navLink}>
                Мои подборки
              </Link>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navLink}>
                Войти
              </Link>
              <Link to="/register" className={styles.navLink}>
                Регистрация
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;