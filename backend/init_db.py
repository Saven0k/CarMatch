from database import engine, SessionLocal
import models
from auth import get_password_hash

models.Base.metadata.drop_all(engine)
models.Base.metadata.create_all(engine)

db = SessionLocal()

test_user = models.User(
    username="testuser", 
    hashed_password=get_password_hash("123")
)
db.add(test_user)

cars = [
    models.Car(
        brand="Tesla", 
        model="Model 3", 
        year=2023, 
        color="Red", 
        price=45000, 
        image_url="https://via.placeholder.com/300?text=Tesla", 
        vibe="coffee_sport", 
        description="Электромобиль будущего, мгновенный разгон и минималистичный дизайн"
    ),
    models.Car(
        brand="BMW", 
        model="X5", 
        year=2021, 
        color="Black", 
        price=65000, 
        image_url="https://via.placeholder.com/300?text=BMW", 
        vibe="sport_active", 
        description="Мощный внедорожник с отличной управляемостью"
    ),
    models.Car(
        brand="Volkswagen", 
        model="Golf", 
        year=2020, 
        color="Blue", 
        price=22000, 
        image_url="https://via.placeholder.com/300?text=Golf", 
        vibe="calm_coffee", 
        description="Надежный хэтчбек, идеален для города"
    ),
    models.Car(
        brand="Toyota", 
        model="Camry", 
        year=2022, 
        color="White", 
        price=28000, 
        image_url="https://via.placeholder.com/300?text=Camry", 
        vibe="comfort", 
        description="Семейный седан с отличной репутацией"
    ),
    models.Car(
        brand="Lada", 
        model="Vesta", 
        year=2024, 
        color="Red", 
        price=15000, 
        image_url="https://via.placeholder.com/300?text=Vesta", 
        vibe="simple", 
        description="Доступный автомобиль для ежедневных поездок"
    ),
    models.Car(
        brand="Audi", 
        model="A6", 
        year=2023, 
        color="Black", 
        price=55000, 
        image_url="https://via.placeholder.com/300?text=Audi", 
        vibe="comfort", 
        description="Бизнес-класс с премиальным салоном"
    ),
    models.Car(
        brand="Mercedes", 
        model="C-Class", 
        year=2022, 
        color="White", 
        price=48000, 
        image_url="https://via.placeholder.com/300?text=Mercedes", 
        vibe="coffee", 
        description="Элегантный и технологичный седан"
    )
]

for car in cars:
    db.add(car)

db.commit()
db.close()

print("=" * 50)
print("✅ База данных успешно создана!")
print("👤 Тестовый пользователь: testuser / 123")
print("🚗 Добавлено автомобилей:", len(cars))
print("=" * 50)