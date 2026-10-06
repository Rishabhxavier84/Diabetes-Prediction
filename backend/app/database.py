from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session, declarative_base

Base = declarative_base()

DB_URL = "sqlite:///./data/diabetes.db"

engine = create_engine(
    DB_URL,
    connect_args={"check_same_thread": False}
)

Session = scoped_session(
    sessionmaker(
        autoflush=False,
        autocommit=False,
        bind=engine
    )
)


def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()