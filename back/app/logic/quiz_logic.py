import random
import json
from app.database.redis import redis_connect
from app.database.mysql import select, insert, update, delete

def get_content_kr(content_type, content_id):
    r = redis_connect()
    questionid_list_json = r.get(content_id)
    questionid_list_json = None
    if questionid_list_json is None:
        sql = f"""
        SELECT content_id, 
                    title, 
                    type, 
                    contents, 
                    description, 
                    lang,
                    is_trance,
                    reference_url
        FROM question_content_kr
        where content_id = {content_id}
          and type = '{content_type}';"""
        questionid_list = select(sql)
        # r.set(content_id, json.dumps(questionid_list))
    else:
        questionid_list = json.loads(questionid_list_json)
    return questionid_list

def get_content(content_type, content_id):
    r = redis_connect()
    questionid_list_json = r.get(content_id)
    questionid_list_json = None
    if questionid_list_json is None:
        sql = f"""
        SELECT content_id, 
                    title, 
                    type, 
                    contents, 
                    description, 
                    lang,
                    is_trance,
                    reference_url
        FROM question_content_kr
        where content_id = {content_id}
          and type = '{content_type}';"""
        questionid_list = select(sql)
        # r.set(content_id, json.dumps(questionid_list))
    else:
        questionid_list = json.loads(questionid_list_json)
    return questionid_list
