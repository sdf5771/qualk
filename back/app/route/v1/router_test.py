import uuid
import math

from app.database.mysql import select, insert, update
from app.logic.test_logic import find_test, get_ex_test, get_ex_time, make_questionlist, \
                                 get_content, put_content, result_wrong_case_cotent_id, \
                                 check_question, update_test_info, find_test_info, \
                                 find_wrong_content, delete_test, check_index,\
                                 find_time, make_questionlist_cache

from fastapi import APIRouter, HTTPException, Header
from fastapi.encoders import jsonable_encoder
from app.entitiy.test import Input_test
from dotenv import load_dotenv

import os
from passlib.context import CryptContext
import jwt
import datetime



router = APIRouter(
    prefix="/api/v1/test"
)

ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES'))
REFRESH_TOKEN_EXPIRE_MINUTES = int(os.getenv('REFRESH_TOKEN_EXPIRE_MINUTES'))
ACCESS_SECRET_KEY = os.getenv('ACCESS_SECRET_KEY')
REFRESH_SECRET_KEY = os.getenv('REFRESH_SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')

@router.post("/", status_code=201)
async def create_test(
                        Input_test: Input_test, 
                        authorization: str = Header('authorization')
                    ):
    """
        실질적인 문제 들어가기를 눌렀을 경우이고 실질적인 문제를 새롭게 만들었을 경우
    """
    payload = access_verify_token(authorization)
    if payload == 'expired':
        return HTTPException(status_code=401, detail=str('Access token expired'))
    if not payload:
        return HTTPException(status_code=401, detail=str('Access token Wrong'))

    test_id, test_index, time = None, None, 5400

    check_running_test = find_test(Input_test.UserID, Input_test.TestType, Input_test.QuestionNum)
    print(check_running_test)
    if check_running_test:
        test_id = check_running_test[0]['TestID']
        ex_test = get_ex_test(test_id)
        test_index = ex_test[0]['TestIndex']
        ex_time = get_ex_time(test_id)
        if ex_time[0]['SUM(`Interval`)'] is not None:
            time = time - ex_time[0]['SUM(`Interval`)']
    else:
        test_id = str(uuid.uuid4())
        insert_test_info = f"""INSERT INTO TestInfo(TestID,UserID,Status,TestType, QuestionNum)
                               VALUES('{test_id}','{Input_test.UserID}', 'RUNNING', '{Input_test.TestType}', {Input_test.QuestionNum})"""
        insert(sql=insert_test_info)

        question_ids = make_questionlist_cache(Input_test.TestType, Input_test.QuestionNum)
        for index, question in enumerate(question_ids, start=1):
            insert_content = f"""INSERT INTO TestContent(TestID, Name, ContentID, TestIndex)
                                 VALUES('{test_id}', '{Input_test.TestType}', '{question['ContentID']}', {index})"""
            insert(sql=insert_content)
        test_index = 1
    return jsonable_encoder({'testId': test_id, 'testIndex': test_index, 'time': time})

@router.get("/", status_code=200)
async def get_quiz(test_id: str,
                   test_index: int,
                   authorization: str = Header('authorization')
                ):
    """
        시험 문제 내용 출력
    """
    payload = access_verify_token(authorization)
    if payload == 'expired':
        return HTTPException(status_code=401, detail=str('Access token expired'))
    if not payload:
        return HTTPException(status_code=401, detail=str('Access token Wrong'))
    questionid_list = get_content(test_id, test_index)
    last_index = test_index % 10 == 0 and check_index(test_id) == test_index
    return jsonable_encoder({
                             'testId': test_id,
                             'title': questionid_list[0]['Title'],
                             'contentList': questionid_list[0]['ContentList'].split(','),
                             'lastIndex': last_index
                             })

@router.put("/")
async def user_input_test(
                        test_id: str, 
                        test_index: int, 
                        user_input: int, 
                        interval: int,
                        authorization: str = Header('authorization')
                    ):
    """
        사용자가 시험 문제를 입력하고 맞았는지 틀렸느지 바로 정답 확인 하는 곳
    """
    payload = access_verify_token(authorization)
    if payload == 'expired':
        return HTTPException(status_code=401, detail=str('Access token expired'))
    if not payload:
        return HTTPException(status_code=401, detail=str('Access token Wrong'))
    
    put_content(user_input, interval, test_id, test_index)
    question_data = check_question(test_id, test_index)
    if test_index % 10 == 0 and check_index(test_id) == test_index:
        update_test_info(test_id)
    return jsonable_encoder({
                             'testId':test_id,
                             'correct':question_data[0]['Correct'],
                             'description':question_data[0]['Description'],
                             'referenceUrl':question_data[0]['ReferenceURL']
                            })

@router.delete("/", status_code=204)
async def user_delete_test(test_id: str,
                           authorization: str = Header('authorization')
                        ):
    """
        사용자가 시험 문제를 입력하고 맞았는지 틀렸느지 바로 정답 확인 하는 곳
    """
    payload = access_verify_token(authorization)
    if payload == 'expired':
        return HTTPException(status_code=401, detail=str('Access token expired'))
    if not payload:
        return HTTPException(status_code=401, detail=str('Access token Wrong'))

    delete_test(test_id)
    return jsonable_encoder({'testId':test_id})

@router.get("/result")
async def result_test(test_id: str,
                      authorization: str = Header('authorization')):
    """
         시험 문제를 다 푼뒤 결과 페이지
    """
    payload = access_verify_token(authorization)
    if payload == 'expired':
        return HTTPException(status_code=401, detail=str('Access token expired'))
    if not payload:
        return HTTPException(status_code=401, detail=str('Access token Wrong'))
    wrong_content_id = result_wrong_case_cotent_id(test_id)
    test_info = find_test_info(test_id)
    correct = test_info['QuestionNum'] - len(wrong_content_id)
    using_time = find_time(test_id)
    if len(wrong_content_id) != 0:
        wrong_content_list = find_wrong_content(wrong_content_id)
        for _ in wrong_content_list:
            if _['Tag'] is not None:
                try:
                    _['Tag'] = _['Tag'].split(',')
                except Exception as error:
                    raise HTTPException(status_code=500, detail=str(error))
    else:
        wrong_content_list = None
    if test_info['PassNum'] <= correct:
        pass_check = True
    else:
        pass_check = False

    return jsonable_encoder({
                             'testId':test_id, 
                             'correct':correct,
                             'userTime':int(using_time / 60),
                             'totalTime':test_info['Time'],
                             'canonialName':test_info['CanonialName'],
                             'questionNum':test_info['QuestionNum'],
                             'pass': pass_check,
                             'passNum': test_info['PassNum'],
                             'passPercent': math.trunc(test_info['PassNum'] / test_info['QuestionNum'] * 100),
                             'correctPercent': math.trunc(correct / test_info['QuestionNum'] * 100),
                             'wrongQuestion':wrong_content_list
                            })

def access_verify_token(token: str):
    try:
        # JWT 토큰을 디코딩하고 만료 시간을 검증합니다.
        payload = jwt.decode(token, ACCESS_SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        return "expired"
    except Exception as e:
        return f"{e}"