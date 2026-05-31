import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Quiz.module.css';
import type { QuizFormData } from '../types';

const Quiz: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<QuizFormData>({
    age: 25,
    favorite_color: 'Black',
    favorite_drink: 'coffee',
    lifestyle: 'active'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/quiz', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.setItem('recommendations', JSON.stringify(response.data));
      navigate('/results');
    } catch (error) {
      console.error('Quiz submission failed:', error);
      alert('Ошибка при подборе автомобилей');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Расскажи о себе</h2>
        <p className={styles.description}>
          Ответь на несколько вопросов, и мы подберем автомобиль, который идеально тебе подходит!
        </p>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Ваш возраст</label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              className={styles.input}
              min="18"
              max="80"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Любимый цвет автомобиля</label>
            <select
              name="favorite_color"
              value={form.favorite_color}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="Red">Красный 🔴</option>
              <option value="Black">Черный ⚫</option>
              <option value="White">Белый ⚪</option>
              <option value="Blue">Синий 🔵</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Любимый напиток</label>
            <select
              name="favorite_drink"
              value={form.favorite_drink}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="coffee">Кофе ☕</option>
              <option value="energy">Энергетик ⚡</option>
              <option value="tea">Чай 🍵</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Образ жизни</label>
            <select
              name="lifestyle"
              value={form.lifestyle}
              onChange={handleChange}
              className={styles.select}
            >
              <option value="active">Активный 🏃‍♂️</option>
              <option value="calm">Спокойный 🧘‍♀️</option>
            </select>
          </div>

          <button
            onClick={handleSubmit}
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Подбираем...' : 'Подобрать автомобиль'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;