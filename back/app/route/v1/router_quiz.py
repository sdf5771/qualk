import random
import uuid

from app.database.query import select, insert, update

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder

router = APIRouter(
    # prefix="/api/v1/quiz"
)

#Top 3 question
@router.get("/api/v1/quiz/{type}/top_3")
async def find_top(type: str):
    query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.title AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.type = '{type}'
        order by info.view desc
        limit 3
    """
    result = select(sql=query)
    for i in result:
        if i['question_tag'] is not None:
            try:
                i['question_tag'] = i['question_tag'].split(',')
            except Exception as error:
                raise HTTPException(status_code=500, detail=str(error))
    return jsonable_encoder(result)

#Select question all
@router.get("/api/v1/quiz/{type}/view/{last_index}")
async def find_view(last_index: int, type: str):
    query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.title AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.type = '{type}'
        ORDER BY question_view DESC,
				 question_id DESC
        limit 6 offset {last_index};
    """
    data = select(sql=query)
    for i in data:
        if i['question_tag'] is not None:
            try:
                i['question_tag'] = i['question_tag'].split(',')
            except Exception as error:
                raise HTTPException(status_code=500, detail=str(error))
    isLastData = False
    if len(data) < 6:
        isLastData = True
    result = { 
                'workbookData': data,
                'lastIndex': last_index + 6,
                'isLastData': isLastData,
             }
    return jsonable_encoder(result)

#Select question orderby create_date desc
@router.get("/api/v1/quiz/{type}/new/{last_index}")
async def find_new(last_index: int, type: str):
    query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.title AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.type = '{type}'
        order by info.create_date desc,
                 question_id DESC
        limit 6 offset {last_index};
    """
    data = select(sql=query)
    for i in data:
        if i['question_tag'] is not None:
            try:
                i['question_tag'] = i['question_tag'].split(',')
            except Exception as error:
                raise HTTPException(status_code=500, detail=str(error))
    isLastData = False
    if len(data) < 6:
        isLastData = True
    result = { 
                'workbookData': data,
                'lastIndex': last_index + 6,
                'isLastData': isLastData,
             }
    return jsonable_encoder(result)

#Select question orderby create_date asc
@router.get("/api/v1/quiz/{type}/old/{last_index}")
async def find_old(last_index: int, type: str):
    query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.title AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.type = '{type}'
        order by info.create_date asc,
                 question_id DESC
        limit 6 offset {last_index};
    """
    data = select(sql=query)
    for i in data:
        if i['question_tag'] is not None:
            try:
                i['question_tag'] = i['question_tag'].split(',')
            except Exception as error:
                raise HTTPException(status_code=500, detail=str(error))
    isLastData = False
    if len(data) < 6:
        isLastData = True
    result = { 
                'workbookData': data,
                'lastIndex': last_index + 6,
                'isLastData': isLastData,
             }
    return jsonable_encoder(result)

@router.get("/api/v1/quiz/{type}/{quiz_id}")
async def find_problem(type: str, quiz_id: int):
    query = f"""
        SELECT content.content_id AS question_id,
               info.title AS question_name,
               content.type AS question_type,
			   content.content_list AS question_contents,
               content.correct AS question_correct,
               content.description AS question_description,
               info.reference_url AS question_reference,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.content_id = {quiz_id}
        and content.type = '{type}';
    """

    result = select(sql=query)

    view = f"""
            update question_info set view = view + 1 where info_id = {quiz_id};
            """
    insert(sql=view)
    if not result:
        raise HTTPException(status_code=404, detail="no data")
    
    for i in result:
        if i['question_contents'] is not None:
            try:
                i['question_contents'] = i['question_contents'].split(',')
            except Exception as error:
                raise HTTPException(status_code=500, detail=str(error))
        else:
            raise HTTPException(status_code=404, detail=f"{quiz_id} is Not found")
    return jsonable_encoder(result)

@router.get("/api/v1/quiz/search")
async def search_keyword(keyword: str, type: str):
    if type == 'keyword':
        query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.title AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where info.title like '%{keyword}%'
        or content.content_list like '%{keyword}%';
    """
    elif type == 'tag':
        query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.title AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where info.tag like '%{keyword}%';
    """
    result = select(sql=query)
    for i in result:
        if i['question_tag'] is not None:
            try:
                i['question_tag'] = i['question_tag'].split(',')
            except Exception as error:
                raise HTTPException(status_code=500, detail=str(error))
    return jsonable_encoder(result)
#모의고사 생성(시험을 처음 치는 경우 or 새롭게 만드는 경우)
@router.post("/api/v1/quiz/test/")
async def create_test(type: str, testName: str, user_id):
    """
        실질적인 문제 들어가기를 눌렀을 경우이고 실질적인 문제를 새롭게 만들었을 경우
    """
    find_test = f"""
        SELECT testId
        FROM test_info
        where userId = '{user_id}'
          and status = 'RUNNING';
    """
    find_test = select(sql=find_test)

    if find_test:
        test_id = find_test[0]['testId']
        select_ex_test= f"""
            SELECT t1.testIndex
            FROM test_content as t1
            inner join (SELECT * FROM question_content as a inner join question_info as b on a.content_id = b.info_id) as t2
            on t1.contentId = t2.content_id
            where t1.testId = '{test_id}'
              and t1.usercorrect is Null
            order by t1.testIndex ASC
        """
        ex_test = select(sql=select_ex_test)
        return jsonable_encoder({'testId':test_id,
                                 'testindex':ex_test[0]['testIndex']})
    else:
        find_question = f"""
            SELECT content_id
            FROM question_content
            where type = '{type}';
        """
        questionid_list = select(sql=find_question)
        random_questionid_list = random.sample(questionid_list, 50)
        test_id = uuid.uuid4()
        inser_sql = f"""
                INSERT INTO test_info(testId,userId, status)VALUES('{test_id}','{user_id}', 'RUNNING')
        """
        insert(sql=inser_sql)
        count = 1
        for questionid in random_questionid_list:
            inser_sql = f"""
                INSERT INTO test_content(testId,testName,contentId,testIndex,userId)VALUES('{test_id}','{testName}','{questionid['content_id']}',{count},'{user_id}')
            """
            insert(sql=inser_sql)
            count += 1
    return jsonable_encoder({'testId':test_id})
@router.get("/api/v1/quiz/test/")
async def select_test(testid: str, testindex: int):
    """
        시험 문제 내용 출력
    """
    find_question = f"""
        SELECT t1.testId, t2.title, t2.content_list
        FROM test_content as t1
        inner join (SELECT * FROM question_content as a inner join question_info as b on a.content_id = b.info_id) as t2
        on t1.contentId = t2.content_id
        where testId = '{testid}'
          and t1.testIndex = {testindex};
    """
    questionid_list = select(sql=find_question)
    return jsonable_encoder({'testId': testid,
                             'title': questionid_list[0]['title'],
                             'contentList': questionid_list[0]['content_list'].split(',')
                             })

@router.put("/api/v1/quiz/test/")
async def isnert_correct_test(testid: str, testindex: int, usercorrect: int, interval: int):
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

@router.get("/api/v1/quiz/result/")
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