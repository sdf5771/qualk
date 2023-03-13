from database.query import select, insert

from fastapi import APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder

router = APIRouter()

# @router.get("/{item_id}")
# async def read_item(item_id: str):
#     if item_id not in fake_items_db:
#         raise HTTPException(status_code=404, detail="Item not found")
#     return {"name": fake_items_db[item_id]["name"], "item_id": item_id}

# @router.put(
#     "/{item_id}",
#     tags=["custom"],
#     responses={403: {"description": "Operation forbidden"}},
# )
# async def update_item(item_id: str):
#     if item_id != "plumbus":
#         raise HTTPException(
#             status_code=403, detail="You can only update the item: plumbus"
#         )
#     return {"item_id": item_id, "name": "The great Plumbus"}

#Top 3 question
@router.get("/question/top_3/{type}")
async def find_top(type: str):
    query = """
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.question_name AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.type = '{type}'
        order by info.view
        limit 3
    """
    result = select(sql=query)
    for i in result:
        if i['question_tag'] is not None:
            i['question_tag'] = i['question_tag'].split(',')
    return jsonable_encoder(result)

#Select question all
@router.get("/question/find_view/{type}/{last_index}")
async def find_view(last_index: int, type: str):
    query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.question_name AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.type = '{type}'
        order by info.view desc
        limit 6 offset {last_index};
    """
    data = select(sql=query)
    for i in data:
        if i['question_tag'] is not None:
            i['question_tag'] = i['question_tag'].split(',')
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
@router.get("/question/find_new/{type}/{last_index}")
async def find_new(last_index: int, type: str):
    query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.question_name AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.type = '{type}'
        order by info.create_date desc
        limit 6 offset {last_index};
    """
    data = select(sql=query)
    for i in data:
        if i['question_tag'] is not None:
            i['question_tag'] = i['question_tag'].split(',')
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
@router.get("/question/find_old/{type}/{last_index}")
async def find_old(last_index: int, type: str):
    query = f"""
        SELECT content.content_id AS question_id,
               content.type AS question_type,
               info.question_name AS question_name,
               info.view AS question_view,
               info.create_date AS question_create,
               info.tag AS question_tag
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.type = '{type}'
        order by info.create_date asc
        limit 6 offset {last_index};
    """
    data = select(sql=query)
    for i in data:
        if i['question_tag'] is not None:
            i['question_tag'] = i['question_tag'].split(',')
    isLastData = False
    if len(data) < 6:
        isLastData = True
    result = { 
                'workbookData': data,
                'lastIndex': last_index + 6,
                'isLastData': isLastData,
             }
    return jsonable_encoder(result)

@router.get("/question/problem/{question_id}/{question_type}")
async def find_problem(question_id: int, question_type: str):
    query = f"""
        SELECT content.content_id AS question_id,
               info.question_name AS question_name,
               content.type AS question_type,
			   content.content_list AS question_contents,
               content.correct AS question_correct,
               content.description AS question_description,
               info.reference_url AS question_reference
        FROM question_content as content
        inner join question_info as info
        on content.content_id = info.info_id
        where content.content_id = {question_id}
        and content.type = '{question_type}';
    """
    view = f"""
            update question_info set view = view + 1 where info_id = {question_id};
            """

    insert(sql=view)
    result = select(sql=query)
    
    for i in result:
        if i['question_contents'] is not None:
            i['question_contents'] = i['question_contents'].split(',')
    return jsonable_encoder(result)
