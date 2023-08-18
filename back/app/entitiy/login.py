from pydantic import BaseModel

class BaseUser(BaseModel):
    userId: str
    password: str

class AccessToken(BaseModel):
    accessToken: str

class Token(BaseModel):
    accessToken: str
    refreshToken: str