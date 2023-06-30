from app.database.query import select, insert, update

def find_test(user_id, test_type):
    find_test = f"""
        SELECT TestID, 
        FROM TestInfo
        where userId = '{user_id}'
          and TestType = '{test_type}'
          and status = 'RUNNING';"""
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
            order by t1.testIndex ASC"""
    return select(select_ex_test)

def make_questionlist(question_type, question_num):
    find_question = f"""
            SELECT content_id
            FROM question_content
            where type = '{question_type}';"""
    questionid_list = select(sql=find_question)
    return random.sample(questionid_list, question_num)

def get_content(test_id, test_index):
    sql = f"""
        SELECT t1.testId, t2.title, t2.content_list
        FROM test_content as t1
        inner join (SELECT * FROM question_content as a inner join question_info as b on a.content_id = b.info_id) as t2
           on t1.contentId = t2.content_id
        where testId = '{test_id}'
          and t1.testIndex = {test_index};
    """
    return select(sql)

def put_content(user_input, interval, test_id ,test_index):
    find_question = f"""
        update test_content
           set usercorrect = {user_input},
            `interval` = {interval}
        where testId = '{test_id}'
          and testIndex = {test_index};"""
    return update(sql=find_question)

def check_question(test_id, test_index):
    sql = f"""
        SELECT  b.description, 
                b.correct, 
                c.reference_url
        FROM test_content as a
        inner join question_content as b
           on a.contentId = b.content_id
        inner join question_info as c
           on a.contentId = c.info_id
        where a.testId = '{test_id}'
          and a.testIndex = {test_index};"""
    return select(sql)

def result_wrong_case(test_id):
    sql = f"""
        SELECT  t1.count, 
                t1.testId, 
                t2.title, 
                t2.content_list, 
                t1.usercorrect, 
                t1.`interval`, 
                t2.correct
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
        inner join (SELECT * 
                      FROM question_content as a 
                      inner join question_info as b 
                        on a.content_id = b.info_id) as t2
        on t1.contentId = t2.content_id
        where testId = '{test_id}'
          and t1.usercorrect != t2.correct
          and t1.usercorrect is not null
        order by t1.testindex;"""
    wrong_question = select(sql)

def update_test_info(test_id, correct_num, total_question_num):
    sql = f"""update test_info 
              set correctNum = '{correct_num}',
                  totalQuestion = '{total_question_num}',
                  status = 'FINISH'
              where testId = '{test_id}'"""
    update(sql)

# class로 변경 테스트. 모듈 화 하고 싶어서
class Test:
    def __init__(test_id,
                 test_name,
                 test_time):
        self.TestID = test_id
        self.TestName = test_name
        self.TestTime = test_time