from datetime import datetime, timezone, timedelta
from jose import JWTError, jwt

class JWTService:
    SECRET="efhe98ni992j0"
    ALGORITHM= "HS256"
    EXPIRY_TIME_IN_MINUTES= 5
    EXPIRY_TIME_IN_DAYS= 7

    def create_access_token(self, email: str):
        data = {"email": email}
        expiry = datetime.now(timezone.utc) + timedelta(minutes=self.EXPIRY_TIME_IN_MINUTES)
        data.update({"exp": expiry})

        return jwt.encode(data, self.SECRET, self.ALGORITHM)



    def create_refresh_token(self, email: str):
        data = {"email": email}
        expiry = datetime.now(timezone.utc) + timedelta(days=self.EXPIRY_TIME_IN_DAYS)
        data.update({"exp": expiry})

        return jwt.encode(data, self.SECRET, self.ALGORITHM)

    # @staticmethod
    def decode(self, token: str):
        try:
            return jwt.decode(token, self.SECRET, self.ALGORITHM)
        except JWTError as ex:
            print(f"JWT Token Error: {str(ex)}")
            return None