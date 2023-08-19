import random
import uuid

from app.database.mysql import select, insert, update

from fastapi import APIRouter, HTTPException, Request, Response
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from app.entitiy.login import BaseUser, AccessToken, Token
from app.model.model_login import user

# login 보안
import secrets
from fastapi.security import OAuth2PasswordRequestForm
# from jose import jwt
#Conn
from sqlalchemy import create_engine, desc, asc
from sqlalchemy.orm import Session, sessionmaker
from datetime import date
from dotenv import load_dotenv

#token
from passlib.context import CryptContext
import jwt
import datetime

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

db = SessionLocal()

router = APIRouter(
    prefix="/api/v1/login"
)

# @router.post("/create")
# async def create_test(user: user):
#     sql=f"""INSERT INTO user(userId, password) VALUES('{user.userId}', '{user.password}');"""
#     insert(sql)
    
#     return jsonable_encoder({'loginId' : user.userId})

@router.post("/")
async def login(base_user: BaseUser):
    total_results = (
        db.query(user)
        .filter(user.userId == base_user.userId)
        .filter(user.password == base_user.password)
        .all()
    )
    if not total_results:
        raise HTTPException(status_code=401, detail=str('wrong id or password'))
    
    total_results = [{'sub':result.userId} for result in total_results][0]

    access_token = create_access_token(total_results)
    refresh_token = create_refresh_token(total_results)

    response = JSONResponse(content={"accessToken": access_token})
    response.set_cookie(key="lseerapple", value=refresh_token, httponly=True)

    return response

@router.post("/refresh")
async def auth_test(request: Request, response: Response):
    try:
        refresh_token = request.cookies.get("lseerapple")
        print(refresh_token)
        payload = jwt.decode(refresh_token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        print(payload)
        if payload == 'expired':
            return HTTPException(status_code=401, detail=str('refresh token expired'))
    except Exception as e:
        return HTTPException(status_code=500, detail=str(f'{e}'))
    access_token = create_access_token(payload)
    refresh_token = create_refresh_token(payload)

    response = JSONResponse(content={"access_token": access_token})
    response.set_cookie(key="lseerapple", value=refresh_token, httponly=True)
    return response

@router.post("/access")
async def auth_test(Token: AccessToken):
    try:
        payload = access_verify_token(Token.accessToken)
        if payload == 'expired':
            return HTTPException(status_code=401, detail=str('Access token expired'))
    except Exception as e:
        return HTTPException(status_code=500, detail=str(f'{e}'))
    return jsonable_encoder({
        'userId': payload["sub"]
    })

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))
REFRESH_TOKEN_EXPIRE_MINUTES = int(os.getenv('REFRESH_TOKEN_EXPIRE_MINUTES'))
ACCESS_SECRET_KEY = os.getenv('ACCESS_SECRET_KEY')
REFRESH_SECRET_KEY = os.getenv('REFRESH_SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')

def create_access_token(data: dict):
    to_encode = data.copy()
    print(ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, ACCESS_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, REFRESH_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def access_verify_token(token: str):
    try:
        # JWT 토큰을 디코딩하고 만료 시간을 검증합니다.
        payload = jwt.decode(token, ACCESS_SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return "expired"
        # 토큰이 만료된 경우 여기서 처리합니다.
    except Exception as e:
        return f"{e}"
        # 그 외의 다른 오류를 처리합니다.
        # raise Exception("Invalid token")
    
def refresh_verify_token(token: str):
    try:
        # JWT 토큰을 디코딩하고 만료 시간을 검증합니다.
        payload = jwt.decode(token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        # 토큰이 만료된 경우 여기서 처리합니다.
        return "expired"
    except Exception as e:
        # 그 외의 다른 오류를 처리합니다.
        return f"{e}"