import random
import uuid

from app.database.mysql import select, insert, update

from fastapi import APIRouter, HTTPException, Request, Response, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from app.entitiy.login import BaseCreate, AccessToken, Token
from app.model.model_login import user
from app.model.model_singup import terms_content

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

# SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{_DB_ID}:{_DB_PASS}@{_DB_IP}:{_DB_PORT}/{_DB_SCHEMA}"
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{_DB_ID}:{_DB_PASS}@{_DB_IP}:{_DB_PORT}/{_DB_SCHEMA}"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

db = SessionLocal()

router = APIRouter(
    prefix="/api/v1/signup"
)

def get_db():
    try: 
        db = SessionLocal()
        yield db
    finally:
        db.close()

@router.post("/")
async def create(
                base_user: BaseCreate,
                db: Session = Depends(get_db)
    ):
    total_results = (
        db.query(user)
        .filter(user.userId == base_user.userId)
        .all()
    )
    if total_results:
        raise HTTPException(status_code=409, detail=str('이미 존재하는 아이디에요.'))

    sql = f"""INSERT INTO user(userId, password) VALUES ('{base_user.userId}','{base_user.password}')"""
    insert(sql)
    for index, terms in enumerate(base_user.terms):
        sql = f"""INSERT INTO terms_consent_history(termsId, userId, hasAgreed) VALUES ({index},'{base_user.userId}', '{terms}')"""
        insert(sql)        

    # userid = {'sub':base_user.userId}
    
    # access_token = create_access_token(userid)
    # refresh_token = create_refresh_token(userid)

    # response = JSONResponse(content={"accessToken": access_token})
    # response.set_cookie(key="lseerapple", value=refresh_token, httponly=True)

    response = JSONResponse(content={"message": "회원가입 성공했어요!"}, status_code=201)
    # response.set_cookie(key="lseerapple", value=refresh_token, httponly=True)

    return response

@router.get("/terms")
async def get_terms(db: Session = Depends(get_db)):
    total_results = (
        db.query(terms_content)
        .all()
        )
    return jsonable_encoder(total_results)

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
    except Exception as e:
        return f"{e}"
    
def refresh_verify_token(token: str):
    try:
        # JWT 토큰을 디코딩하고 만료 시간을 검증합니다.
        payload = jwt.decode(token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return "expired"
    except Exception as e:
        return f"{e}"