import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Найди автомобиль, <span className={styles.highlight}>который отражает твою душу</span>
          </h1>
          <p className={styles.subtitle}>
            AutoSoul — это не просто подбор автомобилей. Мы анализируем твои предпочтения, 
            образ жизни и даже любимый напиток, чтобы найти идеальную машину именно для тебя.
          </p>
          {isAuthenticated ? (
            <Link to="/quiz" className={styles.ctaButton}>
              Начать подбор 🚀
            </Link>
          ) : (
            <div className={styles.buttons}>
              <Link to="/register" className={styles.primaryButton}>
                Начать бесплатно
              </Link>
              <Link to="/login" className={styles.secondaryButton}>
                Уже есть аккаунт
              </Link>
            </div>
          )}
        </div>
        <div className={styles.heroImage}>
          <div className={styles.floatingCar}>🚗💨</div>
        </div>
      </section>

      <section className={styles.howItWorks}>
        <h2 className={styles.sectionTitle}>Как это работает?</h2>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div className={styles.stepIcon}>📝</div>
            <h3>1. Ответь на вопросы</h3>
            <p>Расскажи о своих предпочтениях: любимый цвет, напиток, образ жизни и возраст</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>🤖</div>
            <h3>2. Искусственный интеллект</h3>
            <p>Наш алгоритм анализирует твои ответы и подбирает идеальные варианты</p>
          </div>
          <div className={styles.step}>
            <div className={styles.stepIcon}>🎯</div>
            <h3>3. Получи подборку</h3>
            <p>Увидишь 3 автомобиля с высоким процентом совпадения и объяснением выбора</p>
          </div>
        </div>
      </section>

      <section className={styles.whyUs}>
        <h2 className={styles.sectionTitle}>Почему AutoSoul?</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🧠</div>
            <h3>Психологический подход</h3>
            <p>Мы учитываем не только технические характеристики, но и твою личность</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>⚡</div>
            <h3>Быстро и просто</h3>
            <p>Всего 4 вопроса — и ты получаешь персонализированную подборку за 2 минуты</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>💾</div>
            <h3>История подборок</h3>
            <p>Все твои подборки сохраняются — можешь вернуться к ним в любой момент</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>🎨</div>
            <h3>Учёт визуальных предпочтений</h3>
            <p>Любимый цвет автомобиля влияет на результат подбора</p>
          </div>
        </div>
      </section>

      <section className={styles.example}>
        <h2 className={styles.sectionTitle}>Пример подбора</h2>
        <div className={styles.exampleCard}>
          <div className={styles.exampleContent}>
            <div className={styles.userProfile}>
              <span className={styles.userAvatar}>👨‍💻</span>
              <div>
                <h4>Алексей, 28 лет</h4>
                <p>Любит кофе, активный отдых и чёрный цвет</p>
              </div>
            </div>
            <div className={styles.exampleResult}>
              <span className={styles.arrow}>→</span>
              <div className={styles.carMatch}>
                <strong>BMW X5</strong>
                <span className={styles.matchBadge}>85% совпадение</span>
                <p className={styles.matchReason}>"Мощный внедорожник для активного образа жизни"</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.reviews}>
        <h2 className={styles.sectionTitle}>Что говорят пользователи</h2>
        <div className={styles.reviewGrid}>
          <div className={styles.reviewCard}>
            <div className={styles.reviewText}>
              "Никогда не думал, что цвет машины так важен! AutoSoul подобрал мне красную Tesla — 
              я в восторге уже полгода!"
            </div>
            <div className={styles.reviewAuthor}>
              <strong>Дмитрий</strong>
              <span>Tesla Model 3</span>
            </div>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.reviewText}>
              "Прошёл тест ради интереса, а в итоге купил Golf. Действительно, 
              идеальная машина для города и утреннего кофе!"
            </div>
            <div className={styles.reviewAuthor}>
              <strong>Екатерина</strong>
              <span>Volkswagen Golf</span>
            </div>
          </div>
          <div className={styles.reviewCard}>
            <div className={styles.reviewText}>
              "Очень удобно, что все подборки сохраняются. Сравнил несколько вариантов 
              и выбрал лучший для себя."
            </div>
            <div className={styles.reviewAuthor}>
              <strong>Максим</strong>
              <span>BMW X5</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Готов найти свой идеальный автомобиль?</h2>
          <p>Присоединяйся к сообществу AutoSoul и получи персонализированную подборку уже сегодня</p>
          {isAuthenticated ? (
            <Link to="/quiz" className={styles.ctaButtonLarge}>
              Начать подбор 🚗
            </Link>
          ) : (
            <Link to="/register" className={styles.ctaButtonLarge}>
              Зарегистрироваться бесплатно
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;