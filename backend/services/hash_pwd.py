from passlib.context import CryptContext

class HashService:
    SECRET_KEY = "abcd123"

    def __init__(self, pwd_context: CryptContext):
        self.pwd_context = pwd_context

    def hash_pwd(self, password: str):
        password_concat = password + self.SECRET_KEY
        return self.pwd_context.hash(password_concat)

    def verify_pwd(self, password: str, hashed_password: str):
        password_concat = password + self.SECRET_KEY
        return self.pwd_context.verify(password_concat, hashed_password)