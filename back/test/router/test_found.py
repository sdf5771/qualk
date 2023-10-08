import random
import uuid

from app.database.mysql import select, insert, update

from fastapi import APIRouter, HTTPException, Request, Response, Depends
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from test.model.model_auth import auth_token

# auth
from app.utils.auth import hash_password

# login 보안
import secrets
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import create_engine, desc, asc
from sqlalchemy.orm import Session, sessionmaker
from datetime import date
from dotenv import load_dotenv
from passlib.context import CryptContext
from app.database.mysql import get_db

import jwt
import datetime
import os

load_dotenv(verbose=True)

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))
REFRESH_TOKEN_EXPIRE_MINUTES = int(os.getenv('REFRESH_TOKEN_EXPIRE_MINUTES'))
ACCESS_SECRET_KEY = os.getenv('ACCESS_SECRET_KEY')
REFRESH_SECRET_KEY = os.getenv('REFRESH_SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')

router = APIRouter(
    prefix="/api/v1/test_login/found"
)

async def login(
                id: userid,
                db: Session = Depends(get_db)
                ):


    userid = {'sub':userid}

    access_token = create_access_token(userid)
    print(access_token)

    new_token = auth_token(userId=userid, token=access_token)
    # 세션에 추가
    db.add(new_token)

    response = JSONResponse(content={"accessToken": access_token})
    return response

@router.post("/refresh")
async def auth_test(request: Request, response: Response):
    try:
        refresh_token = request.cookies.get("lseerapple")
        payload = jwt.decode(refresh_token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        if payload == 'expired':
            return HTTPException(status_code=401, detail=str('refresh token expired'))
    except Exception as e:
        return HTTPException(status_code=500, detail=str(f'{e}'))
    
    access_token = create_access_token(payload)
    refresh_token = create_refresh_token(payload)

    response = JSONResponse(content={"accessToken": access_token})
    response.set_cookie(key="lseerapple", value=refresh_token, httponly=True)
    return response

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
    
if __name__=="__main__":
    login("kzsc5464")