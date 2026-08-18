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

    # Metadata
    model_version = Column('model_version', String, nullable=False)
    created_at = Column('created_at', DateTime, default=datetime.now, nullable=False)

    def __repr__(self):
        return f"<Prediction uid={self.uid} name={self.name!r}>"

    # def __init__(self, name, pregnancies, glucose, blood_pressure, bmi, age):
    #     self.name = name
    #     self.pregnancies = pregnancies
    #     self.glucose = glucose
    #     self.blood_pressure = blood_pressure
    #     self.bmi = bmi
    #     self.age = age

    # def __repr__(self):
    #     return f"** name: {self.name} ** \npregnancies: {self.pregnancies}, \nglucose: {self.glucose}, \nblood_pressure: {self.blood_pressure}, \nbmi: {self.bmi}, \nage: {self.age},"