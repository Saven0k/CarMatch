import styles from './Footer.module.css';
import {type FC} from 'react';


const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; 2024 AutoSoul. Подбор автомобилей по душе.</p>
        <p>Найди свою идеальную машину 🚀</p>
      </div>
    </footer>
  );
};

export default Footer;