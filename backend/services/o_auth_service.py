from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app import UserModel
from services import JWTService
from app import get_db

oauth_scheme = OAuth2PasswordBearer(tokenUrl="/signin")

async def get_current_user(token: str = Depends(oauth_scheme), db: Session = Depends(get_db)):
    payload = JWTService().decode(token=token)
    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )
    email: str = payload.get("email")
    result = db.query(UserModel).filter(UserModel.email==email).first()
    # print(result.name)
    if not result:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    return {
        "email": email, 
        "username": result.name,
        "isAdmin": result.isAdmin
    }



def require_admin(current_user: dict = Depends(get_current_user)):
    if not current_user["isAdmin"]:
        raise HTTPException(
            ststus_code=403,
            details="Admin privilages required"
        )
    return current_user