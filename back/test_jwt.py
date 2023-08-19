import os

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from passlib.context import CryptContext
import jwt
import datetime


import hashlib

ACCESS_TOKEN_EXPIRE_MINUTES = 30
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7
SECRET_KEY = "1UIERIGNRUIG1IU24BUIOABOIASBDIFHBQ3"
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "password": "secret",
    }
}
class User(BaseModel):
    username: str

class UserInDB(User):
    password: str

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)

def create_jwt_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token: str = Depends(oauth2_scheme)):
# def get_current_user(token):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)
        username: str = payload.get("sub")
        # if username is None:
        #     raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception

    user = get_user(fake_users_db, username=username)
    if user is None:
        raise credentials_exception
    return user




if __name__=="__main__":
    test_dict = {
        'username':'johndoe',
        'password':'secret'
    }
    test_data = create_jwt_token(test_dict)
    print(test_data)
    payload = jwt.decode(test_data, SECRET_KEY, algorithms=[ALGORITHM])
    print(payload)
    print(type(payload))
    # decode_date = get_current_user(test_data)

    # print(decode_date)
