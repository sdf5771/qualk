import random
import json
# from app.database.redis import redis_connect
from app.database.mysql import select, insert, update, delete

def find_test(user_id, test_type, test_num):
    find_test = f"""
        SELECT TestID
        FROM TestInfo
        where UserID = '{user_id}'
          and TestType = '{test_type}'
          and QuestionNum =  {test_num}
          and status = 'RUNNING';"""
    return select(find_test)

def get_ex_test(test_id):
    select_ex_test= f"""
        SELECT T1.TestIndex,
               T1.`Interval`
        FROM TestContent as T1
        INNER join QuestionContent as T2
           ON T1.ContentID = T2.ContentID
        WHERE T1.TestID = '{test_id}'
          AND T1.UserInput is Null
        ORDER BY T1.TestIndex ASC"""
    return select(select_ex_test)

def get_ex_time(test_id):
    select_time= f"""
        SELECT SUM(`Interval`)
        FROM TestContent
        WHERE TestID = '{test_id}';"""
    return select(select_time)

def make_questionlist(question_type, question_num):
    find_question = f"""
        SELECT ContentID
        FROM QuestionContent
        WHERE Type = '{question_type}';"""
    questionid_list = select(sql=find_question)
    return random.sample(questionid_list, question_num)

def make_questionlist_cache(question_type, question_num):
    # r = redis_connect()
    # questionid_list_json = r.get(question_type)
    # Redis에 데이터가 없다면 DB에서 가져옴
    questionid_list_json = None
    if questionid_list_json is None:
        find_question = f"""
            SELECT ContentID
            FROM QuestionContent
            WHERE Type = '{question_type}';"""
        questionid_list = select(sql=find_question)

        # 가져온 데이터를 Redis에 저장
        # r.set(question_type, json.dumps(questionid_list))
    else:
        # Redis에서 가져온 데이터를 Python 리스트로 변환
        questionid_list = json.loads(questionid_list_json)
    return random.sample(questionid_list, question_num)

def get_content(test_id, test_index):
    sql = f"""
        SELECT T1.TestID, T2.Title, T2.ContentList
        FROM TestContent as T1
        INNER JOIN QuestionContent as T2
           ON T1.ContentID = T2.ContentID
        WHERE T1.TestID = '{test_id}'
          AND T1.TestIndex = {test_index};"""
    return select(sql)

def put_content(user_input, interval, test_id ,test_index):
    find_question = f"""
        UPDATE TestContent
           SET UserInput = {user_input},
              `Interval` = {interval}
         WHERE TestID = '{test_id}'
           AND TestIndex = {test_index};"""
    return update(sql=find_question)

def check_question(test_id, test_index):
    sql = f"""
        SELECT  T2.Description, 
                T2.Correct, 
                T2.ReferenceURL
        FROM TestContent as T1
        INNER JOIN QuestionContent as T2
           on T1.ContentID = T2.ContentID
        where T1.TestID = '{test_id}'
          and T1.TestIndex = {test_index};"""
    return select(sql)

def update_test_info(test_id):
    sql = f""" UPDATE TestInfo 
                  SET Status = 'FINISH'
                WHERE TestID = '{test_id}'"""
    update(sql)

def result_wrong_case_cotent_id(test_id):
    sql = f"""
        SELECT T1.ContentID
          FROM TestContent as T1
         INNER JOIN QuestionContent as T2
                 ON T1.ContentID = T2.ContentID
              WHERE T1.TestID = '{test_id}'
                AND T1.UserInput != T2.Correct;"""
    return select(sql)

def find_test_info(test_id):
    sql = f"""
        SELECT  T2.Name, 
                T2.CanonialName, 
                T2.Time,
                T2.QuestionNum,
                T2.PassNum,
                T1.UserID
          FROM TestInfo as T1
         INNER JOIN TestType as T2
            ON T1.TestType = T2.Name
           AND T1.QuestionNum = T2.QuestionNum
         WHERE T1.TestID = '{test_id}';"""
    return select(sql)[0]

def insert_test_result(
            test_id,
            user_id,
            test_type,
            question_total,
            question_correct,
            total_time

):
    sql = f"""
        INSERT INTO TestResult(TestId, UserId, TestType, QuestionTotal, QuestionCorrect, TotalTime) VALUES ('{test_id}', '{user_id}', '{test_type}', '{question_total}', '{question_correct}', '{total_time}') 
    """
    return insert(sql)

def find_wrong_content(content_id):
    if content_id is None: return None
    content_id_list = []
    for _ in content_id:
        content_id_list.append(_['ContentID'])
    content_id_list = ','.join(map(str, content_id_list))
    sql = f"""
        SELECT *
          FROM QuestionInfo
        WHERE ContentID IN ({content_id_list})     
    """
    return select(sql)

def find_ex_quiz_result(user_id):
    sql = f"""
        SELECT *
          FROM TestResult
        WHERE UserId = '{user_id}'
        ORDER BY CreateDate desc
        Limit 1;
    """
    return select(sql)[0]


def check_index(test_id):
    sql=f"""
        SELECT QuestionNum
        FROM TestInfo
        WHERE TestID = '{test_id}';
    """
    return select(sql)[0]['QuestionNum']

def delete_test(test_id):
    sql=f"""
        DELETE FROM TestInfo WHERE TestID = '{test_id}';
    """
    delete(sql)

def find_time(test_id):
    sql = f"""
        SELECT sum(`interval`) as Time
        FROM TestContent
        WHERE TestID = '{test_id}';
    """
    return select(sql)[0]['Time']
