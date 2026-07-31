# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from pydantic import BaseModel
import joblib
import numpy as np
import uvicorn

app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://diabetes.local",
]

app.add_middleware(
    CORSMiddleware,
    # allow_origins = origins,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "model" / "diabetes_model.pkl"
model = joblib.load(MODEL_PATH)

class DiabetesInput(BaseModel):
    Pregnancies: int
    Glucose: float
    BloodPressure: float
    BMI: float
    Age: int

class Result(BaseModel):
    diabetes: bool

@app.get("/")
def read_root():
    return {"message": "Diabetes Prediction API is live"}

@app.post("/predict", response_model=Result)
def predict(data: DiabetesInput):
    input_data = np.array([[data.Pregnancies, data.Glucose, data.BloodPressure, data.BMI, data.Age]])
    prediction = model.predict(input_data)[0]
    # return {"diabetic": bool(prediction)}
    return Result(diabetes=bool(prediction))


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)