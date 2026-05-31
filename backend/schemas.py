from pydantic import BaseModel
from typing import List, Optional

class UserCreate(BaseModel):
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password: str

class QuizInput(BaseModel):
    age: int
    favorite_color: str
    favorite_drink: str
    lifestyle: str   

class CarOut(BaseModel):
    id: int
    brand: str
    model: str
    year: int
    color: str
    price: int
    image_url: str
    match_percent: int
    reason: str

class Token(BaseModel):
    access_token: str
    token_type: str