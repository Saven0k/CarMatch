from schemas import QuizInput, CarOut

def match_car(quiz, cars_db):
    recommendations = []
    for car in cars_db:
        points = 0
        reasons = []
        if quiz.age < 25 and car.year > 2018:
            points += 20
            reasons.append("Современный автомобиль для молодости")
        elif 25 <= quiz.age <= 40 and "comfort" in car.vibe:
            points += 15
        if quiz.favorite_color.lower() == car.color.lower():
            points += 30
            reasons.append(f"Идеальный цвет — {car.color}")
        if quiz.favorite_drink == "coffee" and "coffee" in car.vibe:
            points += 25
            reasons.append("Подходит для утреннего кофе")
        elif quiz.favorite_drink == "energy" and car.vibe == "sport":
            points += 25
        if quiz.lifestyle == "active" and "sport" in car.vibe:
            points += 25
            reasons.append("Для активного образа жизни")
        
        match_pct = min(98, max(10, points))
        if match_pct > 30:
            recommendations.append(CarOut(
                id=car.id,
                brand=car.brand,
                model=car.model,
                year=car.year,
                color=car.color,
                price=car.price,
                image_url=car.image_url,
                match_percent=match_pct,
                reason=", ".join(reasons) if reasons else "Хороший баланс характеристик"
            ))
    return sorted(recommendations, key=lambda x: x.match_percent, reverse=True)[:3]