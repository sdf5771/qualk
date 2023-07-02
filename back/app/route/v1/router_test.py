import uuid

from app.database.mysql import select, insert, update
from app.logic.test_logic import find_test, get_ex_test, make_questionlist, \
                                 get_content, put_content, result_wrong_case_cotent_id, \
                                 check_question, update_test_info, find_test_info, \
                                 find_wrong_content

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from app.entitiy.test import Input_test

router = APIRouter(
    prefix="/api/v1/test"
)

#모의고사 생성(시험을 처음 치는 경우 or 새롭게 만드는 경우)
@router.post("/", status_code=201)
async def create_test(Input_test: Input_test):
    """
        실질적인 문제 들어가기를 눌렀을 경우이고 실질적인 문제를 새롭게 만들었을 경우
    """
    check_running_test = find_test(Input_test.UserID, Input_test.TestType)
    if check_running_test:
        test_id = check_running_test[0]['TestID']
        ex_test = get_ex_test(test_id)
        return jsonable_encoder({
                                 'testId':test_id,
                                 'testIndex':ex_test[0]['TestIndex']
                                })
    else:
        random_questionid_list = make_questionlist(Input_test.TestType, Input_test.QuestionNum)
        test_id = uuid.uuid4()
        inser_sql =f"""INSERT INTO TestInfo(TestID,UserID,Status,TestType)VALUES('{test_id}','{Input_test.UserID}', 'RUNNING', '{Input_test.TestType}')"""
        insert(sql=inser_sql)
        count = 1
        for questionid in random_questionid_list:
            inser_sql = f"""INSERT INTO TestContent(TestID,
                                                    Name,
                                                    ContentID,
                                                    TestIndex)
                            VALUES('{test_id}',
                                   '{Input_test.TestType}',
                                   '{questionid['ContentID']}',
                                   {count})"""
            insert(sql=inser_sql)
            count += 1
    return jsonable_encoder({
                             'testId':test_id,
                             'testIndex': 1
                             })

@router.get("/", status_code=200)
async def get_quiz(test_id: str, test_index: int):
    """
        시험 문제 내용 출력
    """
    questionid_list = get_content(test_id, test_index)
    return jsonable_encoder({
                             'testId': test_id,
                             'title': questionid_list[0]['Title'],
                             'contentList': questionid_list[0]['ContentList'].split(',')
                             })

@router.put("/")
async def user_input_test(test_id: str, test_index: int, user_input: int, interval: int):
    """
        사용자가 시험 문제를 입력하고 맞았는지 틀렸느지 바로 정답 확인 하는 곳
    """
    put_content(test_id, test_index, user_input, interval)
    question_data = check_question(test_id, test_index)
    return jsonable_encoder({
                             'testId':test_id,
                             'correct':question_data[0]['Correct'],
                             'description':question_data[0]['Description'],
                             'referenceUrl':question_data[0]['ReferenceURL']
                            })

@router.get("/result/")
async def result_test(test_id: str):
    """
         시험 문제를 다 푼뒤 결과 페이지
    """
    wrong_content_id = result_wrong_case_cotent_id(test_id)
    test_info = find_test_info(test_id)
    correct = test_info['QuestionNum'] - len(wrong_content_id)
    wrong_content_list = find_wrong_content(wrong_content_id)
    update_test_info(test_id)
    return jsonable_encoder({
                             'testId':test_id, 
                             'correct':correct,
                             'canonialName':test_info['CanonialName'],
                             'questionNum':test_info['QuestionNum'],
                             'passNum': test_info['PassNum'],
                             'passPercent': correct/test_info['QuestionNum'] * 100,
                             'wrongQuestion':wrong_content_list
                            })