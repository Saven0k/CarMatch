import React from 'react';
import styles from './CarCard.module.css';
import type { Car } from '../../types';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const getMatchColor = (percent: number) => {
    if (percent >= 80) return '#4caf50';
    if (percent >= 60) return '#ff9800';
    return '#f44336';
  };

  return (
    <div className={styles.card}>
      <img src={car.image_url} alt={`${car.brand} ${car.model}`} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>
          {car.brand} {car.model}
        </h3>
        <p className={styles.year}>Год: {car.year}</p>
        <p className={styles.price}>Цена: {car.price.toLocaleString()} $</p>
        <div className={styles.matchContainer}>
          <div 
            className={styles.matchBar} 
            style={{ width: `${car.match_percent}%`, backgroundColor: getMatchColor(car.match_percent) }}
          />
          <span className={styles.matchPercent}>Совпадение: {car.match_percent}%</span>
        </div>
        <p className={styles.reason}>
          <strong>Почему подходит:</strong> {car.reason}
        </p>
      </div>
    </div>
  );
};

export default CarCard;