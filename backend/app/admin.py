import os
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, time

from .database import get_db
from .models import Prediction
from .models import UserModel
from .schemas import PredictionDetails
from services import get_current_user, require_admin
from app import AdminUpdate

load_dotenv()

router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get('/prediction', response_model=list[PredictionDetails])
def all_prediction(current_user: str = Depends(get_current_user) ,db: Session= Depends(get_db)):
    user_email = current_user["email"]
    is_admin = (db.query(UserModel.isAdmin).filter(UserModel.email == user_email).scalar())
    if is_admin:
        result = (db.query(Prediction).order_by(Prediction.created_at.desc()).all())
    else:
        result = (db.query(Prediction).filter(Prediction.email == user_email).order_by(Prediction.created_at.desc()).all())
    return result

@router.get('/stats')
def stats(current_user: str = Depends(get_current_user), db: Session= Depends(get_db)):
    total = db.query(Prediction).count()
    diabetic = db.query(Prediction).filter(Prediction.prediction == True).count()
    non_diabetic = db.query(Prediction).filter(Prediction.prediction == False).count()
    start_of_day = datetime.combine(
        datetime.now().date(),
        time.min
    )
    end_of_day = datetime.combine(
        datetime.now().date(),
        time.max
    )
    today_prediction = db.query(Prediction).filter(Prediction.created_at >= start_of_day, Prediction.created_at <= end_of_day).count()
    return {
        "total": total,
        "diabetic": diabetic,
        "non_diabetic": non_diabetic,
        "today_prediction": today_prediction
    }

@router.delete("/cleanup")
def cleanup_dummy_data(db: Session= Depends(get_db)):
    deleted_count = db.query(Prediction).filter(Prediction.name == "string").delete(synchronize_session=False)
    db.commit()
    return {
        "clean_up" : True,
        "deleted" : deleted_count
    }


@router.get("/users")
def get_all_users(db: Session = Depends(get_db), admin: dict = Depends(require_admin)):
    users = db.query(UserModel).all()
    return[
        {
            "uid": user.uid,
            "username": user.name,
            "email": user.email,
            "isAdmin": user.isAdmin
        }
        for user in users
    ]


@router.patch("/users/{uid}/admin")
def update_admin(
    uid: int,
    payload: AdminUpdate,
    db: Session = Depends(get_db),
    admin: dict = Depends(require_admin)
):
    user = db.query(UserModel).filter(UserModel.uid == uid).first()

    if not user:
        raise HTTPException(
            status_code= 404,
            detail= "User not found"
        )

    if user.email == admin["email"] and not payload.isAdmin:
        raise HTTPException(
            status_code= 400,
            detail="Cannot alter your own admin privileges"
        )
    user.isAdmin = payload.isAdmin

    db.commit()
    db.refresh(user)

    return{
        'message': "Admin privileges updated",
        "uid": user.uid,
        "username": user.name,
        "email": user.email,
        "isAdmin": user.isAdmin
    }