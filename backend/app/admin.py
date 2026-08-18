from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .database import get_db
from .models import Prediction
from .schemas import PredictionDetails

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get('/prediction', response_model=list[PredictionDetails])
def all_prediction(db: Session= Depends(get_db)):
    result = (db.query(Prediction).order_by(Prediction.created_at.desc()).all())
    return result