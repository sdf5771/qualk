from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from passlib.context import CryptContext
from app.model.model_login import user
from dotenv import load_dotenv
from fastapi.encoders import jsonable_encoder
import datetime
import jwt
from sqlalchemy import create_engine, desc, asc
from sqlalchemy.orm import Session, sessionmaker

import os

load_dotenv(verbose=True)

_DB_ID = os.getenv('DB_ID')
_DB_PASS = os.getenv('DB_PASS')
_DB_IP = os.getenv('DB_IP')
_DB_SCHEMA = os.getenv('DB_SCHEMA')
_DB_PORT = os.getenv('DB_PORT')


SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{_DB_ID}:{_DB_PASS}@{_DB_IP}:{_DB_PORT}/{_DB_SCHEMA}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# ACCESS_TOKEN_EXPIRE_MINUTES = 30
# REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7
# ACCESS_SECRET_KEY = "1UIERIGNRUIG1IU24BUIOABOIASBDIFHBQ3"
# REFRESH_SECRET_KEY = "SDFKWEJFKFIOBDFJIOASJIOFJIOAEJFIOWE2"
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))
REFRESH_TOKEN_EXPIRE_MINUTES = int(os.getenv('REFRESH_TOKEN_EXPIRE_MINUTES'))
ACCESS_SECRET_KEY = os.getenv('ACCESS_SECRET_KEY')
REFRESH_SECRET_KEY = os.getenv('REFRESH_SECRET_KEY')
# ALGORITHM = os.getenv('ALGORITHM')

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

db = SessionLocal()

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"expire": expire})
    encoded_jwt = jwt.encode(to_encode, ACCESS_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"expire": expire})
    encoded_jwt = jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_access_token(token):
    decode_data = jwt.decode(token, ACCESS_SECRET_KEY, algorithms=[ALGORITHM])
    now_time_second = datetime.datetime.utcnow()
    if decode_data['expire'] < now_time_second:
        raise HTTPException(status_code=404, detail=str('엑세스 토큰 기간 만료'))
    return 

def get_refresh_token(token):
    decode_data = jwt.decode(token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
    now_time_second = datetime.datetime.utcnow()
    if decode_data['expire'] < now_time_second:
        raise HTTPException(status_code=404, detail=str('엑세스 토큰 기간 만료'))
    return decode_data

def get_db():
    try: 
        db = SessionLocal()
        yield db
    finally:
        db.close()  

def login(
            userId,
            password
        ):
    total_results = (
        db.query(user)
        .filter(user.userId == userId)
        .filter(user.password == password)
        .all()
    )

    if not total_results:
        raise HTTPException(status_code=404, detail=str('wrong id or password'))
    
    total_results = [{'userId':result.userId} for result in total_results][0]
    
    access_token = create_access_token(total_results)
    refresh_token = create_refresh_token(total_results)
    
    response = JSONResponse(content=refresh_token)
    response.set_cookie(key="refreshToken", value=refresh_token)

    return response
    
    # return jsonable_encoder({
    #     'accessToken':access_token,
    #     'refreshToken':refresh_token
    # })

def service_1(token, token2):
    data = get_access_token(token)
    data2 = get_refresh_token(token2)
    print(data)
    print(data2)


if __name__=="__main__":
    # userId = 'kzsc5464'
    # password = 'quddlr12'
    # data = login(userId, password)
    service_1('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJrenNjNTQ2NCIsImV4cCI6MTY5MjExMzk3Mn0.qxjjGSkhnzhyse3cHcysN6Y7N8rrh9CrV4eALF2wHXs eyJhbG',
              'ciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJrenNjNTQ2NCIsImV4cCI6MTY5MzMyMTc3Mn0.wkwFbmvvy_1o33dwAoE6vlNsrRN7NwbsYx6OVvUS8N8')


