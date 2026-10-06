from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime
from .database import Base
from datetime import datetime

class Prediction(Base):
    __tablename__= "predictions"

    # Patient info
    uid = Column("uid", Integer, primary_key=True, autoincrement=True)
    name = Column('name', String, nullable=False)

    # Patient input
    pregnancies = Column('pregnancies', Integer, nullable=False)
    glucose = Column('glucose', Float, nullable=False)
    blood_pressure = Column('blood_pressure', Float, nullable=False)
    bmi = Column('bmi', Float, nullable=False)
    age = Column('age', Integer, nullable=False)

    # Model output
    probability = Column('probability', Float, nullable=True)
    prediction = Column('prediction', Boolean, nullable=False)

    # User
    email = Column('email', String, nullable=False)

    # Metadata
    model_version = Column('model_version', String, nullable=False)
    created_at = Column('created_at', DateTime, default=datetime.now, nullable=False)

    def __repr__(self):
        return f"<Prediction uid={self.uid} name={self.name}>"

class UserModel(Base):
    __tablename__= "users"

    uid = Column(Integer, primary_key= True, autoincrement=True)
    name = Column(String, nullable= False)
    email = Column(String, nullable=False)
    isAdmin = Column(Boolean, default=False)                   # TODO
    hashed_pwd = Column(String, nullable= False)
    refresh_token = Column(String, nullable= True)
    created_at = Column(DateTime, default=datetime.now, nullable= False)
    updated_at = Column(DateTime, default=datetime.now, onupdate=datetime.now, nullable= False)