import random
from app.database.mysql import select, insert, update

def find_test(user_id, test_type, test_num):
    find_test = f"""
        SELECT TestID
        FROM TestInfo
        where UserID = '{user_id}'
          and TestType = '{test_type}'
          and status = 'RUNNING';"""
    return select(find_test)

def get_ex_test(test_id):
    select_ex_test= f"""
        SELECT T1.TestIndex
        FROM TestContent as T1
        INNER join QuestionContent as T2
           ON T1.ContentID = T2.ContentID
        WHERE T1.TestID = '{test_id}'
          AND T1.UserInput is Null
        ORDER BY T1.TestIndex ASC"""
    return select(select_ex_test)

def make_questionlist(question_type, question_num):
    find_question = f"""
        SELECT ContentID
        FROM QuestionContent
        WHERE Type = '{question_type}';"""
    questionid_list = select(sql=find_question)
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
                T2.PassNum
          FROM TestInfo as T1
         INNER JOIN TestType as T2
            ON T1.TestType = T2.Name
         WHERE T1.TestID = '{test_id}';"""
    return select(sql)[0]

def find_wrong_content(content_id):
    content_id_list = []
    for _ in content_id:
        content_id_list.append(_['ContentID'])
    content_id_list = ','.join(map(str, content_id_list))
    print(content_id_list)
    sql = f"""
        SELECT *
          FROM QuestionContent
        WHERE ContentID IN (1,2,3,4)     
    """
    return select(sql)
# class로 변경 테스트. 모듈 화 하고 싶어서
# class Test:
#     def __init__(test_id,
#                  test_name,
#                  test_time):
#         self.TestID = test_id
#         self.TestName = test_name
#         self.TestTime = test_time