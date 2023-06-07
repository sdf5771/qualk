from pydantic import BaseModel

class user(BaseModel):
    userId: str
    userEmail: str
    userPassword: str

class Token(BaseModel):
    access_token: str
    token_type: str
    username: str