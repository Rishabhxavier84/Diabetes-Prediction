import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime, time

from .database import get_db
from .models import Prediction
from .models import UserModel
from .schemas import PredictionDetails
from services import get_current_user

load_dotenv()

router = APIRouter(prefix="/user", tags=["User"])


@router.get('/prediction', response_model=list[PredictionDetails])
def all_prediction(current_user: str = Depends(get_current_user) ,db: Session= Depends(get_db)):
    user_email = current_user["email"]
    # is_admin = (db.query(UserModel.isAdmin).filter(UserModel.email == user_email).scalar())
    # if is_admin:
    #     result = (db.query(Prediction).order_by(Prediction.created_at.desc()).all())
    # else:
    result = (db.query(Prediction).filter(Prediction.email == user_email).order_by(Prediction.created_at.desc()).all())
    return result

@router.get('/stats')
def stats(current_user: str = Depends(get_current_user), db: Session= Depends(get_db)):
    user_email = current_user["email"]
    total = db.query(Prediction).filter(Prediction.email == user_email).count()
    diabetic = db.query(Prediction).filter(Prediction.email == user_email).filter(Prediction.prediction == True).count()
    non_diabetic = db.query(Prediction).filter(Prediction.email == user_email).filter(Prediction.prediction == False).count()
    start_of_day = datetime.combine(
        datetime.now().date(),
        time.min
    )
    end_of_day = datetime.combine(
        datetime.now().date(),
        time.max
    )
    today_prediction = db.query(Prediction).filter(Prediction.email == user_email).filter(Prediction.created_at >= start_of_day, Prediction.created_at <= end_of_day).count()
    return {
        "total": total,
        "diabetic": diabetic,
        "non_diabetic": non_diabetic,
        "today_prediction": today_prediction
    }

# @router.delete("/cleanup")
# def cleanup_dummy_data(db: Session= Depends(get_db)):
#     deleted_count = db.query(Prediction).filter(Prediction.name == "string").delete(synchronize_session=False)
#     db.commit()
#     return {
#         "clean_up" : True,
#         "deleted" : deleted_count
#     }