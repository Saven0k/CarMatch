# ⚙️ CarMatch Backend

> Та часть, которая реально работает, пока фронтенд красивый, но бесполезный без нас.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688)](https://fastapi.tiangolo.com)
[![Python](https://img.shields.io/badge/Python-3.11-3776AB)](https://python.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791)](https://postgresql.org)

## 🎯 Что мы тут делаем?

Бэкенд для CarMatch. Принимает запросы от фронта, проверяет пароли (чтоб никто не влез без спросу), колдует над подбором авто, сохраняет всё в базу данных. И да, мы знаем, что логика подбора — это просто if-else. Не судите строго.

## 🔧 Стек (наше оружие)

| Инструмент | Зачем |
|------------|-------|
| FastAPI | Самый быстрый фреймворк на планете (почти) |
| SQLAlchemy | Чтобы не писать SQL руками (лень же) |
| PostgreSQL | Потому что MySQL для динозавров |
| JWT | Токены, куки, всё серьёзно |
| bcrypt | Пароли хэшируем, как деды завещали |
| Uvicorn | ASGI сервер, без него никак |

## 🗂️ Структура (карта сокровищ)
backend/
├── routers/
│ ├── auth.py # Вход, регистрация, выход
│ └── match.py # Подбор авто, история
├── models.py # Таблицы в коде
├── schemas.py # Валидация данных
├── auth.py # Хэши и JWT
├── database.py # Коннект к PostgreSQL
├── main.py # Сердце всего
├── init_db.sql # SQL для создания таблиц
├── seed_data.sql # Тестовые данные (чтоб не пусто было)
└── requirements.txt # Что ставить


## 🏃 Запуск (лёгкий, как утренняя пробежка)

```bash
# 1. Виртуальное окружение (чтоб зависимости не ссорились)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 2. Ставим зависимости
pip install -r requirements.txt

# 3. Создаём базу данных (PostgreSQL должен быть установлен)
psql -U postgres
CREATE DATABASE carmatch;
\q

# 4. Запускаем миграции
python -c "from database import Base, engine; Base.metadata.create_all(bind=engine)"

# 5. Заполняем тестовыми данными
psql -U postgres -d carmatch -f seed_data.sql

# 6. Запускаем сервер
uvicorn main:app --reload --port 8000

📡 API эндпоинты (что сюда стучаться)
Метод	URL	                Что делает	                            Тело запроса
POST	/auth/register	    Создать аккаунт	                      {username, email, password}
POST	/auth/login	        Войти в систему	                      {username, password}
GET	    /auth/me	        Кто я?	                              —
POST	/match	            Подобрать авто	                      {age, color, drink, rhythm, style}
GET	    /matches	        История подборов	                  —
DELETE	/matches/{id}	    Удалить позорный подбор	              —


🗄️ База данных (куда всё сохраняется)

-- Пользователи
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Подборы
CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    age INTEGER,
    color VARCHAR(50),
    drink VARCHAR(50),
    rhythm VARCHAR(50),
    style VARCHAR(50),
    result_brand VARCHAR(100),
    created_at TIMESTAMP DEFAULT NOW()
);