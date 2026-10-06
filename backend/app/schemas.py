from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict, EmailStr


class DiabetesInput(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    pregnancies: int = Field(ge=0)
    glucose: float = Field(gt=0)
    blood_pressure: float = Field(gt=0)
    bmi: float = Field(gt=0)
    age: int = Field(gt=0)

class Result(BaseModel):
    diabetes: bool

class PredictionDetails(BaseModel):
    uid: int 
    name: str

    pregnancies: float
    glucose: float
    blood_pressure: float
    bmi: float
    age: int

    probability: float | None = None
    prediction: bool

    model_version: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class SignUp(BaseModel):
    name: str
    email: EmailStr
    password: str
    isAdmin: bool = False
    refresh_token: str | None = None
    model_config = ConfigDict(from_attributes=True)


class SignIn(BaseModel):
    email: EmailStr
    password: str

class JWTOut(BaseModel):
    access_token: str
    refresh_token: str
    status_code: int
    content: str

class AddInput(BaseModel):
    name: str
    cost: int

class DataOutput(BaseModel):
    name: str
    cost: int
    email: str

class RefreshToken(BaseModel):
    refresh_token: str

class AdminUpdate(BaseModel):
    isAdmin: bool