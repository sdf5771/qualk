import random
import uuid

from app.database.query import select, insert, update

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from app.entitiy.login import user

# login 보안
import secrets
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt

router = APIRouter(
    prefix="/api/v1/login"
)

@router.post("/")
async def create_test(user: user):
    return jsonable_encoder({'loginId' : user.userId})

@router.get("/")
async def create_test(user: user):
    return jsonable_encoder()

@router.put("/")
async def create_test(user: user):
    return jsonable_encoder()

@router.delete("/")
async def create_test(user: user):
    return jsonable_encoder()