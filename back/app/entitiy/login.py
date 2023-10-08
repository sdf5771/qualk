from pydantic import BaseModel
from typing import List

class BaseUser(BaseModel):
    userId: str
    password: str

class BaseCreate(BaseModel):
    userId: str
    password: str
    terms: List[int]
    
class AccessToken(BaseModel):
    accessToken: str

class Token(BaseModel):
    accessToken: str
    refreshToken: str

class ChangePassword(BaseModel):
    token: str
    newPassword : str