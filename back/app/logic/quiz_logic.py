import random
import json
# from app.database.redis import redis_connect
from app.database.mysql import select, insert, update, delete

def get_content_kr(content_type, content_id):
    # r = redis_connect()
    # questionid_list_json = r.get(content_id)
    questionid_list_json = None
    if questionid_list_json is None:
        sql = f"""
             SELECT ContentId, 
                    Title, 
                    Type, 
                    ContentList,
                    Correct, 
                    Description, 
                    Lang,
                    IsTrance,
                    ReferenceURL
        FROM QuestionContentKR
        where ContentId = {content_id}
          and Type = '{content_type}';"""
        questionid_list = select(sql)
    else:
        questionid_list = json.loads(questionid_list_json)
    return questionid_list

def get_content(content_type, content_id, table):
    questionid_list_json = None
    if questionid_list_json is None:
        sql = f"""
             SELECT ContentId, 
                    Title, 
                    Type, 
                    ContentList,
                    Correct, 
                    Description, 
                    Lang,
                    IsTrance,
                    ReferenceUrl
        FROM {table}
        where ContentId = '{content_id}'
          and Type = '{content_type}';"""
        questionid_list = select(sql)
    else:
        questionid_list = json.loads(questionid_list_json)
    return questionid_list
