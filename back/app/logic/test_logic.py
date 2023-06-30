from app.database.query import select, insert, update

def find_test(user_id, test_type):
    find_test = f"""
        SELECT TestID, 
        FROM TestInfo
        where userId = '{user_id}'
          and TestType = '{test_type}'
          and status = 'RUNNING';
    """
    return select(find_test)

def get_ex_test(test_id):
    select_ex_test= f"""
            SELECT t1.testIndex
            FROM test_content as t1
            inner join (
                        SELECT * 
                        FROM question_content as a 
                        inner join question_info as b 
                        on a.content_id = b.info_id ) as t2
            on t1.contentId = t2.content_id
            where t1.testId = '{test_id}'
              and t1.usercorrect is Null
            order by t1.testIndex ASC
        """
    return select(select_ex_test)

def make_questionlist(question_type):
    find_question = f"""
            SELECT content_id
            FROM question_content
            where type = '{question_type}';
        """
    questionid_list = select(sql=find_question)
    return random.sample(questionid_list, 50)

def get_question(test_id, test_index):
    sql = f"""
        SELECT t1.testId, t2.title, t2.content_list
        FROM test_content as t1
        inner join (SELECT * FROM question_content as a inner join question_info as b on a.content_id = b.info_id) as t2
        on t1.contentId = t2.content_id
        where testId = '{test_id}'
          and t1.testIndex = {test_index};
    """
    return select(sql)


# class로 변경 테스트. 모듈 화 하고 싶어서
class Test:
    def __init__(test_id,
                 test_name,
                 test_time):
        self.TestID = test_id
        self.TestName = test_name
        self.TestTime = test_time