# main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import joblib
import numpy as np
import uvicorn
from sqlalchemy.orm import Session

from .schemas import DiabetesInput, Result
from .database import Base, engine, get_db
from .models import Prediction
from .admin import router as admin_router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(admin_router)

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



@app.get("/")
def read_root():
    return {"message": "Diabetes Prediction API is live"}

@app.post("/predict", response_model=Result)
def predict(data: DiabetesInput, db : Session = Depends(get_db)):

    input_data = np.array([[
        data.pregnancies, 
        data.glucose, 
        data.blood_pressure, 
        data.bmi, 
        data.age
    ]])

    prediction_output = bool(model.predict(input_data)[0])

    new_prediction = Prediction(
        name = data.name,
        pregnancies = data.pregnancies,
        glucose = data.glucose,
        blood_pressure = data.blood_pressure,
        bmi = data.bmi,
        age = data.age,
        probability = None,
        prediction = prediction_output,
        model_version = "v2",
    )

    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)
    
    return Result(diabetes=prediction_output)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)