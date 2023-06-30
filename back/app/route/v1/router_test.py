import uuid

from app.database.mysql import select, insert, update
from app.logic.test_logic import find_test, get_ex_test, make_questionlist, \
                                 get_question

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder
from app.entitiy.test import Input_test

router = APIRouter(
    prefix="/api/v1/test"
)

#모의고사 생성(시험을 처음 치는 경우 or 새롭게 만드는 경우)
@router.post("/")
async def create_test(Input_test: Input_test):
    """
        실질적인 문제 들어가기를 눌렀을 경우이고 실질적인 문제를 새롭게 만들었을 경우
    """
    check_running_test = find_test(Input_test.UserID)
    if check_running_test:
        test_id = check_running_test[0]['testId']
        ex_test = get_ex_test(test_id)
        return jsonable_encoder({'testId':test_id,
                                 'testindex':ex_test[0]['testIndex']})
    else:
        random_questionid_list = make_questionlist(Input_test.TestType)
        test_id = uuid.uuid4()
        inser_sql = f"""
                INSERT INTO test_info(testId,userId, status)VALUES('{test_id}','{user_id}', 'RUNNING')
        """
        insert(sql=inser_sql)
        count = 1
        for questionid in random_questionid_list:
            inser_sql = f"""
                INSERT INTO test_content(testId,testName,contentId,testIndex,userId)
                VALUES('{test_id}','{testName}','{questionid['content_id']}',{count},'{user_id}')
            """
            insert(sql=inser_sql)
            count += 1
    return jsonable_encoder({'testId':test_id})

@router.get("/")
async def get_quiz(test_id: str, test_index: int):
    """
        시험 문제 내용 출력
    """
    questionid_list = get_question(test_id, test_index)
    return jsonable_encoder({'testId': testid,
                             'title': questionid_list[0]['title'],
                             'contentList': questionid_list[0]['content_list'].split(',')
                             })

@router.put("/")
async def user_input_test(testid: str, testindex: int, usercorrect: int, interval: int):
    """
        사용자가 시험 문제를 입력하고 
    """
    find_question = f"""
        update test_content
        set usercorrect = {usercorrect},
            `interval` = {interval}
        where testId = '{testid}'
          and testIndex = {testindex};
    """
    question_content = update(sql=find_question)
    question_info = f"""
        SELECT b.description, b.correct, c.reference_url
        FROM test_content as a
        inner join question_content as b
        on a.contentId = b.content_id
        inner join question_info as c
        on a.contentId = c.info_id
        where a.testId = '{testid}'
          and a.testIndex = {testindex};
    """
    question_data = select(sql=question_info)
    return jsonable_encoder({'testId':testid,
                             'correct':question_data[0]['correct'],
                             'description':question_data[0]['description'],
                             'reference_url':question_data[0]['reference_url']})

@router.get("/result/")
async def result_test(testId: str):
    """
         시험 문제를 다 푼뒤 결과 페이지
    """
    find_question = f"""
        SELECT t1.count, t1.testId, t2.title, t2.content_list, t1.usercorrect, t1.`interval`, t2.correct
        FROM (SELECT d.testName,
                     d.testId, 
                     d.usercorrect, 
                     d.`interval`,
                     d.contentId,
                     d.testindex,
                     f.count
              FROM test_content as d 
              inner join test_type as f 
              on d.testName = f.testName) as t1
        inner join (SELECT * FROM question_content as a inner join question_info as b on a.content_id = b.info_id) as t2
        on t1.contentId = t2.content_id
        where testId = '{testId}'
          and t1.usercorrect != t2.correct
          and t1.usercorrect is not null
        order by t1.testindex;
    """
    wrong_question = select(sql=find_question)
    question_number = wrong_question[0]['count']
    correct = question_number - len(wrong_question)
    update_info = f"""
        update test_info set correctNum = '{correct}', totalQuestion = '{question_number}',  status = 'END'where testId = '{testId}'
    """
    update(sql=update_info)

    return jsonable_encoder({
                             'testId':testId, 
                             'correct':correct, 
                             'question_number':question_number, 
                             'wrong_question':wrong_question
                            })