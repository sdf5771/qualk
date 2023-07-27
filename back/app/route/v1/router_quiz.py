import random
import uuid

from app.database.mysql import select, insert, update
from app.logic.quiz_logic import get_content_kr, get_content
from fastapi import APIRouter, HTTPException, Depends
from fastapi.encoders import jsonable_encoder
# Model
from app.model.model_quiz import QuestionContent, QuestionInfo 
from typing import List
from pydantic import BaseModel
#Conn
from sqlalchemy import create_engine, desc, asc
from sqlalchemy.orm import Session, sessionmaker
from datetime import date
from dotenv import load_dotenv
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

class Question(BaseModel):
    contentId: int
    title: str
    type: str
    view: int
    create: date
    tag: List[str]
    total: int


router = APIRouter(prefix="/api/v1/quiz")
db = SessionLocal()

def get_db():
    try: 
        db = SessionLocal()
        yield db
    finally:
        db.close()

@router.get("/list", response_model=List[Question])
def find_top(
             _type: str,
             list_type : str,
             page: int = 1,
             page_size: int = 6,
             db: Session = Depends(get_db)
            ):
    try:
        if list_type.lower() == 'view':
            order = desc(QuestionInfo.view)
        elif list_type.lower() == 'old':
            order = asc(QuestionInfo.CreateDate)
        elif list_type.lower() == 'new':
            order = desc(QuestionInfo.CreateDate)

        total_results = (
            db.query(QuestionContent)
            .join(QuestionInfo, QuestionContent.ContentID == QuestionInfo.ContentID)
            .filter(QuestionInfo.Type == _type)
            .count()
        )

        total_pages = (total_results - 1) // page_size + 1

        first_result = (page - 1) * page_size

        result = (
            db.query(QuestionContent.ContentID, 
                     QuestionContent.Title, 
                     QuestionInfo.Type, 
                     QuestionInfo.view, 
                     QuestionInfo.CreateDate, 
                     QuestionInfo.Tag)
            .join(QuestionInfo, QuestionContent.ContentID == QuestionInfo.ContentID)
            .filter(QuestionInfo.Type == _type)
            .order_by(order)
            .offset(first_result)
            .limit(page_size)
            .all()
        )

        response = []
        for i in result:
            tags = i.Tag.split(',') if i.Tag else []
            question = Question(
                contentId=i.ContentID,
                title=i.Title,
                type=i.Type,
                view=i.view,
                create=i.CreateDate,
                tag=tags,
                total=total_pages
            )
            response.append(question)

        return response
    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))

@router.get("/")
async def get_problem(content_type: str, content_id: int, lang:str):
    if lang == 'Korea':
        content = get_content(content_type, content_id, 'question_content_kr')
    elif lang == 'English':
        content = get_content(content_type, content_id, 'question_content_en')
        table = 'question_info'
    view = f"""update question_info set view = view + 1 where info_id = {content_id};"""

    update(sql=view)

    if not content:
        raise HTTPException(status_code=404, detail="no data")
    content = content[0]
    if content['contents'] is not None:
        try:
            content['contents'] = content['contents'].split(',')
        except Exception as error:
            raise HTTPException(status_code=500, detail=str(error))
    else:
        raise HTTPException(status_code=404, detail=f"{content_id} is Not found")
    return jsonable_encoder({
        'contentId':content['content_id'],
        'title':content['title'],
        'type':content['type'],
        'contents':content['contents'],
        'correct':content['correct'],
        'description':content['description'],
        'lang':content['lang'],
        'reference':content['reference_url'],
        'isTrance':True if content['is_trance'] else False
    })
