from fastapi import APIRouter, Depends, HTTPException, Response
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from sqlalchemy import select
from app import UserModel, get_db, SignUp, SignIn, JWTOut, RefreshToken
from services import HashService
from services import JWTService, get_current_user

router = APIRouter(prefix="/auth", tags=["Auth"])

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.get('/me')
def username(current_user: str = Depends(get_current_user)):
    return {
        "email": current_user["email"], 
        "username": current_user["username"],
        "isAdmin": current_user['isAdmin']
    }


@router.post("/refresh", response_model=JWTOut)
async def refresh_token(payload: RefreshToken, db: Session = Depends(get_db)):
    decoded_token = JWTService().decode(token=payload.refresh_token)
    if decoded_token is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid token"
        )
    email: str = decoded_token.get("email")
    result = db.query(UserModel).filter(UserModel.email == email).first()
    if not result:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )
    if payload.refresh_token != result.refresh_token:
        raise HTTPException(
            status_code=401,
            detail="Invalid refresh token"
        )

    access_token = JWTService().create_access_token(email=email)
    refresh_token = JWTService().create_refresh_token(email=email)
    
    result.refresh_token = refresh_token
    db.commit()
    db.refresh(result)

    return JWTOut(
        access_token=access_token,
        refresh_token=refresh_token,
        status_code=200,
        content="Access token generated"
    )
    


@router.post("/signin")
async def sign_in(signin: SignIn, db: Session = Depends(get_db)):
    user_db_result = db.execute(select(UserModel).where(UserModel.email == signin.email.lower()))
    user = user_db_result.scalars().first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    pwd_valid = HashService(pwd_context=pwd_context).verify_pwd(signin.password, user.hashed_pwd)

    if not pwd_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    access_token = JWTService().create_access_token(email=signin.email.lower())
    refresh_token = JWTService().create_refresh_token(email=signin.email.lower())

    user.refresh_token = refresh_token
    db.commit()
    db.refresh(user)

    return JWTOut(
        access_token= access_token,
        refresh_token= refresh_token,
        status_code= 200,
        content= "User signed in"
    )


@router.post("/signup", response_model=JWTOut)
async def sign_up(signup: SignUp, db: Session = Depends(get_db)):
    if db.query(UserModel).filter(UserModel.email == signup.email.lower()).first():
        raise HTTPException(
            status_code=409,
            detail="User already exists"
        )
    hashed_pwd = HashService(pwd_context=pwd_context).hash_pwd(signup.password)

    user = UserModel(
        name = signup.name,
        email = signup.email.lower(),
        isAdmin = signup.isAdmin,
        hashed_pwd = hashed_pwd
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    raise HTTPException(
        status_code=200,
        detail= "user created"
    )