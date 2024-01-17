import random
import uuid

from app.database.mysql import select, insert, update

from fastapi import APIRouter, HTTPException, Request, Response, Depends
from fastapi.responses import JSONResponse, RedirectResponse
from fastapi.encoders import jsonable_encoder
from app.entitiy.login import BaseUser, AccessToken, ChangePassword, Userid
from app.model.model_login import user, AuthToken
from app.utils.auth import *
from app.utils.auth_smtp import *

# auth
from app.utils.auth import hash_password, create_access_token, create_refresh_token

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
import logging

load_dotenv(verbose=True)

SQLALCHEMY_DATABASE_URL = os.getenv('MYSQL_ENGINE')
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    try: 
        db = SessionLocal()
        yield db
    finally:
        db.close() 

router = APIRouter(
    prefix="/api/v1/login"
)

@router.post("/")
async def login(
                base_user: BaseUser,
                db: Session = Depends(get_db)
                ):
    try:
        total_results = (
            db.query(user)
            .filter(user.userId == base_user.userId)
            .filter(user.password == hash_password(base_user.password))
            .one()
        )
    except Exception as e:
        return HTTPException(status_code=401, detail=str('wrong id or password'))

    userid = total_results.userId

    userid = {'sub':userid}
    access_token = create_access_token(userid)
    refresh_token = create_refresh_token(userid)

    response = JSONResponse(content={"accessToken": access_token})
    response.set_cookie(key="lseerapple", value=refresh_token, httponly=True)

    return response

@router.post("/access")
async def auth_access(Token: AccessToken):
    """
    Response
    {
            "userId": "sitt",
            "isExpired": false
    }
    """
    try:
        payload = access_verify_token(Token.accessToken)
        
        if payload == 'expired':
            return jsonable_encoder({
                       'userId': None,
                       'isExpired': True
                   })
        
        if payload == 'Not enough segments':
            return jsonable_encoder({
                       'userId': None,
                       'isExpired': True
                   })
    except Exception as e:
        return HTTPException(status_code=500, detail=str(f'{e}'))
    return jsonable_encoder({
        'userId': payload["sub"],
        'isExpired': False
    })

@router.get("/check_auth_email/")
async def recive_auth_email(
                        token, 
                        db: Session = Depends(get_db)):
    id = access_verify_token(token)

    if id == 'expired':
        return HTTPException(status_code=401, detail=str('Access token expired'))

    total_results = (
        db.query(AuthToken)
        .filter(AuthToken.userId == id['sub'])
        .all()
    )

    if not total_results:
        raise HTTPException(status_code=401, detail=str('wrong id or password'))

    eamil_check_user = (
        db.query(user)
        .filter(user.userId == id['sub'])
        .first()
    )
    if eamil_check_user:
        eamil_check_user.emailCheck = 1
        db.commit()
        db.close()
    db.close()

    return RedirectResponse("https://qualk.co.kr")

@router.get("/refresh_auth_email/")
async def recive_auth_email(token, 
                            db: Session = Depends(get_db)):
    
    id = access_verify_token(token)

    print(id)

    if id == 'expired':
        return HTTPException(status_code=401, detail=str('Access token expired'))
    
    total_results = (
        db.query(AuthToken)
        .filter(AuthToken.userId == id['sub'])
        .all()
    )
    if not total_results:
        raise HTTPException(status_code=401, detail=str('wrong id or password'))

    return RedirectResponse("https://qualk.co.kr/changepassword/" + token)

@router.post("/refresh_password")
async def refresh_password(
                    auth_user: ChangePassword,
                    db: Session = Depends(get_db)
                ):

    refresh_user = (
        db.query(user)
        .filter(user.userId == auth_user.userId)
        .first()
    )

    auth_password = hash_password(auth_user.password)

    if refresh_user:
        refresh_user.password = auth_password
        db.commit()
        db.close()
    
    return "비밀번호가 정상적으로 변경 되었습니다."

@router.get("/add_auth_email")
async def get_date(
                    userid:str,
                    db: Session = Depends(get_db)
                ):

    payload = {'sub': userid}

    access_token = create_access_token(payload)
    token = AuthToken(UserId=userid, Token=access_token)

    db.add(token)
    db.commit()
    db.close()
    
    response = JSONResponse(export_auth_email(userid, access_token))

    return response

@router.post("/change_password_auth_email")
async def output_email(
            userid: Userid,
            db: Session = Depends(get_db)
        ):
    
    payload = {'sub': userid.userId}

    access_token = create_access_token(payload)
    token = AuthToken(userId=userid.userId, token=access_token)

    db.add(token)
    db.commit()
    db.close()
    
    response = JSONResponse(refresh_auth_email(userid.userId, access_token))

    return response

def export_auth_email(userid, access_token):
    send_mail(userid, "https://qualk.co.kr/api/v1/login/check_auth_email/?token=" + access_token)
    return "Success"

def refresh_auth_email(userid, access_token):
    send_mail(userid, "https://qualk.co.kr/changepassword/" + access_token, 1)
    return "Success"