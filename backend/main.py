from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import models, schemas, auth
from database import engine, get_db
import json
from logic import match_car

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/register", response_model=schemas.Token, status_code=status.HTTP_201_CREATED)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.username == user.username).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_password = auth.get_password_hash(user.password)
    db_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Создаем токен
    token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}


@app.post("/login", response_model=schemas.Token)
def login(form_data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.post("/quiz", response_model=list[schemas.CarOut])
def get_recommendations(quiz: schemas.QuizInput, db: Session = Depends(get_db), current_user=Depends(auth.get_current_user)):
    cars = db.query(models.Car).all()
    results = match_car(quiz, cars)
    history = models.RecommendationHistory(user_id=current_user.id, result_json=json.dumps([r.dict() for r in results]))
    db.add(history)
    db.commit()
    return results

@app.get("/history")
def get_history(db: Session = Depends(get_db), current_user=Depends(auth.get_current_user)):
    history = db.query(models.RecommendationHistory).filter(models.RecommendationHistory.user_id == current_user.id).all()
    return history