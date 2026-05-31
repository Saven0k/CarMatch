import React, { useEffect, useState } from 'react';
import styles from './Result.module.css';
import type { Car } from '../types';
import CarCard from '../components/CarCard/CarCard';
import Loader from '../components/Loader/Loader';

const Results: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('recommendations');
    if (data) {
      setCars(JSON.parse(data));
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (cars.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <h2>Нет результатов</h2>
          <p>Пройдите анкетирование, чтобы получить подборку автомобилей</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Ваши идеальные автомобили</h1>
        <p className={styles.subtitle}>
          Мы подобрали для вас {cars.length} автомобиль(ей) на основе ваших предпочтений
        </p>
      </div>
      <div className={styles.grid}>
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </div>
  );
};

export default Results;