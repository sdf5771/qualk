import uuid

from app.database.mysql import select, insert, update
from app.logic.test_logic import find_test, get_ex_test, make_questionlist, \
                                 get_content, put_content, result_wrong_case_cotent_id, \
                                 check_question, update_test_info, find_test_info, \
                                 find_wrong_content, delete_test, check_index,\
                                 find_time

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
    check_running_test = find_test(Input_test.UserID, Input_test.TestType, Input_test.QuestionNum)
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
        inser_sql =f"""INSERT INTO TestInfo(TestID,UserID,Status,TestType, QuestionNum)VALUES('{test_id}','{Input_test.UserID}', 'RUNNING', '{Input_test.TestType}', {Input_test.QuestionNum})"""
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
    if test_index % 10 == 0:
        last_index = check_index(test_id)
        if last_index == test_index:
            last_index = True
        else:
            last_index = False
    else:
        last_index = False

    return jsonable_encoder({
                             'testId': test_id,
                             'title': questionid_list[0]['Title'],
                             'contentList': questionid_list[0]['ContentList'].split(','),
                             'lastIndex': last_index
                             })

@router.put("/")
async def user_input_test(test_id: str, test_index: int, user_input: int, interval: int):
    """
        사용자가 시험 문제를 입력하고 맞았는지 틀렸느지 바로 정답 확인 하는 곳
    """
    put_content(user_input, interval, test_id, test_index)
    question_data = check_question(test_id, test_index)
    if test_index % 10 == 0:
        last_index = check_index(test_id)
        if last_index == test_index:
            update_test_info(test_id)
        else:
            pass
    else:
        pass
    return jsonable_encoder({
                             'testId':test_id,
                             'correct':question_data[0]['Correct'],
                             'description':question_data[0]['Description'],
                             'referenceUrl':question_data[0]['ReferenceURL']
                            })

@router.delete("/", status_code=204)
async def delete_test(test_id: str):
    """
        사용자가 시험 문제를 입력하고 맞았는지 틀렸느지 바로 정답 확인 하는 곳
    """
    delete_test(test_id)
    return jsonable_encoder({
                             'testId':test_id
                            })

@router.get("/result/")
async def result_test(test_id: str):
    """
         시험 문제를 다 푼뒤 결과 페이지
    """
    wrong_content_id = result_wrong_case_cotent_id(test_id)
    test_info = find_test_info(test_id)
    correct = test_info['QuestionNum'] - len(wrong_content_id)
    using_time = find_time(test_id)
    if len(wrong_content_id) != 0:
        wrong_content_list = find_wrong_content(wrong_content_id)
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
                             'passPercent': test_info['PassNum'] / test_info['QuestionNum'] * 100,
                             'correctPercent': correct/test_info['QuestionNum'] * 100,
                             'wrongQuestion':wrong_content_list
                            })