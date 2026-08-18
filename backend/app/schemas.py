from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


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
